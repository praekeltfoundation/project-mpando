const { Appointment, Slot } = Model;
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
    let msg = requestBody.name + " " +
      "this message is to confirm your appointment at" +
      " " + requestBody.appointment;
    // and saves the record to
    // the data base
    newappointment.save((err, saved) => {
      // Returns the saved appointment
      // after a successful save
      Appointment.find({ _id: saved._id })
        .populate("slots")
        .exec((err, appointment) => res.json(appointment));
      const from = VIRTUAL_NUMBER;
      const to = RECIPIENT_NUMBER;
      const message = {
        content: {
          type: 'text',
          text: msg
        }
      }

      // nexmo.message.sendSms(from, to, msg, (err, responseData) => {
      //   if (err) {
      //     console.log(err);
      //   } else {
      //     console.dir(responseData);
      //   }
      // });

      nexmo.channel.send(
        { type: 'whatsapp', number: '27658159892' },
        { type: 'whatsapp', number: '27658159892' },
        message,
        (err, data) => {
          console.log(data.message_uuid);
        }
      );

    });
  }
};
module.exports = appointmentController;
