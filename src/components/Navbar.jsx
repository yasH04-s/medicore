import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const navLinks = ['Features', 'Modules', 'FAQ'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (id) => {
    setIsMobileOpen(false);
    if (id === 'demo') {
      navigate('/demo');
      window.scrollTo(0, 0);
      return;
    }
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img src="/logo.png" alt="Medicore Vault" className="h-10 mix-blend-multiply" />
            <div>
              <span className="text-navy font-bold text-xl">Medicore Vault</span>
              <p className="text-xs text-gray-500">Secure Care, Limitless Trust</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className="text-gray-600 hover:text-navy font-medium transition-colors"
              >
                {link}
              </button>
            ))}
            <Link to="/login" className="text-magenta font-semibold hover:text-navy transition-colors">
              Log In
            </Link>
            <button 
              onClick={() => handleNav('demo')}
              className="bg-magenta text-white rounded-full px-6 py-2.5 font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Book Demo
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-navy" onClick={() => setIsMobileOpen(!isMobileOpen)}>
            {isMobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNav(link)}
                className="block w-full text-left px-4 py-3 text-gray-600 hover:text-navy hover:bg-navy/5 rounded-xl font-medium transition-colors"
              >
                {link}
              </button>
            ))}
            <Link to="/login" onClick={() => setIsMobileOpen(false)} className="block w-full text-left px-4 py-3 text-magenta hover:bg-magenta/5 rounded-xl font-semibold transition-colors">
              Log In
            </Link>
            <button 
              onClick={() => handleNav('demo')}
              className="w-full bg-magenta text-white rounded-full px-6 py-2.5 font-semibold mt-2 hover:shadow-lg transition-all"
            >
              Book Demo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
