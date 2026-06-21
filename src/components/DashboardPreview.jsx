import { useState, useEffect } from 'react';
import { Calendar, Heart, CircleAlert, TrendingUp, Users, Activity } from 'lucide-react';

const DoctorDashboard = ({ stats }) => {
  const [appointments, setAppointments] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) setAppointments(prev => prev + 1);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const patients = stats ? stats.totalPatients : 127;

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-magenta to-cyan-500 rounded-3xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative h-full bg-[#1a2238] backdrop-blur-xl rounded-3xl p-8 border border-white/10 transform transition-all duration-500 group-hover:-translate-y-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C10.34 2 9 3.34 9 5v1H7a2 2 0 00-2 2v2a5 5 0 004 4.9V17a2 2 0 002 2h2a2 2 0 002-2v-2.1A5 5 0 0019 10V8a2 2 0 00-2-2h-2V5c0-1.66-1.34-3-3-3z" />
            </svg>
          </div>
          <h3 className="text-white text-xl font-semibold">Doctor Dashboard</h3>
        </div>

        <div className="bg-white rounded-xl p-5 mb-4 shadow-lg transform transition-transform hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <div className="flex items-baseline gap-2">
                <p className="text-3xl font-bold text-navy transition-all duration-300">{appointments}</p>
                {appointments > 24 && <span className="text-xs text-magenta animate-pulse border border-magenta/30 bg-magenta/10 px-2 py-0.5 rounded-full">New</span>}
              </div>
            </div>
            <div className="w-12 h-12 bg-navy/5 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-navy" />
            </div>
          </div>
          <p className="text-sm text-emerald-600 mt-2 font-medium flex items-center gap-1">
            <TrendingUp className="w-4 h-4" /> 8% vs last week
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <Heart className="w-5 h-5 text-red-400 mb-2 animate-pulse" />
            <p className="text-2xl font-bold text-white transition-all duration-300">{patients}</p>
            <p className="text-sm text-white/60">Active Patients</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <CircleAlert className="w-5 h-5 text-amber-400 mb-2" />
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-sm text-white/60">Critical Cases</p>
          </div>
        </div>

        <div className="relative rounded-lg overflow-hidden group/img">
          <img
            src="/analytics-dashboard.png"
            alt="Doctor using tablet"
            className="w-full h-48 object-cover transform transition-transform duration-700 group-hover/img:scale-110"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2238] via-transparent to-transparent opacity-80 pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
};

const ProgressBar = ({ label, value }) => (
  <div className="group/bar cursor-pointer">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-white/80 group-hover/bar:text-white transition-colors">{label}</span>
      <span className="text-white font-semibold">{value}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-cyan-400 to-magenta rounded-full relative overflow-hidden" 
        style={{ width: `${value}%` }}
      >
        <div className="absolute inset-0 bg-white/20 transform -translate-x-full group-hover/bar:translate-x-full transition-transform duration-1000"></div>
      </div>
    </div>
  </div>
);

const AdminAnalytics = ({ stats }) => {
  const revenueStr = stats ? stats.revenue : "$1.200M";
  const occupancy = stats ? stats.bedOccupancy : 94;
  const totalStaff = stats ? stats.totalStaff : 1247;
  const emergency = stats?.departmentPerformance?.emergency || 95;
  const surgery = stats?.departmentPerformance?.surgery || 88;
  const radiology = stats?.departmentPerformance?.radiology || 92;

  const formatRevenue = (val) => {
    return "$" + (val / 1000000).toFixed(3) + "M";
  };

  return (
    <div className="relative group h-full">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-magenta rounded-3xl blur opacity-0 group-hover:opacity-40 transition duration-500"></div>
      <div className="relative h-full bg-[#1a2238] backdrop-blur-xl rounded-3xl p-8 border border-white/10 transform transition-all duration-500 group-hover:-translate-y-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-white text-xl font-semibold">Admin Analytics</h3>
        </div>

        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl p-5 mb-4 text-white shadow-lg transform transition-transform hover:scale-[1.02] relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-sm text-white/80">Live Revenue</p>
              <p className="text-3xl font-bold font-mono tracking-tight">{revenueStr}</p>
            </div>
            <div className="p-3 bg-white/20 rounded-full animate-pulse">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-sm text-emerald-50 mt-2 font-medium relative z-10">↑ 23% from last quarter</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <p className="text-2xl font-bold text-white">{totalStaff}</p>
            <p className="text-sm text-white/60">Total Staff</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
            <Activity className="w-5 h-5 text-purple-400 mb-2" />
            <p className="text-2xl font-bold text-white transition-all duration-300">{occupancy}%</p>
            <p className="text-sm text-white/60">Bed Occupancy</p>
          </div>
        </div>

        <div className="space-y-5">
          <h4 className="text-white font-semibold flex items-center justify-between">
            Department Performance
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-magenta opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-magenta"></span>
            </span>
          </h4>
          <ProgressBar label="Emergency" value={emergency} />
          <ProgressBar label="Surgery" value={surgery} />
          <ProgressBar label="Radiology" value={radiology} />
        </div>
      </div>
    </div>
  );
};

export default function DashboardPreview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || ''}/api/public/stats`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Error fetching public stats:', err));
  }, []);

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-magenta/20 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 relative">
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2 text-sm text-white font-medium mb-6 hover:bg-white/20 transition-colors cursor-pointer">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            Live Dashboard Preview
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Powerful Insights at Your Fingertips
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Real-time dashboards tailored for every role — from physicians tracking patients to administrators monitoring hospital-wide performance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <DoctorDashboard stats={stats} />
          <AdminAnalytics stats={stats} />
        </div>
      </div>
    </section>
  );
}
