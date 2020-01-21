const { Appointment, Slot } = require('../models/index');
const Nexmo = require("nexmo");

const appointmentController = {
  all(req, res) {
    // Returns all appointments
    Appointment.find({}).exec((err, appointments) => res.json(appointments));
  },
  create(req, res) {
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
    const nexmo = new Nexmo({
      apiKey: "06e12307",
      apiSecret: "vba6YIoJckPUA0oi"
    });
    let msg = requestBody.name + " " + "this message is to confirm you appointment at" + " " + requestBody.appointment;
    // and saves the record to
    // the data base

    console.log('Get messages',requestBody);
    newappointment.save((err, saved) => {
      if (err) {
        console.log(`Produced:: ${err}`);
      } else {
      // Returns the saved appointment
        // After a successful save
        Appointment.find({ _id: saved._id })
          .populate("slots")
          .exec((err, appointment) => res.json(appointment));
        
        const message = {
          content: {
            type: 'text',
            text: msg
          }
        }

        console.log(message.content.text);

        // nexmo.channel.send(
        //   { type: 'whatsapp', number: '27658159892' },
        //   message,
        //   (err, data) => {
        //     console.log(data.message_uuid);
        //   }
        // );
      }
    });
  }
};

module.exports = appointmentController;
