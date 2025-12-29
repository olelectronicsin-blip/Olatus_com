import { useState, FormEvent } from 'react';
import { 
  Cpu, 
  Wifi, 
  Zap, 
  Shield, 
  Radio,
  Gauge,
  CheckCircle,
  Upload,
  ChevronDown,
  Activity,
  GitBranch,
  HardDrive,
  Clock
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { submitServiceRequest, ServiceType } from '../lib/serviceApi';
import Navbar from './Navbar';
import Footer from './Footer';

const EmbeddedSoftware = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitServiceRequest({
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceType: ServiceType.EMBEDDED_SOFTWARE,
        description: formData.message,
        specifications: {
          projectType: formData.projectType,
        }
      });

      toast.success('Your request has been submitted successfully! We\'ll get back to you soon.');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const services = [
    {
      icon: Cpu,
      title: 'Firmware Development',
      description: 'Custom firmware solutions for microcontrollers and embedded systems with optimized performance and reliability.',
      features: ['Real-time OS', 'Low-level Programming', 'Hardware Abstraction', 'Power Optimization'],
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Wifi,
      title: 'IoT Solutions',
      description: 'End-to-end IoT development from device firmware to cloud connectivity and data analytics.',
      features: ['Device Integration', 'Cloud Connectivity', 'Data Analytics', 'Remote Monitoring'],
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Radio,
      title: 'Communication Protocols',
      description: 'Implementation of various communication protocols for seamless device connectivity and data exchange.',
      features: ['UART/SPI/I2C', 'CAN/Modbus', 'BLE/WiFi', 'LoRa/Zigbee'],
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Gauge,
      title: 'Sensor Integration',
      description: 'Integration and calibration of various sensors for accurate data acquisition and processing.',
      features: ['Temperature', 'Pressure', 'Motion', 'Environmental'],
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Activity,
      title: 'Real-time Systems',
      description: 'Development of real-time embedded systems with precise timing and deterministic behavior.',
      features: ['RTOS Implementation', 'Task Scheduling', 'Interrupt Handling', 'Time-critical Apps'],
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Security & Safety',
      description: 'Secure embedded systems with encryption, authentication, and safety-critical certifications.',
      features: ['Secure Boot', 'Data Encryption', 'Authentication', 'Safety Standards'],
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const platforms = [
    { name: 'ARM Cortex', category: 'Microcontroller', color: 'cyan' },
    { name: 'ESP32', category: 'WiFi/BLE', color: 'blue' },
    { name: 'STM32', category: 'MCU', color: 'purple' },
    { name: 'Arduino', category: 'Platform', color: 'green' },
    { name: 'Raspberry Pi', category: 'SBC', color: 'pink' },
    { name: 'PIC', category: 'Microcontroller', color: 'orange' },
    { name: 'AVR', category: 'MCU', color: 'red' },
    { name: 'Nordic nRF', category: 'BLE', color: 'cyan' },
    { name: 'TI MSP430', category: 'Low Power', color: 'green' },
    { name: 'Xilinx', category: 'FPGA', color: 'purple' },
    { name: 'NXP Kinetis', category: 'ARM', color: 'blue' },
    { name: 'Infineon', category: 'Automotive', color: 'orange' }
  ];

  const processSteps = [
    {
      icon: Upload,
      title: 'Requirements Analysis',
      description: 'Understand hardware specifications, performance requirements, and system constraints.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: GitBranch,
      title: 'Architecture Design',
      description: 'Design system architecture, select components, and define software modules.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Cpu,
      title: 'Development',
      description: 'Write efficient embedded code with proper abstraction and modular design.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Activity,
      title: 'Testing & Debugging',
      description: 'Extensive testing on hardware, debugging, and performance optimization.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: CheckCircle,
      title: 'Integration',
      description: 'Integrate with hardware, sensors, and communication modules.',
      gradient: 'from-pink-500 to-purple-600'
    },
    {
      icon: Shield,
      title: 'Deployment & Support',
      description: 'Deploy firmware, provide documentation, and ongoing support.',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const faqs = [
    {
      question: 'What programming languages do you use for embedded development?',
      answer: 'We primarily use C and C++ for embedded systems, along with Assembly for low-level optimization. We also work with Python for testing and automation.'
    },
    {
      question: 'Do you work with custom hardware?',
      answer: 'Yes, we can develop software for custom hardware designs. We work closely with hardware teams to ensure seamless integration.'
    },
    {
      question: 'Can you optimize existing embedded firmware?',
      answer: 'Absolutely! We can analyze and optimize your existing firmware for better performance, reduced power consumption, and improved reliability.'
    },
    {
      question: 'Do you provide IoT cloud integration?',
      answer: 'Yes, we offer complete IoT solutions including device firmware, communication protocols, and cloud platform integration (AWS IoT, Azure IoT, etc.).'
    },
    {
      question: 'What communication protocols do you support?',
      answer: 'We support a wide range including UART, SPI, I2C, CAN, Modbus, Ethernet, WiFi, Bluetooth, LoRa, Zigbee, and custom protocols.'
    },
    {
      question: 'How long does embedded software development take?',
      answer: 'Timeline varies based on complexity. Simple firmware can take 2-4 weeks, while complex real-time systems may take 3-6 months.'
    },
    {
      question: 'Do you provide RTOS implementation?',
      answer: 'Yes, we have experience with FreeRTOS, Zephyr, ThreadX, and other real-time operating systems.'
    },
    {
      question: 'Can you help with certification requirements?',
      answer: 'Yes, we can develop software following industry standards (ISO, IEC, FDA) and help with certification documentation.'
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'High Performance',
      description: 'Optimized code for maximum efficiency and minimal resource usage',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Clock,
      title: 'Real-time Operation',
      description: 'Deterministic behavior for time-critical applications',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: HardDrive,
      title: 'Low Power',
      description: 'Power-optimized solutions for battery-operated devices',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Reliable & Secure',
      description: 'Robust error handling and secure communication',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#001a24] text-gray-300 relative overflow-hidden">
      <Toaster position="top-right" />
      {/* Animated Circuit Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <g className="animate-pulse-slow">
              <circle cx="100" cy="100" r="5" fill="currentColor" className="text-cyan-400"/>
              <circle cx="300" cy="200" r="5" fill="currentColor" className="text-purple-400"/>
              <circle cx="500" cy="150" r="5" fill="currentColor" className="text-orange-400"/>
              <line x1="100" y1="100" x2="300" y2="200" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
              <line x1="300" y1="200" x2="500" y2="150" stroke="currentColor" strokeWidth="1" className="text-purple-400"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-float-slow">
          <Cpu className="w-24 h-24 text-cyan-400/10" />
        </div>
        <div className="absolute top-40 right-20 animate-float-slow animation-delay-2000">
          <Cpu className="w-32 h-32 text-purple-400/10" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float-slow animation-delay-4000">
          <Wifi className="w-28 h-28 text-orange-400/10" />
        </div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <span className="text-cyan-400 text-sm font-medium">Expert Embedded Solutions</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Embedded Systems & Software</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Power Your <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Hardware</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Professional embedded systems & software development for microcontrollers, IoT devices, and real-time systems. From firmware to full-stack IoT solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#002E3C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group bg-[#001a24]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Services</span>
            </h2>
            <p className="text-gray-400 text-lg">Comprehensive embedded systems & software solutions</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div 
                  key={index}
                  className="group bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-4">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle className="text-cyan-400" size={16} />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platforms */}
      <section className="py-20 bg-[#002E3C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Supported <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Platforms</span>
            </h2>
            <p className="text-gray-400 text-lg">We work with all major embedded platforms</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {platforms.map((platform, index) => (
              <div 
                key={index}
                className="group bg-[#001a24]/50 backdrop-blur-sm rounded-xl p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 text-center hover:transform hover:scale-105"
              >
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-${platform.color}-500 to-${platform.color}-600 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <Cpu className="text-white" size={20} />
                </div>
                <h4 className="text-white font-semibold mb-1">{platform.name}</h4>
                <p className="text-gray-400 text-xs">{platform.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Development <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">Systematic approach to embedded systems & software development</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                >
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <div className="absolute top-6 right-6 text-4xl font-bold text-cyan-500/20">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-[#002E3C]/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Start Your <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Project</span>
            </h2>
            <p className="text-gray-400 text-lg">Discuss your embedded systems & software requirements</p>
          </div>

          <div className="bg-[#001a24]/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">Name*</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Email*</label>
                  <input 
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone Number*</label>
                <input 
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Service Type*</label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  required
                >
                  <option value="">Select service type</option>
                  <option value="Firmware Development">Firmware Development</option>
                  <option value="IoT Solutions">IoT Solutions</option>
                  <option value="Real-time Systems">Real-time Systems</option>
                  <option value="Communication Protocols">Communication Protocols</option>
                  <option value="Code Optimization">Code Optimization</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Project Details*</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white resize-none"
                  placeholder="Describe your hardware, requirements, and project goals..."
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">FAQ</span>
            </h2>
            <p className="text-gray-400 text-lg">Frequently asked questions</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl border border-cyan-500/20 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="text-lg font-medium text-white">{faq.question}</span>
                  <ChevronDown 
                    className={`text-cyan-400 transition-transform duration-300 ${expandedFAQ === index ? 'rotate-180' : ''}`}
                    size={24}
                  />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4 text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
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

export default EmbeddedSoftware;
