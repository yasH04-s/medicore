require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { FAQ, Module, Feature, Testimonial, Partner, DemoRequest } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  console.log('Please make sure you have added your MONGO_URI to the .env file!');
});

// --- API Endpoints ---

// Content Endpoints
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await FAQ.find();
    // Mongoose transforms _id to id automatically in some cases, or we map it.
    res.json(faqs.map(f => ({ ...f._doc, id: f._id })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/modules', async (req, res) => {
  try {
    const modules = await Module.find();
    res.json(modules.map(m => ({ ...m._doc, id: m._id })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/features', async (req, res) => {
  try {
    const features = await Feature.find();
    res.json(features.map(f => ({ ...f._doc, id: f._id })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/testimonials', async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.json(testimonials.map(t => ({ ...t._doc, id: t._id })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/partners', async (req, res) => {
  try {
    const partners = await Partner.find();
    res.json(partners.map(p => ({ ...p._doc, id: p._id })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Demo Form Endpoints
app.post('/api/demo', async (req, res) => {
  const { name, email, phone, hospitalName, message } = req.body;
  
  if (!name || !email || !phone || !hospitalName) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newRequest = new DemoRequest({ name, email, phone, hospitalName, message });
    const savedRequest = await newRequest.save();
    res.status(201).json({ id: savedRequest._id, message: 'Demo request saved successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/demo', async (req, res) => {
  try {
    const requests = await DemoRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
