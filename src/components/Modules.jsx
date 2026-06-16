import { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export default function Modules() {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/modules`)
      .then(res => res.json())
      .then(data => setModules(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section id="modules" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 text-sm font-semibold text-magenta bg-magenta/10 rounded-full mb-4">
            Complete Solution
          </span>
          <h2 className="text-4xl font-bold text-navy mb-4">HMS Modules</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive modules designed to streamline every aspect of hospital management.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((mod) => {
            const Icon = Icons[mod.icon] || Icons.Circle; // Fallback icon
            return (
              <div
                key={mod.id}
                className="group p-6 bg-white rounded-2xl border border-gray-200 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${mod.bg} mb-5`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-navy mb-2">{mod.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{mod.desc}</p>
                {/* <span className="text-sm font-semibold text-magenta opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more →
                </span> */}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
