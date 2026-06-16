import { Zap, ArrowRight, Play, Activity, Calendar, Heart, Shield, Users, Stethoscope, HeartPulse } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 bg-white overflow-hidden">
      {/* Soft Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-magenta/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-purple-400/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-magenta">Smart Hospital</span>
              <br />
              <span className="text-navy">Management System</span>
            </h1>

            <p className="text-gray-600 text-lg max-w-lg leading-relaxed">
              A comprehensive, cloud-based platform that streamlines operations, enhances patient care, and empowers healthcare professionals with real-time insights and secure data management.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => {
                  navigate('/demo');
                  window.scrollTo(0, 0);
                }}
                className="bg-magenta text-white rounded-full px-8 py-3.5 font-semibold hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                Book a Demo
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white border-2 border-gray-200 rounded-full px-8 py-3.5 font-semibold hover:shadow-lg hover:scale-105 transition-all inline-flex items-center gap-2"
              >
                <Play size={18} className="text-magenta" />
                Watch Video
              </button>
            </div>

            {/* <div className="flex gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold text-navy">500+</p>
                <p className="text-sm text-gray-500">Hospitals</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-magenta">1M+</p>
                <p className="text-sm text-gray-500">Patients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-navy">99.9%</p>
                <p className="text-sm text-gray-500">Uptime</p>
              </div>
            </div> */}
          </div>

          {/* Right Dashboard Card */}
          <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/50 space-y-5">
            {/* Total Patients */}
            <div className="bg-navy rounded-2xl text-white p-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-white/70">Total Patients Today</p>
                <p className="text-3xl font-bold mt-1">1,247</p>
              </div>
              <Activity size={32} className="text-white/50" />
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-magenta" />
                  <span className="text-sm text-gray-500">Appointments</span>
                </div>
                <p className="text-2xl font-bold text-navy">342</p>
                <p className="text-xs text-green-600 mt-1">↑ 12% today</p>
              </div>
              <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={18} className="text-magenta" />
                  <span className="text-sm text-gray-500">Operations</span>
                </div>
                <p className="text-2xl font-bold text-navy">28</p>
                <p className="text-xs text-gray-400 mt-1">5 scheduled</p>
              </div>
            </div>

            {/* Security Status */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-green-600" />
                  <span className="text-sm font-medium text-gray-700">Security Status</span>
                </div>
                <span className="text-sm font-bold text-green-600">95%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '95%' }} />
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-navy/5 rounded-xl p-3 text-center">
                <Stethoscope size={20} className="mx-auto text-navy mb-1" />
                <p className="text-lg font-bold text-navy">89</p>
                <p className="text-xs text-gray-500">Doctors</p>
              </div>
              <div className="bg-magenta/5 rounded-xl p-3 text-center">
                <HeartPulse size={20} className="mx-auto text-magenta mb-1" />
                <p className="text-lg font-bold text-magenta">156</p>
                <p className="text-xs text-gray-500">Nurses</p>
              </div>
              <div className="bg-magenta rounded-xl p-3 text-center text-white">
                <Users size={20} className="mx-auto mb-1" />
                <p className="text-lg font-bold">24/7</p>
                <p className="text-xs text-white/80">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
