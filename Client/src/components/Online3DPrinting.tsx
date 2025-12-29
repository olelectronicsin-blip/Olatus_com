import { useState, FormEvent } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Printer, Package, Clock, HeadphonesIcon, ChevronDown, ChevronUp } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { submitServiceRequest, ServiceType } from '../lib/serviceApi';
import { useContactModal } from '../contexts/ContactModalContext';

const Online3DPrinting = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const { openContactModal } = useContactModal();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    printingType: '',
    color: '',
    file: null as File | null,
    captcha: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simple captcha validation
    if (formData.captcha.toUpperCase() !== 'ABC123') {
      toast.error('Incorrect captcha. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {
      const files = formData.file ? [formData.file] : [];
      
      await submitServiceRequest({
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        serviceType: ServiceType.THREE_D_PRINTING,
        description: `3D Printing - ${formData.printingType}${formData.color ? `, Color: ${formData.color}` : ''}`,
        specifications: {
          printingType: formData.printingType,
          preferredColor: formData.color,
        },
        files,
      });

      toast.success('Your 3D printing order has been submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        printingType: '',
        color: '',
        file: null,
        captcha: '',
      });
    } catch (error) {
      console.error('Error submitting 3D printing order:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const capabilities = [
    { srNo: 1, specification: 'Max build Volume (L x B x H)', capability: '500 x 500 x 500 mm' },
    { srNo: 2, specification: 'Filament Materials Supported', capability: 'PLA, ABS, TPU' },
    { srNo: 3, specification: '3D Printing file Supported', capability: '.stl' },
    { srNo: 4, specification: 'Filament Diameter', capability: '1.75 mm' },
  ];

  const features = [
    {
      icon: <HeadphonesIcon className="w-12 h-12 text-cyan-400" />,
      title: 'Free Consultation',
      description: 'We offer free consultation service to our clients, no matter what is his project size or budget'
    },
    {
      icon: <Printer className="w-12 h-12 text-purple-400" />,
      title: 'Quality 3D Printing',
      description: 'We have excellent high quality range of 3D printers which can do high quality 3D printing'
    },
    {
      icon: <Clock className="w-12 h-12 text-orange-400" />,
      title: 'Fast Delivery',
      description: 'We understand the value of time so we always prefer the fast delivery service available.'
    },
    {
      icon: <Package className="w-12 h-12 text-pink-400" />,
      title: '24/7 Hour Support',
      description: 'Our dedicated support team always ready to answer your all queries by email or over phone.'
    }
  ];

  const faqs = [
    {
      question: 'How can I order Online 3D Printing Service',
      answer: 'You can order our online 3D printing service by filling out the order form on this page. Simply upload your .stl file, provide your contact details, and submit the form. Our team will review your design and get back to you with a quote and timeline.'
    },
    {
      question: 'How much time is needed for 3D Printing?',
      answer: 'The time required depends on the complexity, size, and quantity of your design. Simple designs can be completed within 24-48 hours, while complex or large models may take 3-7 days. We will provide you with an accurate timeline after reviewing your file.'
    },
    {
      question: 'What is the cost of 3D Printing service?',
      answer: 'The cost depends on various factors including material type, model size, complexity, and quantity. We offer competitive pricing and will provide you with a detailed quote after analyzing your design file. Contact us for a free consultation and quote.'
    },
    {
      question: 'Who can order 3D Printing Service?',
      answer: 'Anyone can order our 3D printing service! Whether you are a student, hobbyist, entrepreneur, engineer, designer, or business owner, we welcome all types of projects from simple prototypes to complex functional parts.'
    },
    {
      question: 'What are the Maximum Order Quantity?',
      answer: 'You can order as much 3D Models as you want. There is no limit for the maximum quantity you can order.'
    },
    {
      question: 'What are the Minimum Order Quantity?',
      answer: 'We accept orders starting from just 1 piece. There is no minimum order quantity requirement, making our service accessible for everyone from individual makers to businesses.'
    },
    {
      question: 'What is the expected time for 3D Prototyping?',
      answer: 'For standard prototypes, you can expect delivery within 3-5 working days. Rush orders can be completed within 24-48 hours with express service. The exact timeline will be confirmed after reviewing your design specifications.'
    },
    {
      question: 'What is the delivery process?',
      answer: 'Once your 3D print is completed and quality checked, we carefully package it and ship it to your address. We provide tracking details for all shipments. Local deliveries can be arranged, and pickup is also available from our facility.'
    }
  ];

  const portfolio = [
    { title: 'ROBOT CAR', image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?w=600&h=600&fit=crop' },
    { title: 'HYDROLICS', image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=600&fit=crop' },
    { title: 'DRONE FRAME', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600&h=600&fit=crop' },
    { title: 'GEARS', image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop' },
    { title: 'ROBOT 3DOF ARM', image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=600&fit=crop' },
    { title: '3D PRINTED OTTO DIY ROBOT', image: 'https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?w=600&h=600&fit=crop' }
  ];

  return (
    <div className="bg-gradient-to-b from-[#001a24] via-[#002E3C] to-[#001a24] min-h-screen relative overflow-hidden">
      <Toaster position="top-right" />
      {/* 3D Wireframe Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0">
          <svg className="w-full h-full" viewBox="0 0 800 800">
            <g className="animate-3d-rotate">
              {/* 3D Cube Wireframe */}
              <path d="M 200 200 L 400 100 L 600 200 L 400 300 Z" stroke="currentColor" fill="none" strokeWidth="2" className="text-cyan-400"/>
              <path d="M 200 200 L 200 400 L 400 500 L 400 300 Z" stroke="currentColor" fill="none" strokeWidth="2" className="text-purple-400"/>
              <path d="M 600 200 L 600 400 L 400 500 L 400 300 Z" stroke="currentColor" fill="none" strokeWidth="2" className="text-pink-400"/>
              <path d="M 200 400 L 400 500 L 600 400 L 600 200" stroke="currentColor" fill="none" strokeWidth="2" className="text-orange-400"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating 3D Printer Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-10 animate-print-layer">
          <div className="w-20 h-20 border-4 border-cyan-400/20 rounded-lg"></div>
        </div>
        <div className="absolute top-1/3 right-20 animate-print-layer animation-delay-1000">
          <div className="w-24 h-24 border-4 border-purple-400/20 rounded-lg"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-print-layer animation-delay-2000">
          <div className="w-16 h-16 border-4 border-pink-400/20 rounded-lg"></div>
        </div>
      </div>

      {/* Animated Layers Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 animate-layer-build">
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-pink-400/20"></div>
        </div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 animate-pulse"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full filter blur-3xl animate-blob"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
                3D Printing
              </span>
            </h1>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              The Next Generation
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-orange-400 to-pink-600 text-transparent bg-clip-text mb-6">
              3D Printing Solution
            </h3>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              We bring the 3D printing technology as an service for you at very low cost. Now, you can feel your imaginary ideas with your hands.
            </p>
            <a 
              href="#order-form"
              className="inline-block px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105"
            >
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-20 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              OUR CAPABILITIES
            </span>
          </h2>
          
          <div className="mt-12 overflow-x-auto">
            <table className="w-full bg-[#002E3C]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20">
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold">Sr. No.</th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold">Technical Specification</th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold">Capability</th>
                </tr>
              </thead>
              <tbody>
                {capabilities.map((item, index) => (
                  <tr key={index} className="border-t border-cyan-500/10 hover:bg-cyan-500/5 transition-colors">
                    <td className="px-6 py-4 text-gray-300">{item.srNo}</td>
                    <td className="px-6 py-4 text-white font-medium">{item.specification}</td>
                    <td className="px-6 py-4 text-purple-400 font-semibold">{item.capability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-center mt-12">
            <p className="text-2xl font-bold text-white mb-2">
              Explore the world of 3D Printing
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">
            EXPLORE OUR EXITING SERVICES
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {/* 3D Printers Supply */}
            <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <h3 className="text-xl font-bold text-cyan-400 mb-4">WE SUPPLY 3D PRINTERS</h3>
                <h4 className="text-3xl font-bold text-white mb-6">
                  WE PROVIDE<br/>WORLD CLASS<br/>3D PRINTERS
                </h4>
                <div className="mb-6">
                  <Printer className="w-24 h-24 mx-auto text-purple-400" />
                </div>
                <button 
                  onClick={openContactModal}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Online 3D Printing */}
            <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <h3 className="text-xl font-bold text-purple-400 mb-4">WE PRINT 3D MODULES</h3>
                <h4 className="text-3xl font-bold text-white mb-4">
                  ONLINE 3D<br/>PRINTING<br/>SERVICE
                </h4>
                <p className="text-gray-300 mb-6">
                  We offer online 3D printing service for wide range of designs. If you have any requirements related to 3D printing service you can contact us.
                </p>
                <button 
                  onClick={openContactModal}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                >
                  Order Now
                </button>
              </div>
            </div>

            {/* 3D Accessories */}
            <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-orange-500/20 hover:border-orange-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-center">
                <h3 className="text-xl font-bold text-orange-400 mb-4">3D ACCESSORIES</h3>
                <h4 className="text-3xl font-bold text-white mb-6">
                  Buy 3d printing<br/>Accessories
                </h4>
                <p className="text-gray-300 mb-6">
                  We also supply wide range of 3D painting accessories for various 3D printers at very low cost.
                </p>
                <button 
                  onClick={openContactModal}
                  className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              Why Choose Us
            </span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Form Section */}
      <section id="order-form" className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">ONLINE 3D PRINTING</h3>
            <h2 className="text-4xl font-bold text-white">ORDER OUR 3D PRINTING SERVICE</h2>
          </div>

          <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-300 mb-2">First Name*</label>
                  <input 
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name*</label>
                  <input 
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Email address*</label>
                <input 
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Phone No*</label>
                <input 
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Printing Type*</label>
                <select
                  value={formData.printingType}
                  onChange={(e) => setFormData({...formData, printingType: e.target.value})}
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  required
                >
                  <option value="">Please select</option>
                  <option value="fdm">FDM (Fused Deposition Modeling)</option>
                  <option value="sla">SLA (Stereolithography 3D Printing)</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Preferred Colour (Optional)</label>
                <input 
                  type="text"
                  value={formData.color}
                  onChange={(e) => setFormData({...formData, color: e.target.value})}
                  className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                  placeholder="e.g., Red, Blue, Black, White"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-2">3d File Upload - Optional</label>
                <div className="relative">
                  <input 
                    type="file" 
                    accept=".stl,.zip"
                    onChange={(e) => setFormData({...formData, file: e.target.files?.[0] || null})}
                    className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">FileType: .stl or zip (optional - you can upload later)</p>
              </div>

              <div>
                <label className="block text-gray-300 mb-2">Please type the characters*</label>
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 px-4 py-3 rounded-lg font-mono text-lg tracking-wider text-gray-800 select-none">
                    ABC123
                  </div>
                  <input 
                    type="text"
                    value={formData.captcha}
                    onChange={(e) => setFormData({...formData, captcha: e.target.value})}
                    className="flex-1 px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                    placeholder="Enter characters"
                    required
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">This helps us prevent spam, thank you.</p>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              FAQ
            </span>
          </h2>
          <p className="text-center text-gray-300 mb-12">Most frequent questions and answers</p>
          
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
                  <span className="text-white font-semibold pr-4">{faq.question}</span>
                  {expandedFAQ === index ? (
                    <ChevronUp className="text-cyan-400 flex-shrink-0" size={24} />
                  ) : (
                    <ChevronDown className="text-cyan-400 flex-shrink-0" size={24} />
                  )}
                </button>
                {expandedFAQ === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">
              OUR 3D PRINTED PARTS PORTFOLIO
            </span>
          </h2>
          <p className="text-center text-gray-300 mb-12">
            Browse through our 3D Designs and Parts made as a prototype for our clients. All the parts or designs shown are exclusive to custom need.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <div 
                key={index}
                className="group relative bg-[#002E3C]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for 3D Printing animations */}
      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        
        @keyframes 3d-rotate {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          50% { transform: rotateX(10deg) rotateY(20deg); }
          100% { transform: rotateX(0deg) rotateY(0deg); }
        }
        
        @keyframes print-layer {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.3; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 0.6; }
        }
        
        @keyframes layer-build {
          0% { height: 0%; }
          100% { height: 100%; }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-3d-rotate {
          animation: 3d-rotate 10s ease-in-out infinite;
        }
        
        .animate-print-layer {
          animation: print-layer 4s ease-in-out infinite;
        }
        
        .animate-layer-build {
          animation: layer-build 15s linear infinite;
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

export default Online3DPrinting;
