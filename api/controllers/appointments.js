const { Appointment, Slot } = require('../models/index');
const Nexmo = require("nexmo");

const nexmo = new Nexmo({
  apiKey: "06e12307",
  apiSecret: "vba6YIoJckPUA0oi"
});
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
        /*
          Returns the saved appointment
          After a successful save
        */
        Appointment.find({ _id: saved._id })
          .populate("slots")
          .exec((err, appointment) => res.json(appointment));

        const from = 'Nexmo';
        const to = '27645576224';
        const text = 'Hello Mitso, your appointment schedule reminder.';
        nexmo.message.sendSms(from, to, text);
      }
    });
  }
};

module.exports = appointmentController;
