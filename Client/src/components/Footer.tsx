import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // If we're not on home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation, then scroll to section
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Regular route navigation
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  const footerLinks = {
    Company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Team', href: '/about#team' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '#contact' },
    ],
    Services: [
      { label: 'PCB Manufacturing', href: '/pcb-manufacturing' },
      { label: 'Online 3D Printing', href: '/online-3d-printing' },
      { label: 'Product Development', href: '/product-development' },
      { label: 'Technology Lab Setup', href: '/technology-lab' },
      { label: 'IT Services & Development', href: '/web-development' },
      { label: 'Embedded Systems & Software', href: '/embedded-software' },
    ],
    Resources: [
      { label: 'Training Programs', href: '/careers#training' },
      { label: 'Projects', href: '#projects' },
      { label: 'Blog', href: '#' },
      { label: 'Documentation', href: '/documentation' },
    ],
  };

  return (
  <footer className="relative bg-[#001a24]/25 backdrop-blur-sm border-t border-cyan-500/20">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} showWordmark={true} showTagline={true} mode="dark" />
            </div>
            <p className="text-gray-400 text-sm mb-4 leading-relaxed">
              Engineering the Future of Core Electronics and Smart Technology.
              One of India's pioneering tech innovation companies.
            </p>
              

            <div className="flex gap-2">
              <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                <span className="text-cyan-400 text-xs">ISO Certified</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30">
                <span className="text-purple-400 text-xs">Made in India</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          
          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Mail className="text-cyan-400 mt-0.5 flex-shrink-0" size={16} />
                <a href="mailto:support@olatus.com" className="hover:text-cyan-400 transition-colors">
                  support@olatus.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <Phone className="text-cyan-400 mt-0.5 flex-shrink-0" size={16} />
                <a href="tel:+916900105606" className="hover:text-cyan-400 transition-colors">
                  +91 69001 05606
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-400 text-sm">
                <MapPin className="text-cyan-400 mt-0.5 flex-shrink-0" size={16} />
                <a 
                  href="https://maps.google.com/?q=346+Zoo+Narengi+Road+Guwahati+Assam+781024" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-cyan-400 transition-colors"
                >
                  House No: 346, 1st Floor, Zoo-Narengi Rd, opp. Barista Cafe, Ambikagirinagar, Guwahati, Assam 781024
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-cyan-500/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {currentYear} Olatus. All rights reserved. Engineering the Future.
            </p>
            <div className="flex gap-6 text-sm">
              <button onClick={() => handleNavClick('/privacy-policy')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                Privacy Policy
              </button>
              <button onClick={() => handleNavClick('/terms-of-service')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                Terms of Service
              </button>
              <button onClick={() => handleNavClick('/cookie-policy')} className="text-gray-400 hover:text-cyan-400 transition-colors">
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
