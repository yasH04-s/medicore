const axios = require('axios'); // We need axios for API requests

// The automated logic for the WhatsApp bot
const handleIncomingMessage = async (senderPhoneNumber, messageText) => {
  const text = messageText.toLowerCase().trim();
  let replyText = '';

  if (text === '1' || text.includes('support')) {
    replyText = 'Our support team is available 24/7! Please email medicorevault@gmail.com or call +91 861 874 0880.';
  } else if (text === '2' || text.includes('pricing')) {
    replyText = 'We offer Starter, Professional, and Enterprise plans tailored to your facility size. Please reply with "3" to book a demo and discuss pricing in detail!';
  } else if (text === '3' || text.includes('demo') || text.includes('book')) {
    replyText = 'Great! You can book a live demo directly on our website at www.medicorevault.com/#demo. We look forward to showing you the platform!';
  } else {
    replyText = 'Hi there! Welcome to Medicore Vault support.\n\nPlease reply with:\n1 - For Support\n2 - For Pricing\n3 - To Book a Demo';
  }

  // Send the reply back to the user via Meta Cloud API
  await sendWhatsAppMessage(senderPhoneNumber, replyText);
};

// Function to send a message via Meta Cloud API
const sendWhatsAppMessage = async (to, text) => {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId || token.includes('your_')) {
    console.log(`[WhatsApp Bot Simulation] To: ${to} | Message: ${text}`);
    console.log('(Add real WhatsApp tokens in .env to send real messages)');
    return;
  }

  try {
    await axios({
      method: 'POST',
      url: `https://graph.facebook.com/v17.0/${phoneNumberId}/messages`,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: {
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: text },
      },
    });
    console.log('WhatsApp message sent successfully!');
  } catch (error) {
    console.error('Error sending WhatsApp message:', error.response?.data || error.message);
  }
};

module.exports = {
  handleIncomingMessage,
};
