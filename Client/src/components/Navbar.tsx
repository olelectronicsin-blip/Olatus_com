import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from './Logo';
import { useContactModal } from '../contexts/ContactModalContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const { openContactModal } = useContactModal();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const serviceSubItems = [
    { name: 'PCB Manufacturing', href: '/pcb-manufacturing' },
    { name: 'Online 3D Printing', href: '/online-3d-printing' },
    { name: 'Product Development & Manufacturing', href: '/product-development' },
    { name: 'Technology Lab Establishment', href: '/technology-lab' },
    { name: 'IT Services & Development', href: '/web-development' },
    { name: 'Embedded Systems & Software', href: '/embedded-software' }

  ];

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services', hasDropdown: true },
    { label: 'Projects', href: '#projects' },
    { label: 'Shop', href: '#shop' },
    { label: 'Training & Internship', href: '/careers#training' },
    { label: 'Contact', href: '#contact' },
    { label: 'About', href: '/about' },
  ];

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
    } else if (href.includes('#')) {
      // Handle route with hash (e.g., /careers#training)
      navigate(href);
      // Scroll to top first
      window.scrollTo(0, 0);
    } else {
      // Regular route navigation
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#002E3C]/95 backdrop-blur-md shadow-lg shadow-cyan-500/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <button onClick={() => handleNavClick('/')} aria-label="OLatus Home" className="cursor-pointer">
              <Logo size={44} showWordmark={true} showTagline={false} mode="dark" />
            </button>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div 
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium relative flex items-center gap-1"
                  >
                    {item.label}
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-64 bg-[#002E3C]/95 backdrop-blur-md rounded-lg shadow-xl border border-cyan-500/20 overflow-hidden transition-all duration-300 ${
                    isServicesOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  }`}>
                    {serviceSubItems.map((subItem) => (
                      <button
                        key={subItem.name}
                        onClick={() => handleNavClick(subItem.href)}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:text-cyan-400 hover:bg-cyan-500/10 transition-all duration-200 text-sm border-b border-cyan-500/10 last:border-b-0"
                      >
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-300 text-sm font-medium relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </button>
              )
            ))}
          </div>

          <button 
            onClick={openContactModal}
            className="hidden md:block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
          >
            Get In Touch
          </button>

          <button
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#002E3C]/98 backdrop-blur-md border-t border-cyan-500/20">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              item.hasDropdown ? (
                <div key={item.label}>
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="w-full flex items-center justify-between text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-2"
                  >
                    <span>{item.label}</span>
                    <ChevronDown size={16} className={`transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isServicesOpen && (
                    <div className="pl-4 space-y-2 mt-2">
                      {serviceSubItems.map((subItem) => (
                        <button
                          key={subItem.name}
                          onClick={() => {
                            handleNavClick(subItem.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block w-full text-left text-gray-400 hover:text-cyan-400 transition-colors duration-300 py-2 text-sm"
                        >
                          {subItem.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    handleNavClick(item.href);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-300 hover:text-cyan-400 transition-colors duration-300 py-2"
                >
                  {item.label}
                </button>
              )
            ))}
            <button 
              onClick={() => {
                openContactModal();
                setIsMobileMenuOpen(false);
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg"
            >
              Get In Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
