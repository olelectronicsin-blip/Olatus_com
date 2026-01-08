import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Facebook, Twitter, Linkedin, Instagram, Github } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { submitContactForm } from '../lib/serviceApi';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'support@olatus.com',
    link: 'mailto:support@olatus.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    value: '+91 69001 05606',
    link: 'tel:+916900105606',
  },
  {
    icon: MapPin,
    title: 'Address',
    value: 'House No: 346, 1st Floor, Zoo-Narengi Rd, opp. Barista Cafe and Geetanagar, Ambikagirinagar, Guwahati, Assam 781024',
    link: 'https://maps.google.com/?q=346+Zoo+Narengi+Road+Guwahati+Assam+781024',
  },
];

const socialLinks = [
  { icon: Facebook, link: '#', label: 'Facebook' },
  { icon: Twitter, link: '#', label: 'Twitter' },
  { icon: Linkedin, link: '#', label: 'LinkedIn' },
  { icon: Instagram, link: '#', label: 'Instagram' },
  { icon: Github, link: '#', label: 'GitHub' },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (formData.message.trim().length < 10) {
      toast.error('Message must be at least 10 characters long');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitContactForm(formData);
      toast.success('Your message has been sent successfully! We\'ll get back to you soon.');

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">
      <Toaster position="top-right" />


      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <span className="text-cyan-400 text-sm font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Connect <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">With Us</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Let's discuss how we can help bring your innovative ideas to life
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Let's Build Something Amazing</h3>
              <p className="text-gray-300 mb-6">
                Whether you're looking to develop a new product, set up a technology lab,
                or explore training opportunities, we're here to help you succeed.
              </p>
            </div>

            <div className="space-y-4">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center gap-4 p-4 bg-[#001a24]/80 backdrop-blur-sm rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="text-white flex-shrink-0" size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{item.title}</div>
                      <div className="text-white font-semibold">{item.value}</div>
                    </div>
                  </a>
                );
              })}
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.link}
                      aria-label={social.label}
                      className="w-12 h-12 rounded-lg bg-[#001a24]/80 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 flex items-center justify-center hover:bg-gradient-to-br hover:from-cyan-500 hover:to-purple-600 transition-all duration-300 group"
                    >
                      <Icon className="text-cyan-400 group-hover:text-white transition-colors" size={20} />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="relative h-64 rounded-xl overflow-hidden border border-cyan-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="text-cyan-400 mx-auto mb-2" size={48} />
                    <p className="text-white font-semibold">Bangalore, Karnataka</p>
                    <p className="text-gray-400 text-sm">India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#001a24]/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-gray-400 text-sm mb-2">First Name</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="John"
                    autoComplete="given-name"
                    required
                    className="w-full px-4 py-3 bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-gray-400 text-sm mb-2">Last Name</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Doe"
                    autoComplete="family-name"
                    required
                    className="w-full px-4 py-3 bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm mb-2">Email Address</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john.doe@example.com"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-400 text-sm mb-2">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  autoComplete="tel"
                  className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-gray-400 text-sm mb-2">Service Interested In</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                >
                  <option value="">Select a service</option>
                  <option value="web">IT Services & Development</option>
                  <option value="embedded">Embedded Systems & Software</option>
                  <option value="product">Product Design</option>
                  <option value="3d">3D Modeling & Printing</option>
                  <option value="pcb">PCB Design</option>
                  <option value="ecommerce">Ecommerce</option>
                  <option value="manufacturing">Custom Manufacturing</option>
                  <option value="lab">Technology Lab Setup</option>
                  <option value="training">Training & Internships</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  minLength={10}
                  placeholder="Tell us about your project or inquiry... (minimum 10 characters)"
                  required
                  className="w-full px-4 py-3 bg-[#002E3C]/60 backdrop-blur-sm border border-cyan-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
