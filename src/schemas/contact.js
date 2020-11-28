const mongoose = require('mongoose');
const { Schema } = mongoose;

const contactSchema = new Schema(
  {
    name: { type: String, required: [true, 'Name contact is required'] },
    email: { type: String, required: [true, 'Email contact is required'] },
    phone: { type: String, required: [true, 'Phone contact is required'] },
    subscription: {
      type: String,
      required: [true, 'Subscription contact is required'],
    },
    password: {
      type: String,
      required: [true, 'Password contact is required'],
    },
    token: { type: String },
  },
  { versionKey: false, timestamps: true },
);

const Contact = mongoose.model('contact', contactSchema);

module.exports = Contact;
