import { useState, FormEvent } from 'react';
import { 
  CircuitBoard, 
  Zap, 
  Shield, 
  Clock, 
  HeadphonesIcon,
  Upload,
  CheckCircle,
  CreditCard,
  Settings,
  Truck,
  ChevronDown,
  Cpu
} from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { submitServiceRequest, ServiceType } from '../lib/serviceApi';
import Navbar from './Navbar';
import Footer from './Footer';

const PCBManufacturing = () => {
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'fabrication' | 'assembly' | 'design'>('fabrication');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Fabrication Form State
  const [fabricationForm, setFabricationForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    layers: '',
    quantity: '',
    length: '',
    width: '',
    file: null as File | null,
  });

  // Assembly Form State
  const [assemblyForm, setAssemblyForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    components: '',
    quantity: '',
    pcbType: '',
    file: null as File | null,
  });

  // Design Form State
  const [designForm, setDesignForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    complexity: '',
    componentCount: '',
    length: '',
    width: '',
    description: '',
    file: null as File | null,
  });

  const handleFabricationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const files = fabricationForm.file ? [fabricationForm.file] : [];
      
      await submitServiceRequest({
        customerName: `${fabricationForm.firstName} ${fabricationForm.lastName}`,
        email: fabricationForm.email,
        phone: fabricationForm.phone,
        serviceType: ServiceType.PCB_FABRICATION,
        description: `PCB Fabrication - ${fabricationForm.layers} layers, ${fabricationForm.quantity} pieces`,
        specifications: {
          layers: fabricationForm.layers,
          quantity: fabricationForm.quantity,
          dimensions: {
            length: fabricationForm.length,
            width: fabricationForm.width,
          },
        },
        files,
      });

      toast.success('Your PCB fabrication request has been submitted successfully!');
      setFabricationForm({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        layers: '',
        quantity: '',
        length: '',
        width: '',
        file: null,
      });
    } catch (error) {
      console.error('Error submitting fabrication form:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAssemblySubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const files = assemblyForm.file ? [assemblyForm.file] : [];
      
      await submitServiceRequest({
        customerName: `${assemblyForm.firstName} ${assemblyForm.lastName}`,
        email: assemblyForm.email,
        phone: assemblyForm.phone,
        serviceType: ServiceType.PCB_ASSEMBLY,
        description: `PCB Assembly - ${assemblyForm.components} components, ${assemblyForm.quantity} pieces`,
        specifications: {
          components: assemblyForm.components,
          quantity: assemblyForm.quantity,
          pcbType: assemblyForm.pcbType,
        },
        files,
      });

      toast.success('Your PCB assembly request has been submitted successfully!');
      setAssemblyForm({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        components: '',
        quantity: '',
        pcbType: '',
        file: null,
      });
    } catch (error) {
      console.error('Error submitting assembly form:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDesignSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const files = designForm.file ? [designForm.file] : [];
      
      await submitServiceRequest({
        customerName: `${designForm.firstName} ${designForm.lastName}`,
        email: designForm.email,
        phone: designForm.phone,
        serviceType: ServiceType.PCB_DESIGN,
        description: designForm.description,
        specifications: {
          complexity: designForm.complexity,
          componentCount: designForm.componentCount,
          dimensions: {
            length: designForm.length,
            width: designForm.width,
          },
        },
        files,
      });

      toast.success('Your PCB design request has been submitted successfully!');
      setDesignForm({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        complexity: '',
        componentCount: '',
        length: '',
        width: '',
        description: '',
        file: null,
      });
    } catch (error) {
      console.error('Error submitting design form:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to submit request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const processSteps = [
    {
      icon: Upload,
      title: 'Online Quote',
      description: 'To Get a quote fill up the form with proper details and submit.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Upload,
      title: 'Upload PCB File',
      description: 'Finalize and upload the final file in zip format and send it to us.',
      gradient: 'from-blue-500 to-purple-500'
    },
    {
      icon: CheckCircle,
      title: 'Order Review',
      description: 'We will review the file and confirm your order by phone or email.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: CreditCard,
      title: 'Payment',
      description: 'After review we will send you the final payment link to proceed.',
      gradient: 'from-pink-500 to-orange-500'
    },
    {
      icon: Settings,
      title: 'Processing',
      description: 'On successful payment we will immediately process the order.',
      gradient: 'from-orange-500 to-yellow-500'
    },
    {
      icon: Truck,
      title: 'Delivery',
      description: 'Get you ordered delivered as soon as the process completed.',
      gradient: 'from-yellow-500 to-green-500'
    }
  ];

  const features = [
    {
      icon: HeadphonesIcon,
      title: 'Free Consultation',
      description: 'We offer free consultation service to our clients, no matter what is his project size or budget',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      icon: Shield,
      title: 'Best Quality PCBs',
      description: 'Our excellent quality PCBs are so popular that all our clients always prefer us first to order new PCBs.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'We understand the value of time so we always prefer the fast delivery service available.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Clock,
      title: '24/7 Hour Support',
      description: 'Our dedicated support team always ready to answer your all queries by email or over phone.',
      gradient: 'from-green-500 to-emerald-500'
    }
  ];

  const services = [
    {
      title: 'PCB Designing',
      description: 'PCB designing or printed circuit board designing is a process where highly experienced engineers and designers transfer the project concept to a specific file format with the help of PCB designing software. And that file used to to develop real printed circuit boards.',
      gradient: 'from-cyan-500 to-blue-500'
    },
    {
      title: 'PCB Fabrication',
      description: 'PCB fabrication is the next process after PCB designing. In this process, PCB manufacturing industries develop the printed circuit board with the help of computerized file called garber file. After this process, the printed circuit boards will be ready for assembly.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'PCB Assembly',
      description: 'When it comes to install electronic components on printed circuit boards especially very small components called SMD components it is almost impossible through manual process. But our robot can do this job very fast and accurately.',
      gradient: 'from-orange-500 to-red-500'
    }
  ];

  const faqs = [
    {
      question: 'How can I order custom PCB Designing?',
      answer: 'It is easy. If you have already done your homework, you can simply send your schematic design to us.'
    },
    {
      question: 'What is the time of PCB design?',
      answer: 'The time for PCB design varies based on complexity. Simple designs can be completed within 24-48 hours, while complex multi-layer designs may take 5-7 days.'
    },
    {
      question: 'What is the cost of PCB design service?',
      answer: 'The cost depends on the complexity, number of layers, and special requirements. Contact us with your specifications for a detailed quote.'
    },
    {
      question: 'Who can order PCB design Service?',
      answer: 'Anyone from hobbyists, students, startups to large enterprises can order our PCB design service. We cater to all types of clients regardless of project size.'
    },
    {
      question: 'What are the Maximum Order Quantity?',
      answer: 'You can order as much PCBs as you want. There is no limit for the maximum quantity you can order.'
    },
    {
      question: 'What are the Minimum Order Quantity?',
      answer: 'We accept orders starting from a single piece. Our prototyping service helps you finalize your end product without huge investment.'
    },
    {
      question: 'What is the expected time for PCB fabrication?',
      answer: 'We offer multiple lead times: 24 hours, 3 days, 5 days, 7 days, 10 days, 15 days, and 21 days depending on your requirements and PCB specifications.'
    },
    {
      question: 'What is the delivery process?',
      answer: 'Once processing is complete, we ship your order using fast and reliable delivery services. You will receive tracking information to monitor your shipment.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#001a24] text-gray-300 relative overflow-hidden">
      <Toaster position="top-right" />
      {/* Animated Circuit Board Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <svg className="w-full h-full" viewBox="0 0 1000 1000">
            <g className="animate-circuit-flow">
              <line x1="0" y1="100" x2="1000" y2="100" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
              <line x1="200" y1="0" x2="200" y2="1000" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
              <line x1="0" y1="400" x2="1000" y2="400" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
              <line x1="600" y1="0" x2="600" y2="1000" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
              <line x1="0" y1="700" x2="1000" y2="700" stroke="currentColor" strokeWidth="2" className="text-cyan-400"/>
              <line x1="800" y1="0" x2="800" y2="1000" stroke="currentColor" strokeWidth="2" className="text-purple-400"/>
              <circle cx="200" cy="100" r="15" fill="currentColor" className="text-cyan-400 animate-pulse"/>
              <circle cx="600" cy="400" r="15" fill="currentColor" className="text-purple-400 animate-pulse"/>
              <circle cx="800" cy="700" r="15" fill="currentColor" className="text-orange-400 animate-pulse"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Floating Circuit Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 animate-float-slow">
          <CircuitBoard className="w-24 h-24 text-cyan-400/10" />
        </div>
        <div className="absolute top-40 right-20 animate-float-slow animation-delay-2000">
          <Cpu className="w-32 h-32 text-purple-400/10" />
        </div>
        <div className="absolute bottom-40 left-1/4 animate-float-slow animation-delay-4000">
          <Zap className="w-28 h-28 text-orange-400/10" />
        </div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="absolute inset-0 animate-grid-flow"
            style={{
              backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.3) 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }}
          ></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <span className="text-cyan-400 text-sm font-medium">Get a free Quote</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              India's <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">1st Online</span>
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Printed Circuit Board<br />
              <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Development Service</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              One stop solution for any type of PCB development starting from prototyping to custom PCB Designing and Fabrication & PCB Assembly.
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our prototyping service helps you to finalize your end product and save your huge investment. Order as little as single piece to as much you want.
            </p>
          </div>

          {/* Service Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
              PCB Fabrication
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
              PCB Assembly
            </button>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
              PCB Design
            </button>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#002E3C]/50 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20">
            {/* Tabs */}
            <div className="flex border-b border-cyan-500/20">
              <button
                onClick={() => setActiveTab('fabrication')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'fabrication'
                    ? 'bg-white text-gray-900'
                    : 'bg-[#001a24] text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                PCB FABRICATION
              </button>
              <button
                onClick={() => setActiveTab('assembly')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'assembly'
                    ? 'bg-white text-gray-900'
                    : 'bg-[#001a24] text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                PCB ASSEMBLY
              </button>
              <button
                onClick={() => setActiveTab('design')}
                className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 ${
                  activeTab === 'design'
                    ? 'bg-white text-gray-900'
                    : 'bg-[#001a24] text-cyan-400 hover:bg-cyan-500/10'
                }`}
              >
                PCB DESIGN
              </button>
            </div>

            {/* PCB Fabrication Form */}
            {activeTab === 'fabrication' && (
              <div className="p-8">
                <form onSubmit={handleFabricationSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">First Name*</label>
                      <input 
                        type="text"
                        name="firstName"
                        value={fabricationForm.firstName}
                        onChange={(e) => setFabricationForm({...fabricationForm, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Last Name*</label>
                      <input 
                        type="text"
                        name="lastName"
                        value={fabricationForm.lastName}
                        onChange={(e) => setFabricationForm({...fabricationForm, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Phone No (WhatsApp)*</label>
                    <input 
                      type="tel"
                      name="phone"
                      value={fabricationForm.phone}
                      onChange={(e) => setFabricationForm({...fabricationForm, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email address*</label>
                    <input 
                      type="email"
                      name="email"
                      value={fabricationForm.email}
                      onChange={(e) => setFabricationForm({...fabricationForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Layers*</label>
                      <select 
                        name="layers"
                        value={fabricationForm.layers}
                        onChange={(e) => setFabricationForm({...fabricationForm, layers: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      >
                        <option value="">Please select</option>
                        <option value="single">Single Layer</option>
                        <option value="double">Double Layer</option>
                        <option value="4layer">4 Layer</option>
                        <option value="6layer">6 Layer</option>
                        <option value="multi">Multi Layer (8+)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Quantity*</label>
                      <select 
                        name="quantity"
                        value={fabricationForm.quantity}
                        onChange={(e) => setFabricationForm({...fabricationForm, quantity: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      >
                        <option value="">Please select</option>
                        <option value="1">1 piece</option>
                        <option value="5">5 pieces</option>
                        <option value="10">10 pieces</option>
                        <option value="25">25 pieces</option>
                        <option value="50">50 pieces</option>
                        <option value="100">100 pieces</option>
                        <option value="500">500+ pieces</option>
                        <option value="custom">Custom quantity</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Dimensions</label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <input 
                          type="number"
                          name="length"
                          value={fabricationForm.length}
                          onChange={(e) => setFabricationForm({...fabricationForm, length: e.target.value})}
                          placeholder="Length (mm)*"
                          className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                          required
                        />
                      </div>
                      <div>
                        <input 
                          type="number"
                          name="width"
                          value={fabricationForm.width}
                          onChange={(e) => setFabricationForm({...fabricationForm, width: e.target.value})}
                          placeholder="Width (mm)*"
                          className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Upload (zip file only) - Optional</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept=".zip"
                        onChange={(e) => setFabricationForm({...fabricationForm, file: e.target.files?.[0] || null})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND'}
                  </button>
                </form>
              </div>
            )}

            {/* PCB Assembly Form */}
            {activeTab === 'assembly' && (
              <div className="p-8">
                <form onSubmit={handleAssemblySubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">First Name*</label>
                      <input 
                        type="text"
                        value={assemblyForm.firstName}
                        onChange={(e) => setAssemblyForm({...assemblyForm, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Last Name*</label>
                      <input 
                        type="text"
                        value={assemblyForm.lastName}
                        onChange={(e) => setAssemblyForm({...assemblyForm, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Phone No (WhatsApp)*</label>
                    <input 
                      type="tel"
                      value={assemblyForm.phone}
                      onChange={(e) => setAssemblyForm({...assemblyForm, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email address*</label>
                    <input 
                      type="email"
                      value={assemblyForm.email}
                      onChange={(e) => setAssemblyForm({...assemblyForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">No of Components*</label>
                      <select
                        value={assemblyForm.components}
                        onChange={(e) => setAssemblyForm({...assemblyForm, components: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      >
                        <option value="">Please select</option>
                        <option value="1-10">1-10 components</option>
                        <option value="11-50">11-50 components</option>
                        <option value="51-100">51-100 components</option>
                        <option value="101-200">101-200 components</option>
                        <option value="201-500">201-500 components</option>
                        <option value="500+">500+ components</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">PCB Quantity*</label>
                      <select
                        value={assemblyForm.quantity}
                        onChange={(e) => setAssemblyForm({...assemblyForm, quantity: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      >
                        <option value="">Please select</option>
                        <option value="1">1 piece</option>
                        <option value="5">5 pieces</option>
                        <option value="10">10 pieces</option>
                        <option value="25">25 pieces</option>
                        <option value="50">50 pieces</option>
                        <option value="100">100+ pieces</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">PCB Type*</label>
                    <select
                      value={assemblyForm.pcbType}
                      onChange={(e) => setAssemblyForm({...assemblyForm, pcbType: e.target.value})}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                      required
                    >
                      <option value="">Please select</option>
                      <option value="smd">SMD (Surface Mount)</option>
                      <option value="through-hole">Through-Hole</option>
                      <option value="mixed">Mixed (SMD + Through-Hole)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Component Lists (pdf or zip) - Optional</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept=".pdf,.zip"
                        onChange={(e) => setAssemblyForm({...assemblyForm, file: e.target.files?.[0] || null})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND'}
                  </button>
                </form>
              </div>
            )}

            {/* PCB Design Form */}
            {activeTab === 'design' && (
              <div className="p-8">
                <form onSubmit={handleDesignSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">First Name*</label>
                      <input 
                        type="text"
                        value={designForm.firstName}
                        onChange={(e) => setDesignForm({...designForm, firstName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Last Name*</label>
                      <input 
                        type="text"
                        value={designForm.lastName}
                        onChange={(e) => setDesignForm({...designForm, lastName: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Phone No (WhatsApp)*</label>
                    <input 
                      type="tel"
                      value={designForm.phone}
                      onChange={(e) => setDesignForm({...designForm, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Email address*</label>
                    <input 
                      type="email"
                      value={designForm.email}
                      onChange={(e) => setDesignForm({...designForm, email: e.target.value})}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 mb-2">Design Complexity*</label>
                      <select
                        value={designForm.complexity}
                        onChange={(e) => setDesignForm({...designForm, complexity: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      >
                        <option value="">Please select</option>
                        <option value="simple">Simple (Single/Double Layer)</option>
                        <option value="moderate">Moderate (4 Layer)</option>
                        <option value="complex">Complex (6+ Layer)</option>
                        <option value="advanced">Advanced (High-speed/RF)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-gray-300 mb-2">Number of Components*</label>
                      <select
                        value={designForm.componentCount}
                        onChange={(e) => setDesignForm({...designForm, componentCount: e.target.value})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        required
                      >
                        <option value="">Please select</option>
                        <option value="1-20">1-20 components</option>
                        <option value="21-50">21-50 components</option>
                        <option value="51-100">51-100 components</option>
                        <option value="101-200">101-200 components</option>
                        <option value="200+">200+ components</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Expected Dimensions</label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <input 
                          type="number"
                          value={designForm.length}
                          onChange={(e) => setDesignForm({...designForm, length: e.target.value})}
                          placeholder="Length (mm)"
                          className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        />
                      </div>
                      <div>
                        <input 
                          type="number"
                          value={designForm.width}
                          onChange={(e) => setDesignForm({...designForm, width: e.target.value})}
                          placeholder="Width (mm)"
                          className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Project Description*</label>
                    <textarea
                      value={designForm.description}
                      onChange={(e) => setDesignForm({...designForm, description: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white resize-none"
                      placeholder="Describe your project requirements, special features, etc."
                      required
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-gray-300 mb-2">Upload Schematic/Reference (optional)</label>
                    <div className="relative">
                      <input 
                        type="file" 
                        accept=".pdf,.zip,.png,.jpg,.jpeg"
                        onChange={(e) => setDesignForm({...designForm, file: e.target.files?.[0] || null})}
                        className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/30 rounded-lg focus:outline-none focus:border-cyan-400 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'SENDING...' : 'SEND'}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Process</span>
            </h2>
            <p className="text-gray-400 text-lg">Simple and streamlined PCB ordering process</p>
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

      {/* Capabilities Table */}
      <section className="py-20 bg-[#002E3C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Our <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Capabilities</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              We have in house PCB manufacturing facility for quick turn Prototype & Bulk Quantity manufacturing for Single & Double Sided.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-[#001a24]/50 backdrop-blur-sm rounded-xl overflow-hidden">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-cyan-500/30">
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold">Sr. No.</th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold">Technical Specification</th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold">Single Side</th>
                  <th className="px-6 py-4 text-left text-cyan-400 font-semibold">Double Side</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4 font-medium">Lead time</td>
                  <td className="px-6 py-4">24 hours, 3 days, 5 days, 7 days</td>
                  <td className="px-6 py-4">24 hours, 3 days, 5 days, 7 days, 10, 15, 21 Days</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4 font-medium">Material</td>
                  <td className="px-6 py-4">FR1, FR4, CEM1, CEM3, Paper FR4 Phenolic, Metal Clad(A1)</td>
                  <td className="px-6 py-4">FR4</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4 font-medium">PCB Thickness (mm)</td>
                  <td className="px-6 py-4">0.4, 0.8, 1.0, 1.2, 1.6, 2.0, 2.4, 3.2</td>
                  <td className="px-6 py-4">0.4, 0.8, 1.0, 1.2, 1.6, 2.0, 2.4, 3.2</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">4</td>
                  <td className="px-6 py-4 font-medium">Base Copper Thicknesses</td>
                  <td className="px-6 py-4">1 oz (35μ), 2 oz (70μ), 3 oz (105μ)</td>
                  <td className="px-6 py-4">1 oz (35μ), 2 oz (70μ), 3 oz (105μ)</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">5</td>
                  <td className="px-6 py-4 font-medium">Maximum Board size</td>
                  <td className="px-6 py-4">400 x 500 mm</td>
                  <td className="px-6 py-4">400 x 500 mm</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">6</td>
                  <td className="px-6 py-4 font-medium">Minimum track width</td>
                  <td className="px-6 py-4">4mil (0.1mm)</td>
                  <td className="px-6 py-4">4mil (0.1mm)</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">7</td>
                  <td className="px-6 py-4 font-medium">Minimum Finish Hole size</td>
                  <td className="px-6 py-4">10mil (0.25mm)</td>
                  <td className="px-6 py-4">10mil (0.25mm)</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">8</td>
                  <td className="px-6 py-4 font-medium">Maximum Finish PTH Hole size</td>
                  <td className="px-6 py-4">240mil (6mm)</td>
                  <td className="px-6 py-4">240mil (6mm)</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">9</td>
                  <td className="px-6 py-4 font-medium">Cutting Option</td>
                  <td className="px-6 py-4">Routing, V groove, Punching BBT, FPT</td>
                  <td className="px-6 py-4">Routing, V groove, Punching BBT, FPT</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">10</td>
                  <td className="px-6 py-4 font-medium">Testing</td>
                  <td className="px-6 py-4">BBT, FPT</td>
                  <td className="px-6 py-4">BBT, FPT</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">11</td>
                  <td className="px-6 py-4 font-medium">Mask Colour</td>
                  <td className="px-6 py-4">No mask, Green, Red, White, Black, Blue</td>
                  <td className="px-6 py-4">No mask, Green, Red, White, Black, Blue</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">12</td>
                  <td className="px-6 py-4 font-medium">Legend Colour</td>
                  <td className="px-6 py-4">White, Black, No legend</td>
                  <td className="px-6 py-4">White, Black, No legend</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">13</td>
                  <td className="px-6 py-4 font-medium">Surface Finish</td>
                  <td className="px-6 py-4">HAL, ENIG, OSP, Lacquer, Nikel</td>
                  <td className="px-6 py-4">HAL, ENIG, OSP, Lacquer, Nikel</td>
                </tr>
                <tr className="border-b border-cyan-500/10 hover:bg-cyan-500/5">
                  <td className="px-6 py-4">14</td>
                  <td className="px-6 py-4 font-medium">Special Requirement</td>
                  <td className="px-6 py-4">Carbon Printing on Push Button, Selective Gold & Nickel plating on Connecting Tabs</td>
                  <td className="px-6 py-4">Carbon Printing on Push Button, Selective Gold & Nickel plating on Connecting Tabs</td>
                </tr>
                <tr className="hover:bg-cyan-500/5">
                  <td className="px-6 py-4">15</td>
                  <td className="px-6 py-4 font-medium">ROHS Compliance</td>
                  <td className="px-6 py-4">Yes</td>
                  <td className="px-6 py-4">Yes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Explore the world of <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">PCB</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="group bg-[#002E3C]/50 backdrop-blur-sm rounded-xl p-8 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`h-2 rounded-full bg-gradient-to-r ${service.gradient} mb-6`}></div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-[#002E3C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Choose Us</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="text-center group"
                >
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-white" size={36} />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">FAQ</span>
            </h2>
            <p className="text-gray-400 text-lg">Most frequent questions and answers</p>
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

      {/* Portfolio Section */}
      <section className="py-20 bg-[#002E3C]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              OUR PCB FABRICATION & <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">ASSEMBLY PORTFOLIO</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Check out our collection of Printed circuit Boards Fabricated or Assembled or Both for our clients.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Round PCB', 'PCB Assembly', 'IR PCB', 'Explorer Board'].map((item, index) => (
              <div 
                key={index}
                className="group relative bg-[#001a24]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 aspect-square flex items-center justify-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                <CircuitBoard className="text-cyan-400 opacity-20 group-hover:opacity-40 transition-opacity" size={64} />
                <p className="absolute bottom-4 text-white font-medium text-center">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* Custom CSS for PCB-specific animations */}
      <style>{`
        @keyframes circuit-flow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        @keyframes grid-flow {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(50px) translateY(50px); }
        }
        
        .animate-circuit-flow {
          animation: circuit-flow 3s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-grid-flow {
          animation: grid-flow 20s linear infinite;
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

export default PCBManufacturing;
