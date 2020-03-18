'use strict';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const SlotSchema = new Schema({
  slot_time: String,
  slot_date: String,
  created_at: Date
});
const Slot = mongoose.model('Slot', SlotSchema);

const AppointmentSchema = new Schema({
  id: ObjectId,
  name: String,
  email: String,
  phone: Number,
  slots:{type: ObjectId, ref: 'Slot'},
  created_at: Date
});
const Appointment = mongoose.model('Appointment', AppointmentSchema);


module.exports = {
  Slot,
  Appointment
}
