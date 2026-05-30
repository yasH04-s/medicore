import { Calendar, Heart, CircleAlert, TrendingUp, Users, Activity } from 'lucide-react';

const DoctorDashboard = () => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C10.34 2 9 3.34 9 5v1H7a2 2 0 00-2 2v2a5 5 0 004 4.9V17a2 2 0 002 2h2a2 2 0 002-2v-2.1A5 5 0 0019 10V8a2 2 0 00-2-2h-2V5c0-1.66-1.34-3-3-3z" />
        </svg>
      </div>
      <h3 className="text-white text-xl font-semibold">Doctor Dashboard</h3>
    </div>

    <div className="bg-white rounded-xl p-5 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Today's Appointments</p>
          <p className="text-3xl font-bold text-navy">24</p>
        </div>
        <div className="w-12 h-12 bg-navy/10 rounded-xl flex items-center justify-center">
          <Calendar className="w-6 h-6 text-navy" />
        </div>
      </div>
      <p className="text-sm text-emerald-600 mt-2 font-medium">↑ 8% vs last week</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white/10 rounded-xl p-4 border border-white/10">
        <Heart className="w-5 h-5 text-red-400 mb-2" />
        <p className="text-2xl font-bold text-white">127</p>
        <p className="text-sm text-white/70">Active Patients</p>
      </div>
      <div className="bg-white/10 rounded-xl p-4 border border-white/10">
        <CircleAlert className="w-5 h-5 text-amber-400 mb-2" />
        <p className="text-2xl font-bold text-white">5</p>
        <p className="text-sm text-white/70">Critical Cases</p>
      </div>
    </div>

    <img
      src="https://images.unsplash.com/photo-1758691462774-f01ed567f2c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxkb2N0b3IlMjB1c2luZyUyMHRhYmxldCUyMG1lZGljYWwlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc3ODE5MjE4Mnww&ixlib=rb-4.1.0&q=80&w=1080"
      alt="Doctor using tablet"
      className="w-full h-48 object-cover rounded-lg"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  </div>
);

const ProgressBar = ({ label, value }) => (
  <div>
    <div className="flex justify-between text-sm mb-1">
      <span className="text-white/80">{label}</span>
      <span className="text-white font-semibold">{value}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div className="h-full bg-navy rounded-full" style={{ width: `${value}%` }} />
    </div>
  </div>
);

const AdminAnalytics = () => (
  <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
        <TrendingUp className="w-5 h-5 text-white" />
      </div>
      <h3 className="text-white text-xl font-semibold">Admin Analytics</h3>
    </div>

    <div className="bg-emerald-500 rounded-xl p-5 mb-4 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/80">Revenue</p>
          <p className="text-3xl font-bold">$1.2M</p>
        </div>
        <TrendingUp className="w-8 h-8 text-white/80" />
      </div>
      <p className="text-sm text-white/90 mt-2 font-medium">↑ 23% from last quarter</p>
    </div>

    <div className="grid grid-cols-2 gap-4 mb-6">
      <div className="bg-white/10 rounded-xl p-4 border border-white/10">
        <Users className="w-5 h-5 text-blue-400 mb-2" />
        <p className="text-2xl font-bold text-white">1,247</p>
        <p className="text-sm text-white/70">Total Staff</p>
      </div>
      <div className="bg-white/10 rounded-xl p-4 border border-white/10">
        <Activity className="w-5 h-5 text-purple-400 mb-2" />
        <p className="text-2xl font-bold text-white">94%</p>
        <p className="text-sm text-white/70">Bed Occupancy</p>
      </div>
    </div>

    <div className="space-y-4">
      <h4 className="text-white font-semibold">Department Performance</h4>
      <ProgressBar label="Emergency" value={95} />
      <ProgressBar label="Surgery" value={88} />
      <ProgressBar label="Radiology" value={92} />
    </div>
  </div>
);

export default function DashboardPreview() {
  return (
    <section className="py-24 bg-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-5 py-2 text-sm text-white font-medium mb-6">
            Dashboard Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Insights at Your Fingertips
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto">
            Real-time dashboards tailored for every role — from physicians tracking patients to administrators monitoring hospital-wide performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <DoctorDashboard />
          <AdminAnalytics />
        </div>
      </div>
    </section>
  );
}
