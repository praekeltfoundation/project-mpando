const { Appointment, Slot } = require('../models/index');

const accountSid = 'AC9807b5b8a82cef2684e246fea732573b';
const authToken = 'fb9a1fcb2b3a1cbff1aa7d6916043028';
const client = require('twilio')(accountSid, authToken);


const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create(req, res) {
    //console.log('CREATED ENTRY::',req, res);
    let requestBody = req.body;
    let newslot = new Slot({
      slot_time: requestBody.slot_time,
      slot_date: requestBody.slot_date,
      created_at: Date.now()
    });
    newslot.save();

    // Creates a new record from a submitted form
    let newappointment = new Appointment({
      name: requestBody.name,
      email: requestBody.email,
      phone: requestBody.phone,
      slots: newslot._id
    });

    let msg = requestBody.name + " " + "this message is to confirm you appointment at" + " " + requestBody.appointment;
    //console.log('FORM',requestBody);
    newappointment.save((err, saved) => {
      //console.log('SAVE',saved);
      if (err) {
        console.log(`Produced:: ${err}`);
      } else {
        client.messages
          .create({
             body: msg,
             from: 'whatsapp:+14155238886',
             to: 'whatsapp:+27645576224'
           })
          .then(message => console.log(message.sid))
          .done();

        Appointment.find({ _id: saved._id })
          .populate("slots")
          .exec((err, appointment) => res.json(appointment));
      }
    });
  }
};

module.exports = appointmentController;
