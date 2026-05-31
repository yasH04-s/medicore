import { useState, useEffect } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

export default function FAQ() {
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/faqs`)
      .then(res => res.json())
      .then(data => setFaqs(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-sm font-semibold rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about Medicore Vault. Can't find your answer? Reach out to our support team.
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className="bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                >
                  <span className="text-lg font-semibold text-navy pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-magenta shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-96 pb-6' : 'max-h-0'
                  }`}
                >
                  <p className="px-6 text-gray-600 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-4xl mx-auto mt-12 bg-magenta/5 border border-magenta/20 rounded-2xl p-8 text-center">
          <h3 className="text-xl font-bold text-navy mb-2">Still have questions?</h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help. Get in touch and we'll respond within 24 hours.
          </p>
          <a href="tel:+15551234567" className="inline-flex items-center gap-2 bg-magenta hover:bg-magenta-dark text-white font-semibold px-6 py-3 rounded-xl transition-colors cursor-pointer">
            <MessageCircle className="w-5 h-5" />
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
