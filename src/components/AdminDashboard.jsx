import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, TrendingUp, Users, Activity, Settings, Bell, Search, Menu, X } from 'lucide-react';

const ProgressBar = ({ label, value }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-navy font-bold">{value}%</span>
    </div>
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className="h-full bg-magenta rounded-full transition-all duration-1000" style={{ width: `${value}%` }} />
    </div>
  </div>
);

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Check auth and load data
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login');
          return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to fetch stats');
        
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-magenta border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-50 text-red-500 p-6 rounded-xl border border-red-100 max-w-md text-center">
          <p className="font-semibold mb-2">Error Loading Dashboard</p>
          <p className="text-sm">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-white text-red-600 rounded-lg shadow-sm border border-red-200">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12 flex relative">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 flex flex-col z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Menu</p>
            <button className="lg:hidden text-gray-400 hover:text-navy" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-magenta/10 text-magenta rounded-xl font-medium">
              <TrendingUp size={20} /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Users size={20} /> Staff Directory
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Activity size={20} /> Live Operations
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
              <Settings size={20} /> Settings
            </a>
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-gray-100">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-xl font-medium transition-colors"
          >
            <LogOut size={20} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:ml-64 px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-navy">Welcome back, {user.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{user.hospitalName} • Admin View</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search records..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-magenta/20" />
            </div>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-magenta transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>

        {/* Dynamic Metric Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-gradient-to-br from-magenta to-purple-600 rounded-2xl p-6 text-white shadow-lg shadow-magenta/20">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <TrendingUp size={20} />
              </div>
              <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm">+14% YoY</span>
            </div>
            <p className="text-white/80 text-sm font-medium mb-1">Estimated Revenue</p>
            <h3 className="text-3xl font-bold">{stats.revenue}</h3>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-4">
              <Users size={20} />
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Registered Staff</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-navy">{stats.totalStaff}</h3>
              <span className="text-sm text-green-500 font-medium mb-1">+2 today</span>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center mb-4">
              <Activity size={20} />
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Active Patients</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-navy">{stats.totalPatients.toLocaleString()}</h3>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp size={20} />
            </div>
            <p className="text-gray-500 text-sm font-medium mb-1">Bed Occupancy</p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-bold text-navy">{stats.bedOccupancy}%</h3>
              <span className="text-sm text-gray-400 font-medium mb-1">Capacity</span>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chart Placeholder */}
          <div className="lg:col-span-2 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-navy">Patient Admission Trends</h3>
              <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 outline-none">
                <option>This Week</option>
                <option>This Month</option>
              </select>
            </div>
            {/* Fake Chart Area */}
            <div className="h-64 w-full flex items-end justify-between gap-2 pt-10">
              {[40, 70, 45, 90, 65, 85, 100].map((h, i) => (
                <div key={i} className="w-full bg-blue-50 rounded-t-sm relative group">
                  <div className="absolute bottom-0 w-full bg-magenta rounded-t-sm transition-all duration-1000" style={{ height: `${h}%` }}></div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-xs text-gray-400 font-medium">
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>

          {/* Department Performance */}
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-navy mb-6">Department Performance</h3>
            <ProgressBar label="Emergency Dept." value={stats.departmentPerformance.emergency} />
            <ProgressBar label="Surgery & OR" value={stats.departmentPerformance.surgery} />
            <ProgressBar label="Radiology" value={stats.departmentPerformance.radiology} />
            
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h4 className="text-sm font-bold text-navy mb-4">Recent Alerts</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-red-500 shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">ICU Capacity Warning</p>
                    <p className="text-xs text-gray-400">2 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-500 shrink-0"></div>
                  <div>
                    <p className="text-sm text-gray-700 font-medium">Pharmacy Restock Needed</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
