const mongoose = require('mongoose');

// Demo Request Schema
const demoRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  hospitalName: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hospitalName: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Doctor', 'Patient'], default: 'Patient' },
  createdAt: { type: Date, default: Date.now }
});

// Hospital Schema
const hospitalSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});

// PatientRecord Schema
const patientRecordSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorName: { type: String, required: true },
  diagnosis: { type: String, required: true },
  notes: { type: String },
  hospitalName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// FAQ Schema
const faqSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true }
});

// Module Schema
const moduleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  icon: { type: String, required: true },
  bg: { type: String, required: true }
});

// Feature Schema
const featureSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  bg: { type: String, required: true },
  textColor: { type: String, required: true }
});

// Testimonial Schema
const testimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  hospital: { type: String, required: true },
  quote: { type: String, required: true },
  initials: { type: String, required: true }
});

// Partner Schema
const partnerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true }
});

// Create models
const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);
const FAQ = mongoose.model('FAQ', faqSchema);
const Module = mongoose.model('Module', moduleSchema);
const Feature = mongoose.model('Feature', featureSchema);
const Testimonial = mongoose.model('Testimonial', testimonialSchema);
const Partner = mongoose.model('Partner', partnerSchema);
const User = mongoose.model('User', userSchema);
const Hospital = mongoose.model('Hospital', hospitalSchema);
const PatientRecord = mongoose.model('PatientRecord', patientRecordSchema);

module.exports = {
  DemoRequest,
  FAQ,
  Module,
  Feature,
  Testimonial,
  Partner,
  User,
  Hospital,
  PatientRecord
};
