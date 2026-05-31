import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export default function Features() {
  const [features, setFeatures] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/features`)
      .then(res => res.json())
      .then(data => setFeatures(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-magenta bg-magenta/10 rounded-full mb-4">
            Why Choose Us
          </span>
          <h2 className="text-4xl font-bold text-navy mb-4">Built for Modern Healthcare</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features engineered to meet the demands of today's healthcare environments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat) => {
            const Icon = Icons[feat.icon] || Icons.Circle; // Fallback
            return (
              <div
                key={feat.id}
                className="p-8 bg-white rounded-2xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all"
              >
                <div className={`inline-flex p-4 rounded-xl ${feat.bg} mb-6`}>
                  <Icon className={`w-7 h-7 ${feat.textColor}`} />
                </div>
                <h3 className="text-2xl font-bold text-navy mb-3">{feat.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
