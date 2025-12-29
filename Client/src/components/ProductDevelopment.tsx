import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Package, Cpu, Settings, CheckCircle, ChevronRight } from 'lucide-react';
import { useContactModal } from '../contexts/ContactModalContext';

const ProductDevelopment = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const { openContactModal } = useContactModal();

  const services = [
    {
      icon: <Package className="w-16 h-16 text-cyan-400" />,
      title: 'Component Sourcing',
      description: 'We will source all the necessary components need for the product at best cost and quality possible from our trusted vendors across the globe.'
    },
    {
      icon: <Cpu className="w-16 h-16 text-purple-400" />,
      title: 'Design and Prototyping',
      description: 'We will design the entire product from scratch including hardware and exterior finish and deliver the prototype in working as per industry standard.'
    },
    {
      icon: <Settings className="w-16 h-16 text-orange-400" />,
      title: 'Final Product Manufacturing',
      description: 'After careful and final validation of the prototype, we will start the manufacturing process of the product as per the design finalized and make it market ready.'
    }
  ];

  const workflowSteps = [
    {
      number: '01',
      title: 'Feasibility Check of Client Idea',
      description: 'We analyze your idea and check its technical and commercial feasibility'
    },
    {
      number: '02',
      title: 'Design & Customization as per Need',
      description: 'Custom design tailored to your specific requirements and specifications'
    },
    {
      number: '03',
      title: 'Prototyping, Development & Testing',
      description: 'Build, test, and refine the prototype to ensure optimal performance'
    },
    {
      number: '04',
      title: 'Final Product Manufacturing & Branding',
      description: 'Scale up production and apply your brand identity to the final product'
    }
  ];

  const faqs = [
    {
      question: 'Can the product or idea be protected from further selling rights?',
      answer: 'Yes, we take intellectual property rights very seriously. We can sign NDAs (Non-Disclosure Agreements) and work under strict confidentiality. Additionally, we can guide you through the process of patenting your product or idea to ensure full legal protection of your intellectual property.'
    },
    {
      question: 'How much time it will take to complete the production?',
      answer: 'The timeline varies based on product complexity, customization requirements, and order quantity. Typically, prototyping takes 2-4 weeks, and final production can take 4-8 weeks. We provide a detailed timeline after understanding your specific requirements and will keep you updated throughout the process.'
    },
    {
      question: 'How much will be cost of the customized product development?',
      answer: 'The cost depends on various factors including component costs, design complexity, tooling requirements, and production volume. We provide a detailed quote after analyzing your requirements. Our goal is to offer the best value while maintaining high quality standards. Contact us for a free consultation and customized quote.'
    }
  ];

  const sectors = [
    'Core Electronics',
    'Smart Automation',
    'Industry Automation',
    'Control System',
    'Smart Analytics',
    'IOT Hardware',
    'Smart Security System',
    'Access Control System',
    'Agriculture Automation',
    'Voice and Image Interface',
    'RFID Control Systems',
    'Electronic Hardware',
    'Sensor Control System'
  ];

  const portfolio = [
    { 
      title: 'S GUARD', 
      subtitle: 'S GUARD SECURITY SYSTEM',
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=600&h=400&fit=crop'
    },
    { 
      title: 'EXPLORER KIT ROBOTICS DIY', 
      subtitle: 'EXPLORER KIT ROBOTICS DIY',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-[#001a24] via-[#002E3C] to-[#001a24] min-h-screen relative overflow-hidden">
      {/* Animated Gear Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20">
          <svg width="200" height="200" viewBox="0 0 100 100" className="animate-spin-slow">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
            <circle cx="50" cy="20" r="5" fill="currentColor" className="text-cyan-400"/>
            <circle cx="80" cy="50" r="5" fill="currentColor" className="text-cyan-400"/>
            <circle cx="50" cy="80" r="5" fill="currentColor" className="text-cyan-400"/>
            <circle cx="20" cy="50" r="5" fill="currentColor" className="text-cyan-400"/>
          </svg>
        </div>
        <div className="absolute bottom-40 right-40">
          <svg width="150" height="150" viewBox="0 0 100 100" className="animate-spin-reverse">
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
            <circle cx="50" cy="25" r="4" fill="currentColor" className="text-purple-400"/>
            <circle cx="75" cy="50" r="4" fill="currentColor" className="text-purple-400"/>
            <circle cx="50" cy="75" r="4" fill="currentColor" className="text-purple-400"/>
            <circle cx="25" cy="50" r="4" fill="currentColor" className="text-purple-400"/>
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2">
          <svg width="180" height="180" viewBox="0 0 100 100" className="animate-spin-slow">
            <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" strokeWidth="2" className="text-orange-400"/>
            <circle cx="50" cy="22" r="4" fill="currentColor" className="text-orange-400"/>
            <circle cx="78" cy="50" r="4" fill="currentColor" className="text-orange-400"/>
            <circle cx="50" cy="78" r="4" fill="currentColor" className="text-orange-400"/>
            <circle cx="22" cy="50" r="4" fill="currentColor" className="text-orange-400"/>
          </svg>
        </div>
      </div>

      {/* Flowing Data Lines */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full opacity-10">
          <line x1="0" y1="0" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-cyan-400 animate-flow-diagonal"/>
          <line x1="100%" y1="0" x2="0" y2="100%" stroke="currentColor" strokeWidth="1" className="text-purple-400 animate-flow-diagonal animation-delay-2000"/>
        </svg>
      </div>

      {/* Floating Component Icons */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 animate-float-component">
          <Settings className="w-16 h-16 text-cyan-400/10" />
        </div>
        <div className="absolute bottom-1/3 left-20 animate-float-component animation-delay-1000">
          <Cpu className="w-20 h-20 text-purple-400/10" />
        </div>
        <div className="absolute top-1/2 right-1/4 animate-float-component animation-delay-2000">
          <Package className="w-18 h-18 text-orange-400/10" />
        </div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 animate-pulse"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-orange-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Turn Your
            </h1>
            <h2 className="text-5xl md:text-7xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                Idea
              </span>
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Into Reality
            </h3>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Turn your idea into reality by Partnering with us into making your Product Design to Prototyping to Product Manufacturing. We are here to support you from Component Sourcing till Full scale Product final Production.
            </p>
            <button 
              onClick={openContactModal}
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </section>

      {/* Services Section with Idea to Market Ready */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop" 
                alt="Idea" 
                className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
              />
              <span className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                OLatus
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Make Your Product Market Ready
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className="flex justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-cyan-500/5 transition-colors"
                >
                  <span className="text-lg font-bold text-white pr-4">{faq.question}</span>
                  <ChevronRight 
                    className={`text-cyan-400 flex-shrink-0 transition-transform duration-300 ${
                      expandedFAQ === index ? 'rotate-90' : ''
                    }`} 
                    size={24} 
                  />
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customization Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="text-3xl font-bold text-cyan-400">PCB Customise</span>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                OLatus
              </span>
            </div>
          </div>

          <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-cyan-500/20">
            <h3 className="text-3xl font-bold text-white mb-6 text-center">
              Professional Hardware Customization on Demand
            </h3>
            
            <div className="space-y-4 text-gray-300 leading-relaxed max-w-4xl mx-auto">
              <p>
                We provide hardware customization service as per the requirement and project type. We provide customization as efficiently as possible so that the system works in the most efficient way.
              </p>
              
              <p>
                Apart from customization, we provide integrated Printed Circuit Board Designing, fabrication and Assemble for the customization hardware project.
              </p>
              
              <p>
                The customer can also order prototype outer casing and layout for the custom hardware which we will provide in a 3D printed way. If, satisfied, we can go for the final Molding of the design and make the hardware circuit or product market ready.
              </p>
              
              <p className="font-semibold text-white">
                So, in short we can customize, design, model and manufacture according to the need of our customer.
              </p>
              
              <p>
                We also have a range of White Labelled products which can be rebranded into your brand name and can be sold off. So now get exclusive products in your brand and boost your sales.
              </p>
            </div>

            {/* Sectors */}
            <div className="mt-12">
              <h4 className="text-2xl font-bold text-white mb-6 text-center">
                Sectors We Work In
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {sectors.map((sector, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 bg-cyan-500/10 px-4 py-3 rounded-lg border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
                  >
                    <CheckCircle className="text-cyan-400 flex-shrink-0" size={18} />
                    <span className="text-gray-300 text-sm">{sector}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-lg text-white font-semibold mb-4">
                Send us your requirement now, and we provide the best quotation possible with best guaranteed results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Branding Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="text-2xl font-bold text-orange-400">Marketing</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text ml-3">
                  OLatus
                </span>
              </div>
              <img 
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=600&h=400&fit=crop" 
                alt="OLatus Brand" 
                className="w-full rounded-xl shadow-2xl border border-cyan-500/20"
              />
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-white mb-6">
                Own Your <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Brand</span>
              </h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  All our services for sourcing to manufacturing are white labelled and the final product will be in the customer's Brand.
                </p>
                <p>
                  So the customer can inform us about their branding so that we can embed the same into the design and final product and make their product market ready with their brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Process */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              Our Working Process or Flowchart
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {workflowSteps.map((step, index) => (
              <div 
                key={index}
                className="relative bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-6xl font-bold bg-gradient-to-br from-cyan-400/20 to-purple-600/20 text-cyan-400 mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                
                {index < workflowSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ChevronRight className="text-cyan-400" size={32} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Form */}
      <section id="requirements-form" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">Upload Your Requirement Here</h3>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Partner with Us to Make your Idea to become Reality
            </h2>
          </div>

          <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name*</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name*</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email address*</label>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone No*</label>
                <input 
                  type="tel" 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Company/Organization (if any)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Describe Your Requirements*</label>
                <textarea 
                  rows={6}
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white resize-none"
                  placeholder="Please describe your product idea, requirements, and specifications in detail..."
                  required
                ></textarea>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Upload Documents (If any)</label>
                <div className="relative">
                  <input 
                    type="file" 
                    multiple
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Please type the characters*</label>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 px-4 py-3 rounded-lg font-mono text-lg tracking-wider text-gray-800 select-none">
                    XYZ789
                  </div>
                  <input 
                    type="text" 
                    className="flex-1 px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    placeholder="Enter characters"
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">This helps us prevent spam, thank you.</p>
              </div>

              <button 
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              OUR PRODUCT PORTFOLIO
            </span>
          </h2>
          <p className="text-center text-gray-300 mb-12">
            Check out some of our latest customized product portfolio for our clients. The portfolio contains products customized for various different sectors as per our expertise.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {portfolio.map((item, index) => (
              <div 
                key={index}
                className="group relative bg-[#002E3C]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-cyan-400 text-sm">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for Product Development animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.1); }
          50% { transform: translate(-30px, 30px) scale(0.9); }
          75% { transform: translate(30px, 30px) scale(1.05); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        
        @keyframes flow-diagonal {
          0% { stroke-dasharray: 0, 1000; }
          100% { stroke-dasharray: 1000, 0; }
        }
        
        @keyframes float-component {
          0%, 100% { transform: translateY(0) translateX(0) rotate(0deg); }
          25% { transform: translateY(-15px) translateX(10px) rotate(5deg); }
          50% { transform: translateY(0) translateX(20px) rotate(0deg); }
          75% { transform: translateY(15px) translateX(10px) rotate(-5deg); }
        }
        
        .animate-blob {
          animation: blob 8s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-flow-diagonal {
          animation: flow-diagonal 5s linear infinite;
        }
        
        .animate-float-component {
          animation: float-component 8s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
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

export default ProductDevelopment;
