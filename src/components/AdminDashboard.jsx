import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Activity, Settings, LogOut, Search, Bell, TrendingUp, Plus } from 'lucide-react';

const ProgressBar = ({ label, value }) => (
  <div className="mb-4">
    <div className="flex justify-between text-sm mb-1">
      <span className="font-medium text-gray-700">{label}</span>
      <span className="text-gray-500 font-medium">{value}%</span>
    </div>
    <div className="w-full bg-gray-100 rounded-full h-2">
      <div className="bg-magenta h-2 rounded-full transition-all duration-1000" style={{ width: `${value}%` }}></div>
    </div>
  </div>
);

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ patientEmail: '', diagnosis: '', notes: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (!userData || !token) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    setUser(parsedUser);

    const fetchData = async () => {
      try {
        // Fetch Stats for Admins/Doctors
        if (parsedUser.role !== 'Patient') {
          const statsRes = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (statsRes.ok) {
            setStats(await statsRes.json());
          }
        }

        // Fetch Records
        const recordsRes = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/records`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (recordsRes.ok) {
          setRecords(await recordsRes.json());
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleAddRecord = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/records`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newRecord)
      });
      const data = await res.json();
      if (res.ok) {
        // Optimistic UI update or refetch. Let's just prepend.
        // The new record might need populated patient info, but we'll reload for simplicity.
        alert('Record added successfully');
        setNewRecord({ patientEmail: '', diagnosis: '', notes: '' });
        window.location.reload();
      } else {
        alert(data.error || 'Failed to add record');
      }
    } catch (err) {
      alert('Error creating record');
    }
  };

  if (loading || !user) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Dashboard...</div>;
  }

  const isStaff = user.role === 'Admin' || user.role === 'Doctor';

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans pt-16">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-100 flex flex-col z-50 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-navy flex items-center gap-2">
            <span className="text-magenta">+</span> Medicore
          </Link>
        </div>
        <div className="flex-1 px-4 py-6 overflow-y-auto">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-4">Menu</div>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-magenta/5 text-magenta rounded-xl font-medium transition-colors">
              <LayoutDashboard size={20} /> Dashboard
            </a>
            {isStaff && (
              <>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <Users size={20} /> Patients
                </a>
                <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl font-medium transition-colors">
                  <Activity size={20} /> Live Operations
                </a>
              </>
            )}
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
      <main className="flex-1 lg:ml-0 px-4 sm:px-6 lg:px-8 py-8 w-full max-w-7xl mx-auto overflow-y-auto">
        
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
            <div>
              <h1 className="text-2xl font-bold text-navy">Welcome back, {user.name}</h1>
              <p className="text-gray-500 text-sm mt-1">{user.hospitalName} • {user.role} View</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-magenta/20" />
            </div>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:text-magenta transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </div>

        {/* Analytics visible only to Staff */}
        {isStaff && stats && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
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
              <ProgressBar label="Emergency Dept." value={stats.departmentPerformance?.emergency || 94} />
              <ProgressBar label="Surgery & OR" value={stats.departmentPerformance?.surgery || 81} />
              <ProgressBar label="Radiology" value={stats.departmentPerformance?.radiology || 87} />
              
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
        )}

        {/* Patient Records Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className={`bg-white border border-gray-100 rounded-2xl p-6 shadow-sm ${isStaff ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
            <h3 className="text-lg font-bold text-navy mb-6">{isStaff ? 'Hospital Patient Records' : 'My Medical Records'}</h3>
            
            {records.length === 0 ? (
              <div className="py-8 text-center text-gray-500">No records found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-600">
                  <thead className="bg-gray-50 text-gray-700 uppercase">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Date</th>
                      {isStaff && <th className="px-4 py-3">Patient</th>}
                      <th className="px-4 py-3">Doctor</th>
                      <th className="px-4 py-3">Diagnosis</th>
                      <th className="px-4 py-3 rounded-tr-lg">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {records.map(record => (
                      <tr key={record._id} className="hover:bg-gray-50/50">
                        <td className="px-4 py-3">{new Date(record.createdAt).toLocaleDateString()}</td>
                        {isStaff && <td className="px-4 py-3 font-medium text-navy">{record.patientId?.name || 'Unknown'}</td>}
                        <td className="px-4 py-3">{record.doctorName}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-md text-xs font-semibold">{record.diagnosis}</span>
                        </td>
                        <td className="px-4 py-3 max-w-xs truncate">{record.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add Record Form (Staff Only) */}
          {isStaff && (
            <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm self-start">
              <h3 className="text-lg font-bold text-navy mb-6">Add New Record</h3>
              <form onSubmit={handleAddRecord} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Email</label>
                  <input
                    type="email"
                    required
                    value={newRecord.patientEmail}
                    onChange={(e) => setNewRecord({...newRecord, patientEmail: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta outline-none transition-all text-sm"
                    placeholder="patient@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
                  <input
                    type="text"
                    required
                    value={newRecord.diagnosis}
                    onChange={(e) => setNewRecord({...newRecord, diagnosis: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta outline-none transition-all text-sm"
                    placeholder="e.g. Viral Fever"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    rows={3}
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({...newRecord, notes: e.target.value})}
                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-magenta focus:border-magenta outline-none transition-all text-sm"
                    placeholder="Treatment plan..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-magenta text-white py-2.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 text-sm"
                >
                  <Plus size={16} /> Save Record
                </button>
              </form>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
