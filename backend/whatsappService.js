/**
 * WhatsApp Cloud API Service
 * Handles incoming message parsing, Q&A chatbot logic, and sending outbound messages.
 */

// Simple keyword-based Q&A configuration
const QA_RESPONSES = {
  pricing: "💰 *MediCore Vault Pricing*\n\nOur plans start at $49/month for individual clinics and $199/month for full-scale hospital systems. All plans include automated database backups, security compliance, and 24/7 uptime.\n\nReply with *DEMO* or visit our pricing page to learn more!",
  support: "🛠️ *Technical Support*\n\nNeed help? Our technical support team is active 24/7. You can contact us at medicorevault@gmail.com or call our toll-free helpline at +91 861 874 0880.",
  hours: "🕒 *Business Hours*\n\nOur head office and sales teams are active Monday to Friday from 9:00 AM to 6:00 PM EST.\n\nEmergency server and customer support lines are open 24/7/365.",
  demo: "📅 *Book a Demo*\n\nWe'd love to show you how MediCore Vault works! You can request a personalized product tour directly on our website or by visiting our Demo Portal. Our sales representative will follow up with you shortly.",
  hello: "👋 *Hello! Welcome to MediCore Vault Chatbot!*\n\nHow can we assist you today? You can type any of the following keywords for automated information:\n\n• *Pricing* (for plans & rates)\n• *Support* (for tech assistance)\n• *Hours* (for business hours)\n• *Demo* (to schedule a product tour)",
  hi: "👋 *Hello! Welcome to MediCore Vault Chatbot!*\n\nHow can we assist you today? You can type any of the following keywords for automated information:\n\n• *Pricing* (for plans & rates)\n• *Support* (for tech assistance)\n• *Hours* (for business hours)\n• *Demo* (to schedule a product tour)",
  hey: "👋 *Hello! Welcome to MediCore Vault Chatbot!*\n\nHow can we assist you today? You can type any of the following keywords for automated information:\n\n• *Pricing* (for plans & rates)\n• *Support* (for tech assistance)\n• *Hours* (for business hours)\n• *Demo* (to schedule a product tour)"
};

// Fallback message when user input doesn't match predefined keywords
const FALLBACK_RESPONSE = "🤖 *MediCore Chatbot*\n\nThank you for your message. I didn't quite catch that. Please reply with one of the following keywords:\n\n• *Pricing*\n• *Support*\n• *Hours*\n• *Demo*\n\nAn agent will also review your query and get back to you if further assistance is needed!";

/**
 * Sends a text message to a customer's WhatsApp number using Meta Cloud API.
 * @param {string} to - The recipient's phone number with country code (e.g., 15551234567).
 * @param {string} text - The message body to send.
 */
async function sendWhatsAppMessage(to, text) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;

  if (!token || !phoneNumberId) {
    console.error('[WhatsApp Service] Error: WHATSAPP_ACCESS_TOKEN or WHATSAPP_PHONE_NUMBER_ID is not configured in .env');
    return { success: false, error: 'Configuration missing' };
  }

  const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
  
  const payload = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: to,
    type: 'text',
    text: {
      preview_url: false,
      body: text
    }
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[WhatsApp Service] Meta API Error Response:', JSON.stringify(data));
      return { success: false, error: data };
    }

    console.log(`[WhatsApp Service] Message successfully sent to ${to}. Message ID: ${data.messages?.[0]?.id}`);
    return { success: true, data };
  } catch (error) {
    console.error('[WhatsApp Service] Network Error sending message:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Analyzes incoming message text and triggers the appropriate automated response.
 * @param {string} from - Customer's WhatsApp ID / phone number.
 * @param {string} incomingText - Text message received from the customer.
 */
async function handleIncomingMessage(from, incomingText) {
  const cleanText = incomingText.trim().toLowerCase();
  
  // Find key matches (e.g. if text contains pricing/price, support/help, etc.)
  let replyText = '';
  
  if (cleanText.includes('price') || cleanText.includes('pricing') || cleanText.includes('cost')) {
    replyText = QA_RESPONSES.pricing;
  } else if (cleanText.includes('support') || cleanText.includes('help') || cleanText.includes('issue') || cleanText.includes('trouble')) {
    replyText = QA_RESPONSES.support;
  } else if (cleanText.includes('hours') || cleanText.includes('time') || cleanText.includes('open') || cleanText.includes('close')) {
    replyText = QA_RESPONSES.hours;
  } else if (cleanText.includes('demo') || cleanText.includes('book') || cleanText.includes('schedule') || cleanText.includes('tour')) {
    replyText = QA_RESPONSES.demo;
  } else if (cleanText === 'hi' || cleanText === 'hello' || cleanText === 'hey') {
    replyText = QA_RESPONSES.hello;
  } else {
    replyText = FALLBACK_RESPONSE;
  }

  // Send the automated reply
  return await sendWhatsAppMessage(from, replyText);
}

module.exports = {
  sendWhatsAppMessage,
  handleIncomingMessage
};
