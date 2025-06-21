const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true, select: false  },
  name: { type: String, required: true },
  role: { type: String, required: true, default: 'USER' },
  status: { type: Number, required: true, default: 1 }
}, { timestamps: true });

schema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  
  next();
});

schema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', schema);