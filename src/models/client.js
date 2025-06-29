const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  cpf: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  birthday: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true, default: 'IN_PROGRESS' }
}, { timestamps: true });

module.exports = mongoose.model('Client', schema);