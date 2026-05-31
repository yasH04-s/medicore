import { useState, useEffect } from 'react';
import { Quote, Star } from 'lucide-react';

function TestimonialCard({ name, role, hospital, initials, quote }) {
  return (
    <div className="relative p-8 bg-gray-50 rounded-2xl border border-gray-200 hover:shadow-2xl transition-all">
      <Quote className="absolute top-6 right-6 w-10 h-10 text-navy opacity-10" />

      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
        ))}
      </div>

      <p className="text-gray-700 leading-relaxed mb-6">"{quote}"</p>

      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-navy rounded-full flex items-center justify-center text-white font-bold text-sm">
          {initials}
        </div>
        <div>
          <p className="font-semibold text-navy">{name}</p>
          <p className="text-sm text-gray-500">{role}</p>
          <p className="text-sm text-magenta">{hospital}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(res => res.json())
      .then(data => setTestimonials(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-navy/10 text-navy text-sm font-semibold rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-navy mb-4">
            Trusted by Healthcare Leaders
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hear from hospitals and medical professionals who have transformed their operations with
            Medicore Vault.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
