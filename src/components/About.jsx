import { CircleCheck, Target, Users, TrendingUp, Clock } from "lucide-react";

const bullets = [
  "Integrated patient records management",
  "Real-time departmental coordination",
  "Advanced analytics and reporting",
  "HIPAA compliant security standards",
];

const stats = [
  { value: "500+", label: "Healthcare Facilities", icon: Target, bg: "bg-navy" },
  { value: "1M+", label: "Active Patients", icon: Users, bg: "bg-magenta" },
  { value: "99.9%", label: "System Uptime", icon: TrendingUp, bg: "bg-navy" },
  { value: "24/7", label: "Support Available", bg: "bg-magenta", fullCard: true },
];

export default function About() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-magenta font-semibold text-sm">About Medicore Vault</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy mt-3 mb-6 leading-tight tracking-tight">
              Centralized Healthcare
              <br />
              <span className="text-magenta">Operations Platform</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8">
              Medicore Vault is a comprehensive hospital management system designed to
              streamline every aspect of healthcare operations. From patient admissions
              to discharge, our platform ensures seamless coordination across all
              departments, enabling healthcare providers to focus on what matters
              most — patient care.
            </p>
            <ul className="space-y-4">
              {bullets.map((text) => (
                <li key={text} className="flex items-center gap-3">
                  <CircleCheck className="w-5 h-5 text-green-500 shrink-0" />
                  <span className="text-gray-700">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — 2x2 staggered stat grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Column 1 */}
            <div className="space-y-6">
              {stats.filter((_, i) => i % 2 === 0).map((s) => (
                <StatCard key={s.value} {...s} />
              ))}
            </div>
            {/* Column 2 — staggered */}
            <div className="space-y-6 pt-12">
              {stats.filter((_, i) => i % 2 === 1).map((s) => (
                <StatCard key={s.value} {...s} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ value, label, icon: Icon, bg, fullCard }) {
  if (fullCard) {
    return (
      <div className={`${bg} text-white rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all`}>
        <p className="text-3xl font-bold">{value}</p>
        <p className="text-sm mt-1 opacity-90">{label}</p>
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className={`${bg} w-10 h-10 rounded-lg flex items-center justify-center mb-4`}>
        {Icon && <Icon className="w-5 h-5 text-white" />}
      </div>
      <p className="text-3xl font-bold text-navy">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
    </div>
  );
}
