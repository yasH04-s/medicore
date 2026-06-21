import { useState, useEffect } from 'react';
import { CircleCheck, Send } from 'lucide-react';

const bulletPoints = [
  'Live walkthrough of all platform features',
  'Custom configuration for your hospital',
  'Free 30-day trial with full support',
  'No credit card required to get started',
];

export default function DemoForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', hospitalName: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      const t = setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', hospitalName: '', message: '' });
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [submitted]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/demo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert('Failed to submit demo request. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server.');
    }
  };

  const inputClass =
    'w-full px-4 py-3 bg-white/80 border border-gray-300 rounded-xl focus:ring-2 focus:ring-magenta focus:border-transparent outline-none transition-all';

  return (
    <section id="demo" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-navy/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-magenta/10 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-magenta/10 text-magenta text-sm font-semibold rounded-full mb-6">
              Get Started Today
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-navy leading-tight mb-6">
              Book Your
              <br />
              <span className="text-magenta">Personalized Demo</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              See how Medicore Vault can transform your hospital operations. Our team will walk you
              through every feature tailored to your specific needs and workflows.
            </p>
            <ul className="space-y-4">
              {bulletPoints.map((point) => (
                <li key={point} className="flex items-center gap-3 text-gray-700">
                  <CircleCheck className="w-5 h-5 text-green-500 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Right side – form card */}
          <div className="bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <CircleCheck className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Thank You!</h3>
                <p className="text-gray-600">We'll contact you within 24 hours</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    pattern="[0-9\+\-\s]+"
                    title="Please enter a valid phone number"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={form.hospitalName}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={3}
                    className={inputClass}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-magenta text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all"
                >
                  <Send className="w-5 h-5" />
                  Book Demo
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
