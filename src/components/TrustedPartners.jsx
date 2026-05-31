import { useState, useEffect } from 'react';
import * as Icons from "lucide-react";

export default function TrustedPartners() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
<<<<<<< HEAD
    fetch('/api/partners')
=======
      fetch('/api/partners')
>>>>>>> 659b0e7ed6652c7aec3d8e63baf1af600d5f529b
      .then(res => res.json())
      .then(data => setPartners(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-magenta uppercase text-sm font-semibold tracking-wide mb-2">
            Trusted Worldwide
          </p>
          <h2 className="text-3xl font-bold text-navy">
            Powering Healthcare Excellence
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((partner) => {
            const Icon = Icons[partner.icon] || Icons.Building2;
            return (
              <div
                key={partner.id}
                className="group p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-magenta hover:shadow-lg transition-all text-center"
              >
                <Icon className="w-8 h-8 mx-auto mb-3 text-gray-400 group-hover:text-magenta transition-colors" />
                <p className="text-sm font-medium text-navy">{partner.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
