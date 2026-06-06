require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { FAQ, Module, Feature, Testimonial, Partner, DemoRequest, User } = require('./models');
const { handleIncomingMessage } = require('./chatbot');


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);

  const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev';
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  console.log('Please make sure you have added your MONGO_URI to the .env file!');
});

// --- API Endpoints ---

// Auth Endpoints
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, hospitalName, password } = req.body;
  if (!name || !email || !hospitalName || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUser = new User({ name, email, hospitalName, password: hashedPassword });
    await newUser.save();
    
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
    
    const payload = { userId: user._id, email: user.email, name: user.name };
    const secret = process.env.JWT_SECRET || 'fallback_secret_for_dev';
    const token = jwt.sign(payload, secret, { expiresIn: '1d' });
    
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, hospitalName: user.hospitalName } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Analytics Endpoint
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const totalStaff = await User.countDocuments();
    const totalPatients = await DemoRequest.countDocuments() + 1200; // Fake some base data
    
    // Generate dynamic pseudo-data for the rest
    const baseRevenue = 1000000;
    const revenue = baseRevenue + (totalPatients * 150) + (totalStaff * 500);
    
    res.json({
      totalStaff,
      totalPatients,
      revenue: `$${(revenue / 1000000).toFixed(1)}M`,
      bedOccupancy: Math.floor(Math.random() * 15) + 80, // Random between 80-95
      departmentPerformance: {
        emergency: Math.floor(Math.random() * 10) + 90,
        surgery: Math.floor(Math.random() * 15) + 80,
        radiology: Math.floor(Math.random() * 10) + 85
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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

// --- WhatsApp Business Webhook Endpoints ---

/**
 * Verification GET endpoint for Meta to authorize the webhook configuration.
 */
app.get('/webhook', (req, res) => {
  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN;
  
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === verifyToken) {
      console.log('[Webhook] Verification successful.');
      return res.status(200).send(challenge);
    } else {
      console.warn('[Webhook] Verification failed. Verify tokens mismatch.');
      return res.sendStatus(403);
    }
  }
  
  return res.status(400).send('Missing hub parameters');
});

/**
 * POST endpoint to receive real-time notifications/messages from WhatsApp Cloud API.
 */
app.post('/webhook', async (req, res) => {
  const body = req.body;

  // Log payload for tracking incoming interactions
  console.log('[Webhook] Received WhatsApp event payload:', JSON.stringify(body, null, 2));

  if (body.object === 'whatsapp_business_account') {
    try {
      const entry = body.entry?.[0];
      const change = entry?.changes?.[0];
      const value = change?.value;
      
      if (value && value.messages && value.messages[0]) {
        const message = value.messages[0];
        const from = message.from;
        
        if (message.type === 'text') {
          const text = message.text.body;
          console.log(`[Webhook] Text message received from ${from}: "${text}"`);
          
          // Reply asynchronously using our chatbot auto-reply logic
          await handleIncomingMessage(from, text);
        } else {
          console.log(`[Webhook] Received message of type "${message.type}" from ${from} (skipping auto-reply).`);
        }
      }
      
      return res.status(200).send('EVENT_RECEIVED');
    } catch (error) {
      console.error('[Webhook] Error processing incoming WhatsApp event:', error);
      return res.status(500).send('INTERNAL_SERVER_ERROR');
    }
  } else {
    return res.sendStatus(404);
  }
});


app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
