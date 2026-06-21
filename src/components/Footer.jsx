import { Globe, Mail, Phone, MapPin } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const productLinks = ['Features', 'Modules', 'Security', 'Integrations'];
const moduleLinks = ['Doctor Portal', 'Patient Management', 'Billing System', 'Pharmacy', 'Laboratory'];
const socials = [
  { icon: Globe, href: '#' },
  { icon: InstagramIcon, href: 'https://www.instagram.com/medicorevault/' },
  { icon: LinkedinIcon, href: 'https://www.linkedin.com/company/dscape-ai-private-limited/' },
  { icon: Mail, href: 'mailto:medicorevault@gmail.com' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Medicore Vault" className="h-12" />
              <span className="text-2xl font-bold">Medicore Vault</span>
            </div>
            <p className="text-magenta-light font-medium mb-2">
              Modern Hospital Management
            </p>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-sm">
              Empowering healthcare facilities with intelligent management solutions. Streamline operations, enhance patient care, and drive better outcomes.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-magenta transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Modules */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Modules</h4>
            <ul className="space-y-3">
              {moduleLinks.map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-magenta shrink-0 mt-0.5" />
                <a href="mailto:medicorevault@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                  medicorevault@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-magenta shrink-0 mt-0.5" />
                <a href="tel:+918618740880" className="text-gray-400 hover:text-white transition-colors">
                  +91 861 874 0880
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-magenta shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  No.50/7, 5th Floor, 16th Main, 39th Cross<br/>Jayanagar 4th T Block, Bangalore-560041
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">
            © {year} Medicore Vault. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
