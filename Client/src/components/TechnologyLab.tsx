import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useContactModal } from '../contexts/ContactModalContext';
import { 
  Lightbulb, 
  Users, 
  BookOpen, 
  Target, 
  Cpu, 
  Wifi, 
  Zap, 
  Shield,
  CheckCircle,
  ChevronRight,
  Wrench,
  Monitor,
  GraduationCap,
  Rocket
} from 'lucide-react';

const TechnologyLab = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<'school' | 'college' | 'corporate'>('school');
  const { openContactModal } = useContactModal();

  const labTypes = [
    {
      icon: <GraduationCap className="w-16 h-16" />,
      title: 'School Labs',
      category: 'school',
      description: 'STEM-focused labs for K-12 education with hands-on learning experiences',
      color: 'from-cyan-400 to-blue-600'
    },
    {
      icon: <BookOpen className="w-16 h-16" />,
      title: 'College/University Labs',
      category: 'college',
      description: 'Advanced research and innovation labs for higher education institutions',
      color: 'from-purple-400 to-pink-600'
    },
    {
      icon: <Rocket className="w-16 h-16" />,
      title: 'Corporate Innovation Labs',
      category: 'corporate',
      description: 'R&D and prototyping facilities for businesses and enterprises',
      color: 'from-orange-400 to-red-600'
    }
  ];

  const features = [
    {
      icon: <Cpu className="w-12 h-12 text-cyan-400" />,
      title: 'Latest Equipment',
      description: 'State-of-the-art technology and equipment for hands-on learning and research'
    },
    {
      icon: <Users className="w-12 h-12 text-purple-400" />,
      title: 'Expert Training',
      description: 'Comprehensive training programs for faculty and students on lab equipment'
    },
    {
      icon: <Shield className="w-12 h-12 text-orange-400" />,
      title: 'Safety Standards',
      description: 'Full compliance with safety regulations and industry best practices'
    },
    {
      icon: <Wrench className="w-12 h-12 text-pink-400" />,
      title: 'Maintenance Support',
      description: 'Ongoing maintenance and technical support to keep labs running smoothly'
    },
    {
      icon: <Monitor className="w-12 h-12 text-green-400" />,
      title: 'Custom Design',
      description: 'Labs designed specifically for your curriculum and research needs'
    },
    {
      icon: <Zap className="w-12 h-12 text-yellow-400" />,
      title: 'Quick Setup',
      description: 'Efficient installation and setup process with minimal disruption'
    }
  ];

  const labEquipment = {
    school: [
      '3D Printers & Scanners',
      'Robotics Kits & Components',
      'Electronics Lab Equipment',
      'IoT Development Boards',
      'Basic PCB Fabrication Tools',
      'Computer Systems',
      'Safety Equipment & Tools',
      'Student Workstations'
    ],
    college: [
      'Advanced 3D Printing Systems',
      'PCB Fabrication & Assembly Line',
      'Robotics & Automation Systems',
      'IoT & Embedded Systems Lab',
      'High-End Computing Workstations',
      'Oscilloscopes & Testing Equipment',
      'Research & Development Tools',
      'Prototype Manufacturing Equipment'
    ],
    corporate: [
      'Industrial 3D Printing Systems',
      'Full PCB Manufacturing Setup',
      'AI & ML Computing Infrastructure',
      'Advanced Testing & Validation Tools',
      'Rapid Prototyping Equipment',
      'Quality Control Systems',
      'Clean Room Facilities',
      'Custom R&D Equipment'
    ]
  };

  const setupProcess = [
    {
      number: '01',
      title: 'Requirement Analysis',
      description: 'We analyze your specific needs, space, budget, and curriculum requirements',
      icon: <Target className="w-8 h-8" />
    },
    {
      number: '02',
      title: 'Lab Design & Planning',
      description: 'Custom lab layout design with equipment selection and safety planning',
      icon: <Lightbulb className="w-8 h-8" />
    },
    {
      number: '03',
      title: 'Installation & Setup',
      description: 'Professional installation of all equipment with proper wiring and setup',
      icon: <Wrench className="w-8 h-8" />
    },
    {
      number: '04',
      title: 'Training & Handover',
      description: 'Comprehensive training for staff and complete documentation handover',
      icon: <Users className="w-8 h-8" />
    }
  ];

  const faqs = [
    {
      question: 'What types of technology labs do you establish?',
      answer: 'We establish various types of technology labs including Electronics Labs, Robotics Labs, IoT Labs, 3D Printing Labs, PCB Fabrication Labs, Embedded Systems Labs, and Innovation/Maker Spaces. Each lab is customized based on your educational level, curriculum requirements, and budget.'
    },
    {
      question: 'How long does it take to set up a complete technology lab?',
      answer: 'The timeline depends on the lab size and complexity. Typically, a standard school lab takes 4-6 weeks, while a comprehensive college or corporate lab may take 8-12 weeks. This includes design, equipment procurement, installation, and training.'
    },
    {
      question: 'Do you provide training for teachers and students?',
      answer: 'Yes! We provide comprehensive training programs for both faculty and students. This includes equipment operation, safety protocols, maintenance procedures, and curriculum integration. We also offer ongoing support and refresher training sessions.'
    },
    {
      question: 'What is included in the maintenance support?',
      answer: 'Our maintenance support includes regular equipment servicing, troubleshooting assistance, spare parts replacement, software updates, and technical support. We offer various maintenance packages including annual contracts with guaranteed response times.'
    },
    {
      question: 'Can you help with curriculum development for the lab?',
      answer: 'Absolutely! We work with educational institutions to develop lab-based curriculum, project ideas, and learning modules that align with your educational goals. We can also provide sample projects and educational resources.'
    },
    {
      question: 'What is the budget range for establishing a technology lab?',
      answer: 'The budget varies significantly based on lab type, size, and equipment. A basic school lab can start from ₹5-10 lakhs, while advanced college labs may range from ₹20-50 lakhs. Corporate R&D labs can be customized based on specific needs. We provide detailed quotes after understanding your requirements.'
    }
  ];

  const benefits = [
    {
      title: 'Enhanced Learning',
      description: 'Hands-on practical experience that complements theoretical knowledge',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop'
    },
    {
      title: 'Innovation Hub',
      description: 'Create an environment that fosters creativity and innovative thinking',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    },
    {
      title: 'Industry Ready',
      description: 'Prepare students with skills demanded by modern tech industry',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    },
    {
      title: 'Research Excellence',
      description: 'Enable cutting-edge research and development projects',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#001a24] via-[#002E3C] to-[#001a24] min-h-screen">
      <Navbar />
      
      {/* Hero Section with Animated Elements */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 animate-pulse"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Floating Icons Animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-float">
            <Cpu className="w-12 h-12 text-cyan-400/30" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-float animation-delay-2000">
            <Wifi className="w-10 h-10 text-purple-400/30" />
          </div>
          <div className="absolute bottom-1/3 left-1/3 animate-float animation-delay-4000">
            <Zap className="w-14 h-14 text-orange-400/30" />
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-block mb-6 animate-bounce-slow">
              <div className="p-4 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-2xl backdrop-blur-sm border border-cyan-500/30">
                <Lightbulb className="w-16 h-16 text-cyan-400" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-600 text-transparent bg-clip-text animate-gradient">
                Technology Lab
              </span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Establishment Services
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Transform your educational institution or organization with a state-of-the-art technology lab. 
              We design, build, and maintain cutting-edge labs that inspire innovation and hands-on learning.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={openContactModal}
                className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Get Started
                <ChevronRight size={20} />
              </button>
              <a 
                href="#lab-types"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-300 transform hover:scale-105"
              >
                Explore Labs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Lab Types Section */}
      <section id="lab-types" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Choose Your Lab Type
              </span>
            </h2>
            <p className="text-xl text-gray-300">Customized solutions for every educational level</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {labTypes.map((lab, index) => (
              <div 
                key={index}
                onClick={() => setActiveCategory(lab.category as 'school' | 'college' | 'corporate')}
                className={`group relative bg-[#002E3C]/50 backdrop-blur-sm rounded-2xl p-8 border transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                  activeCategory === lab.category 
                    ? 'border-cyan-500 shadow-lg shadow-cyan-500/50' 
                    : 'border-cyan-500/20 hover:border-cyan-500/50'
                }`}
              >
                <div className={`flex justify-center mb-6 transition-transform duration-500 ${
                  activeCategory === lab.category ? 'scale-110' : ''
                }`}>
                  <div className={`p-4 bg-gradient-to-br ${lab.color} rounded-2xl text-white`}>
                    {lab.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 text-center">{lab.title}</h3>
                <p className="text-gray-300 text-center leading-relaxed">{lab.description}</p>
                
                {activeCategory === lab.category && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Equipment List Based on Selection */}
          <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-8 text-center">
              Equipment & Infrastructure for{' '}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                {labTypes.find(l => l.category === activeCategory)?.title}
              </span>
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {labEquipment[activeCategory].map((equipment, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 px-4 py-3 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <CheckCircle className="text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" size={20} />
                  <span className="text-gray-300 text-sm">{equipment}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid with Images */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Why Choose Us
              </span>
            </h2>
            <p className="text-xl text-gray-300">Comprehensive solutions for your technology lab needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-[#002E3C]/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 text-center">{feature.title}</h3>
                <p className="text-gray-300 text-center text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Setup Process Timeline */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Our Setup Process
              </span>
            </h2>
            <p className="text-xl text-gray-300">From concept to completion in four simple steps</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {setupProcess.map((step, index) => (
              <div 
                key={index}
                className="relative group"
              >
                <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-2xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-5xl font-bold bg-gradient-to-br from-cyan-400/30 to-purple-600/30 text-cyan-400">
                      {step.number}
                    </div>
                    <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 rounded-lg text-cyan-400 group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </div>
                
                {/* Connecting Arrow */}
                {index < setupProcess.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <ChevronRight className="text-cyan-400/50" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section with Images */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Benefits of Technology Labs
              </span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative bg-[#002E3C]/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-500 hover:transform hover:scale-105"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt={benefit.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-300">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Frequently Asked Questions
              </span>
            </h2>
          </div>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-300"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="text-lg font-semibold text-white pr-4">{faq.question}</span>
                  <ChevronRight 
                    className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                      expandedFAQ === index ? 'rotate-90' : ''
                    }`} 
                    size={24} 
                  />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFAQ === index ? 'max-h-96' : 'max-h-0'
                }`}>
                  <div className="px-6 pb-5">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact-form" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Request a Consultation
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Let's discuss your technology lab requirements
            </p>
          </div>

          <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name*</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name*</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-all duration-300"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email address*</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone No*</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Institution/Organization Name*</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Lab Type*</label>
                <select 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-all duration-300"
                  required
                >
                  <option value="">Please select</option>
                  <option value="school">School Lab</option>
                  <option value="college">College/University Lab</option>
                  <option value="corporate">Corporate Innovation Lab</option>
                  <option value="custom">Custom Lab</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Expected Budget Range</label>
                <select 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white transition-all duration-300"
                >
                  <option value="">Please select</option>
                  <option value="5-10">₹5-10 Lakhs</option>
                  <option value="10-20">₹10-20 Lakhs</option>
                  <option value="20-50">₹20-50 Lakhs</option>
                  <option value="50+">₹50+ Lakhs</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Describe Your Requirements*</label>
                <textarea 
                  rows={5}
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white resize-none transition-all duration-300"
                  placeholder="Tell us about your lab requirements, space available, timeline, etc."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Upload Documents (Floor plan, Requirements, etc.)</label>
                <input 
                  type="file" 
                  multiple
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-all duration-300"
                />
              </div>

              <button 
                type="submit"
                className="w-full px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                Submit Request
                <ChevronRight size={20} />
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default TechnologyLab;
