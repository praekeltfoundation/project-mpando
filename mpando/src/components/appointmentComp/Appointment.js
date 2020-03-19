import React, { Component } from "react";
import MediaBanner from '../mediaBannerComp/MediaBanner';
import './assets/Appointment.css';

import SnackBar from '@material-ui/core/Snackbar';
import RaisedButton from "material-ui/RaisedButton";
import FlatButton from "material-ui/FlatButton";
import DatePicker from "material-ui/DatePicker";
import Dialog from "material-ui/Dialog";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import TextField from "material-ui/TextField";
import Card from "material-ui/Card";
import { Step,Stepper,StepLabel,StepContent } from "material-ui/Stepper";
import { RadioButton, RadioButtonGroup } from "material-ui/RadioButton";

import moment from "moment";
import axios from "axios";

const API_BASE = "http://localhost:8083/"; //Live URL
const DAYOBJECT = moment().startOf("day");     //Start of today 12 am
const TODAY = DAYOBJECT.format("YYYY-DD-MM");

class Appointment extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      stepIndex: 0,
      finished: false,
      validEmail: true,
      validPhone: true,
      smallScreen: window.innerWidth < 768,
      schedule: {
        [TODAY]: true
      },
      appointmentMeridiem: 0,
      confirmationModalOpen: false,
      firstName: "",
      lastName: "",
      email: "",
      appointmentDateSelected: false,
    };
  }

  handleNext = () => {
    this.setState({
      stepIndex: this.state.stepIndex + 1
    });
  };
  handlePrev = () => {
    if (this.state.stepIndex > 0) {
      this.setState({
        stepIndex: this.state.stepIndex - 1
      });
    }
  };
  handleFinishTimer = () => {
    this.setState({
      finished: this.state.stepIndex >= 2
    });
  };
  componentDidMount() {
    axios.get(API_BASE + 'api/retrieveSlots').then(response => {
      this.handleDBReponse(response.data);
    }).catch(err => {
      console.log(`Something went wrong. ${err}`);
    });
    this.intervalId = setInterval(this.handleFinishTimer, 10000);
  };
  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  // eslint-disable-next-line
  validateEmail(email) {const regex =/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return regex.test(email)
        ? this.setState({ email: email, validEmail: true })
        : this.setState({ validEmail: false });
    };
  // eslint-disable-next-line
  validatePhone(phoneNumber) {const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    return regex.test(phoneNumber)
      ? this.setState({ phone: phoneNumber, validPhone: true })
      : this.setState({ validPhone: false });
  };

  /*
  ------------------------------
  [ON DATEPICKER CHANGE - FOR ALL DATES IN A MONTH]
  RE-START
  ------------------------------
  */
  handleSetAppointmentDate(date) {
    this.setState({
      appointmentDate: date,
      confirmationTextVisible: true
    });
  };
  handleSetAppointmentSlot(slot) {
    this.setState({
      appointmentSlot: slot
    });
  };
  handleSetAppointmentMeridiem(meridiem) {
    this.setState({
      appointmentMeridiem: meridiem
    });
  };
  checkDisableDate(day) {
    const dateString = moment(day).format("YYYY-DD-MM");
    return (
      this.state.schedule[dateString] === true ||
      moment(day).startOf("day").diff(DAYOBJECT) < 0
    );
  };

  renderAppointmentTimes() {
    if (!this.state.isLoading) {
      const slots = [...Array(8).keys()];
      return slots.map(slot => {
        const appointmentDateString = moment(this.state.appointmentDate).format("YYYY-DD-MM");
        const time1 = moment().hour(9).minute(0).add(slot, "hours");
        const time2 = moment().hour(9).minute(0).add(slot + 1, "hours");
        const meridiemDisabled = this.state.appointmentMeridiem
         ? time1.format("a") === "am"
         : time1.format("a") === "pm";
        return (
         <RadioButton
            label={time1.format("h:mm a") + " - " + time2.format("h:mm a")}
            key={slot}
            value={slot}
            style={{
              marginBottom: 15,
              display: meridiemDisabled ? "none" : "inherit"
            }}
            disabled={meridiemDisabled}
         />
        );

      });
    } else {
      return null;
    }
  };
  /*
  ------------------------------
  END:
  ------------------------------
  */



  handleSubmit() {
    this.setState({
      confirmationModalOpen: false
    });
    const newAppointment = {
      name: this.state.firstName + " " + this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      slot_date: moment(this.state.appointmentDate).format("YYYY-DD-MM"),
      slot_time: this.state.appointmentSlot
    };
    axios.post(API_BASE + "api/appointmentCreate", newAppointment)
    .then(response => {
        this.setState({
          confirmationSnackbarMessage: "Appointment succesfully added!",
          confirmationSnackbarOpen: true,
          processed: true,
        })
        if(this.state.finished) {
          this.setState({
            stepIndex: this.state.stepIndex + 1
          })
          clearInterval(this.intervalId);
        }
      }
    ).catch(err => {
      console.log(err);
      return this.setState({
        confirmationSnackbarMessage: "Appointment failed to save.",
        confirmationSnackbarOpen: true
      });
    });
  };
  handleDBReponse(response) {
    const appointments = response;
    const initialSchedule = {};
    initialSchedule[DAYOBJECT.format("YYYY-DD-MM")] = true;
    const schedule = !appointments.length ? initialSchedule
      : appointments.reduce((currentSchedule, appointment) => {
        const { slot_date, slot_time } = appointment;
        const dateString = moment(slot_date, "YYYY-DD-MM").format("YYYY-DD-MM");

        currentSchedule = !currentSchedule[slot_date]
          ? (currentSchedule[dateString] = Array(8).fill(false))
          : null;
        currentSchedule = Array.isArray(currentSchedule[dateString])
          ? (currentSchedule[dateString][slot_time] = true)
          : null;
        return currentSchedule;
      }, initialSchedule);
    for (let day in schedule) {
      let slots = schedule[day].length ? schedule[day].every(slot => slot === true) ? (schedule[day] = true) : null : null;
    }

    if(schedule) {
      this.setState({
        schedule: schedule
      });
    } else {
      this.setState({
        [TODAY]: true
      });
    }

  };

  renderStepActions(step) {
    const { stepIndex } = this.state;
    return (
      <div className="Appointment_form-buttons">
        {stepIndex === 2 ? null:
          <RaisedButton
            label="Next"
            disableTouchRipple={true}
            disableFocusRipple={true}
            primary={true}
            onClick={this.handleNext}
            className="RaisedButton"
          />
        }
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
            className="FlatButton"
          />
        )}
      </div>
    );
  };
  renderAppointmentConfirmation() {
    return (
      <section className="Appointment__popup">
        <p>Name:
          <span className="Appointment__info">
            {this.state.firstName} {this.state.lastName}
          </span>
        </p>
        <p>
          Number: <span className="Appointment__info">{this.state.phone}</span>
        </p>
        <p>
          Email: <span className="Appointment__info">{this.state.email}</span>
        </p>
        <p>
          Appointment: <span className="Appointment__info">
            {moment(this.state.appointmentDate).format("YYYY-DD-MM")}
          </span>
        </p>
        <p>Time: <span className="Appointment__info">
            {moment()
              .hour(9)
              .minute(0)
              .add(this.state.appointmentSlot, "hours")
              .format("h:mm a")}
          </span>
        </p>
      </section>
    );
  }
  render() {
    const { finished, isLoading, smallScreen, stepIndex,
      confirmationModalOpen, confirmationSnackbarOpen, ...data
    } = this.state;
    const contactFormFilled = data.firstName && data.lastName &&
      data.phone && data.email &&
      data.validPhone && data.validEmail;
    const modalActions = [
      <FlatButton
        label="Cancel"
        className="RaisedButton"
        primary={false}
        onClick={() => this.setState({ confirmationModalOpen: false })}
      />,
      <FlatButton
        label="Confirm"
        className="FlatButton"
        primary={true}
        onClick={() => this.handleSubmit()}
      />
    ];
    const datePickerOfAppointment = () => (
      <div className="Appointment__date-picker">
        <DatePicker
          hintText="Select Date"
          mode = {smallScreen ? "portrait" : "landscape"}
          onChange = {(n, date) => this.handleSetAppointmentDate(date)}
          /*
          ------------------------------
          RE-START
          ------------------------------
          */
          shouldDisableDate = {date => this.checkDisableDate(date)}
        />
      </div>
    );

    return (
      <div className="Appointment">
        <MediaBanner/>
        <div className="Appointment-scheduler">
          <Card className="Appointment__card">
            <Stepper
              activeStep={stepIndex}
              orientation="vertical"
              linear={true}>
              {/* STEP ONE */}
              <Step>
                <StepLabel>
                  Choose an available day for your appointment
                </StepLabel>
                <StepContent>
                  {datePickerOfAppointment()}
                  {this.renderStepActions(0)}
                </StepContent>
              </Step>
              {/* STEP TWO */}
              <Step disabled={!data.appointmentDate}>
                <StepLabel>
                  Choose an available time for your appointment
                </StepLabel>
                <StepContent>
                  <SelectField
                    floatingLabelText="AM/PM"
                    value={data.appointmentMeridiem}
                    onChange={(evt, key, payload) =>
                      this.handleSetAppointmentMeridiem(payload)
                    }
                    selectionRenderer={value => (value ? "PM" : "AM")}
                  >
                    <MenuItem value={0} primaryText="AM" />
                    <MenuItem value={1} primaryText="PM" />
                  </SelectField>
                  <RadioButtonGroup
                    style={{
                      marginTop: 15,
                      marginLeft: 15
                    }}
                    name="appointmentTimes"
                    defaultSelected={data.appointmentSlot}
                    onChange={(evt, val) => this.handleSetAppointmentSlot(val)}
                  >
                    {this.renderAppointmentTimes()}
                  </RadioButtonGroup>
                  {this.renderStepActions(1)}
                </StepContent>
              </Step>
              {/* STEP THREE */}
              <Step>
                <StepLabel>
                  We require your contact information in order to send you a
                  confirmation
                </StepLabel>
                <StepContent>
                  <section className="Appointment-contact">
                    <TextField
                      className="Appointment-field"
                      name="first_name"
                      hintText="First Name"
                      floatingLabelText="First Name"
                      onChange={(evt, newValue) =>
                        this.setState({ firstName: newValue })
                      }
                    />
                    <TextField
                      className="Appointment-field"
                      name="last_name"
                      hintText="Last Name"
                      floatingLabelText="Last Name"
                      onChange={(evt, newValue) =>
                        this.setState({ lastName: newValue })
                      }
                    />
                    <TextField
                      className="Appointment-field"
                      name="email"
                      hintText="youraddress@mail.com"
                      floatingLabelText="Email"
                      errorText={
                        data.validEmail ? null : "Enter a valid email address"
                      }
                      onChange={(evt, newValue) =>
                        this.validateEmail(newValue)
                      }
                    />
                    <TextField
                      className="Appointment-field"
                      name="phone"
                      hintText="+2348995989"
                      floatingLabelText="Phone"
                      errorText={
                        data.validPhone ? null : "Enter a valid phone number"
                      }
                      onChange={(evt, newValue) =>
                        this.validatePhone(newValue)
                      }
                    />
                    <RaisedButton
                      className="RaisedButtonBig"
                      label={
                        contactFormFilled
                          ? "Confirm Schedule"
                          : "Fill out form to schedule"
                      }
                      labelPosition="before"
                      primary={true}
                      fullWidth={true}
                      onClick={() =>
                        this.setState({
                          confirmationModalOpen: !this.state.confirmationModalOpen
                        })
                      }
                      disabled={!contactFormFilled || data.processed}
                    />
                  </section>
                  {this.renderStepActions(2)}
                </StepContent>
              </Step>
            </Stepper>
          </Card>
          <Dialog
            modal={true}
            open={confirmationModalOpen}
            actions={modalActions}
            title="Confirm your appointment">
            {this.renderAppointmentConfirmation()}
          </Dialog>
          {<SnackBar
            open={ confirmationSnackbarOpen || isLoading }
            message={
              isLoading ? "Loading... " : data.confirmationSnackbarMessage || ""
            }
            autoHideDuration={10000}
            onRequestClose={() =>
              this.setState({ confirmationSnackbarOpen: false })
            }
          />}
        </div>
      </div>
    );
  }
}
export default Appointment;
