import { X, Send } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your API call here
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-[#001a24] rounded-2xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20 animate-slideUp">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-lg bg-[#002E3C]/80 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 text-gray-400 hover:text-white transition-all duration-300 group"
        >
          <X className="group-hover:rotate-90 transition-transform duration-300" size={20} />
        </button>

        {/* Header */}
        <div className="p-6 sm:p-8 pb-4 sm:pb-6 border-b border-cyan-500/20">
          <div className="inline-block px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-3 sm:mb-4">
            <span className="text-cyan-400 text-xs sm:text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Send Us a <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">Message</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base">
            Fill out the form below and we'll get back to you as soon as possible
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {/* Name Fields */}
            <div>
              <label htmlFor="firstName" className="block text-gray-400 text-xs sm:text-sm mb-1.5">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="John"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-gray-400 text-xs sm:text-sm mb-1.5">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-gray-400 text-xs sm:text-sm mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-gray-400 text-xs sm:text-sm mb-1.5">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>

            {/* Service Selection */}
            <div className="sm:col-span-2">
              <label htmlFor="service" className="block text-gray-400 text-xs sm:text-sm mb-1.5">
                Service Interested In
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all appearance-none cursor-pointer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2322d3ee'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.25rem',
                }}
              >
                <option value="" disabled>Select a service</option>
                <option value="web">IT Services & Development</option>
                <option value="embedded">Embedded Systems & Software</option>
                <option value="product">Product Design & Development</option>
                <option value="3d">3D Modeling & Printing</option>
                <option value="pcb">PCB Design & Manufacturing</option>
                <option value="ecommerce">E-commerce Solutions</option>
                <option value="manufacturing">Custom Manufacturing</option>
                <option value="lab">Technology Lab Setup</option>
                <option value="training">Training & Internships</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-gray-400 text-xs sm:text-sm mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                placeholder="Tell us about your project or inquiry..."
                required
                className="w-full px-3 py-2 sm:px-4 sm:py-2.5 text-sm sm:text-base bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-5 sm:mt-6 py-3 sm:py-3.5 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
          >
            Send Message
            <Send className="group-hover:translate-x-1 transition-transform" size={18} />
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactModal;
