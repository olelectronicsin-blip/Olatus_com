import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Book, 
  Code, 
  Cpu, 
  Layers, 
  Zap, 
  Search, 
  ChevronRight, 
  FileText, 
  Boxes, 
  CircuitBoard,
  Globe,
  Smartphone,
  Settings,
  Download,
  ExternalLink,
  ArrowLeft,
  Terminal,
  Database,
  Cloud,
  Shield,
  Lightbulb
} from 'lucide-react';

const Documentation = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Docs', icon: Book },
    { id: 'pcb', label: 'PCB Design', icon: CircuitBoard },
    { id: '3d-printing', label: '3D Printing', icon: Boxes },
    { id: 'embedded', label: 'Embedded Systems', icon: Cpu },
    { id: 'web', label: 'Web Development', icon: Globe },
    { id: 'api', label: 'API Reference', icon: Code },
    { id: 'guides', label: 'Guides & Tutorials', icon: Lightbulb },
  ];

  const documentationSections = [
    {
      category: 'pcb',
      title: 'PCB Manufacturing Guide',
      description: 'Complete guide to PCB design, manufacturing process, and specifications',
      icon: CircuitBoard,
      color: 'cyan',
      topics: [
        'PCB Design Guidelines',
        'Layer Stack Configuration',
        'Manufacturing Specifications',
        'Quality Standards & Testing',
        'File Submission Formats',
      ],
      downloadable: true,
    },
    {
      category: '3d-printing',
      title: '3D Printing Documentation',
      description: 'Everything you need to know about 3D printing services and specifications',
      icon: Boxes,
      color: 'purple',
      topics: [
        'Supported Materials & Finishes',
        'Design for 3D Printing',
        'File Preparation & Formats',
        'Post-Processing Options',
        'Quality Assurance',
      ],
      downloadable: true,
    },
    {
      category: 'embedded',
      title: 'Embedded Systems Development',
      description: 'Comprehensive guide to embedded software and hardware development',
      icon: Cpu,
      color: 'blue',
      topics: [
        'Microcontroller Selection',
        'Firmware Development',
        'RTOS Implementation',
        'Hardware-Software Integration',
        'Debugging & Testing',
      ],
      downloadable: true,
    },
    {
      category: 'web',
      title: 'Web Development Standards',
      description: 'Best practices and standards for modern web development',
      icon: Globe,
      color: 'green',
      topics: [
        'Frontend Architecture',
        'Backend Services',
        'API Integration',
        'Security Best Practices',
        'Deployment & DevOps',
      ],
      downloadable: false,
    },
    {
      category: 'api',
      title: 'API Reference',
      description: 'Complete API documentation for integrating with Olatus services',
      icon: Code,
      color: 'orange',
      topics: [
        'Authentication & Authorization',
        'REST API Endpoints',
        'WebSocket Services',
        'Rate Limiting & Quotas',
        'Error Handling',
      ],
      downloadable: false,
    },
    {
      category: 'guides',
      title: 'Getting Started Guides',
      description: 'Step-by-step tutorials for beginners and advanced users',
      icon: Lightbulb,
      color: 'yellow',
      topics: [
        'Quick Start Guide',
        'Project Templates',
        'Common Workflows',
        'Tips & Tricks',
        'Troubleshooting',
      ],
      downloadable: true,
    },
  ];

  const technicalResources = [
    {
      title: 'Design Guidelines',
      description: 'Industry-standard design guidelines and best practices',
      icon: FileText,
      link: '#',
    },
    {
      title: 'Component Libraries',
      description: 'Pre-built components and modules for faster development',
      icon: Database,
      link: '#',
    },
    {
      title: 'Code Examples',
      description: 'Sample code and reference implementations',
      icon: Terminal,
      link: '#',
    },
    {
      title: 'Cloud Services',
      description: 'Integration guides for cloud platforms and services',
      icon: Cloud,
      link: '#',
    },
  ];

  const filteredDocs = documentationSections.filter(doc => 
    (selectedCategory === 'all' || doc.category === selectedCategory) &&
    (searchQuery === '' || 
     doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
     doc.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; hover: string; glow: string }> = {
      cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', hover: 'hover:border-cyan-500/50', glow: 'shadow-cyan-500/20' },
      purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', hover: 'hover:border-purple-500/50', glow: 'shadow-purple-500/20' },
      blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', hover: 'hover:border-blue-500/50', glow: 'shadow-blue-500/20' },
      green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400', hover: 'hover:border-green-500/50', glow: 'shadow-green-500/20' },
      orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400', hover: 'hover:border-orange-500/50', glow: 'shadow-orange-500/20' },
      yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400', hover: 'hover:border-yellow-500/50', glow: 'shadow-yellow-500/20' },
    };
    return colors[color] || colors.cyan;
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-900/20 via-slate-900 to-black relative">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 blur-sm pointer-events-none">
        {/* Header */}
        <div className="border-b border-cyan-500/20 backdrop-blur-sm bg-[#001a24]/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors"
              >
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </button>
              <div className="flex items-center gap-3">
                <Shield className="text-cyan-400" size={24} />
                <span className="text-sm text-gray-400">v2.0.0</span>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                    Documentation
                  </span>
                </h1>
                <p className="text-gray-400 text-lg">
                  Comprehensive guides and resources for all Olatus services
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-[#001a24]/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    selectedCategory === category.id
                      ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-400'
                      : 'bg-[#001a24]/30 border-cyan-500/20 text-gray-400 hover:border-cyan-500/40 hover:text-cyan-400'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Documentation Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredDocs.map((doc, index) => {
              const Icon = doc.icon;
              const colors = getColorClasses(doc.color);
              
              return (
                <div
                  key={index}
                  className={`group relative bg-[#001a24]/30 backdrop-blur-sm border ${colors.border} rounded-xl p-6 ${colors.hover} transition-all duration-300 hover:shadow-lg ${colors.glow} hover:-translate-y-1`}
                >
                  {/* Icon */}
                  <div className={`${colors.bg} ${colors.border} border rounded-lg w-14 h-14 flex items-center justify-center mb-4`}>
                    <Icon className={colors.text} size={28} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {doc.description}
                  </p>

                  {/* Topics */}
                  <ul className="space-y-2 mb-6">
                    {doc.topics.slice(0, 3).map((topic, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                        <ChevronRight size={16} className={colors.text} />
                        <span>{topic}</span>
                      </li>
                    ))}
                    {doc.topics.length > 3 && (
                      <li className="text-sm text-gray-500 ml-6">
                        +{doc.topics.length - 3} more topics
                      </li>
                    )}
                  </ul>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg ${colors.text} hover:bg-opacity-20 transition-all`}>
                      <span className="text-sm font-medium">View Docs</span>
                      <ExternalLink size={16} />
                    </button>
                    {doc.downloadable && (
                      <button className={`px-4 py-2 ${colors.bg} border ${colors.border} rounded-lg ${colors.text} hover:bg-opacity-20 transition-all`}>
                        <Download size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Technical Resources Section */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="text-cyan-400" size={28} />
              <h2 className="text-3xl font-bold text-white">Technical Resources</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {technicalResources.map((resource, index) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={index}
                    href={resource.link}
                    className="group bg-[#001a24]/30 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-5 hover:border-cyan-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1"
                  >
                    <Icon className="text-cyan-400 mb-3 group-hover:scale-110 transition-transform" size={24} />
                    <h4 className="text-white font-semibold mb-2 group-hover:text-cyan-400 transition-colors">
                      {resource.title}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {resource.description}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Quick Links</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-cyan-400 font-semibold mb-3 flex items-center gap-2">
                  <Zap size={20} />
                  Getting Started
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Installation Guide</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">First Project Setup</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-cyan-400 text-sm transition-colors">Configuration</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
                  <Layers size={20} />
                  Advanced Topics
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Custom Integrations</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Performance Optimization</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">Security Guidelines</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
                  <Smartphone size={20} />
                  Support
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">FAQ</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Community Forum</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">Contact Support</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <p className="text-gray-400 mb-4">
              Can't find what you're looking for?
            </p>
            <button
              onClick={() => navigate('/#contact')}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all"
            >
              Contact Our Support Team
            </button>
          </div>
        </div>
      </div>

      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="relative">
          {/* Animated rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-cyan-500/30 rounded-full animate-ping" />
            <div className="absolute w-48 h-48 border-2 border-purple-500/30 rounded-full animate-ping animation-delay-1000" />
            <div className="absolute w-32 h-32 border-2 border-cyan-500/30 rounded-full animate-ping animation-delay-2000" />
          </div>

          {/* Main content card */}
          <div className="relative bg-gradient-to-br from-[#001a24]/95 via-slate-900/95 to-black/95 backdrop-blur-xl border-2 border-cyan-500/30 rounded-3xl p-12 shadow-2xl shadow-cyan-500/20 max-w-2xl mx-4">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl opacity-20 blur-xl" />
            
            <div className="relative z-10">
              {/* Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse" />
                  <div className="relative bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full p-6">
                    <Book className="text-white" size={48} />
                  </div>
                </div>
              </div>

              {/* Main heading */}
              <h2 className="text-5xl md:text-6xl font-bold text-center mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                  Coming Soon
                </span>
              </h2>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-center text-gray-300 mb-6 font-medium">
                Documentation Portal
              </p>

              {/* Description */}
              <p className="text-center text-gray-400 mb-8 leading-relaxed max-w-lg mx-auto">
                We're crafting a comprehensive documentation experience with detailed guides, 
                API references, and interactive tutorials. Stay tuned!
              </p>

              {/* Progress indicators */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Content Creation</span>
                  <span className="text-cyan-400">75%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full rounded-full animate-pulse" style={{ width: '75%' }} />
                </div>
                
                <div className="flex items-center justify-between text-sm mt-4">
                  <span className="text-gray-400">Platform Development</span>
                  <span className="text-purple-400">60%</span>
                </div>
                <div className="w-full bg-slate-800/50 rounded-full h-2 overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-full rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
              </div>

              {/* Status badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <div className="flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                  <span className="text-cyan-400 text-sm font-medium">Under Development</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <Zap className="text-purple-400" size={14} />
                  <span className="text-purple-400 text-sm font-medium">Launching Q1 2026</span>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/#contact')}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-105"
                >
                  Get Notified
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="px-8 py-3 bg-[#001a24]/50 border border-cyan-500/30 rounded-lg text-cyan-400 font-semibold hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all"
                >
                  Back to Home
                </button>
              </div>

              {/* Additional info */}
              <div className="mt-8 pt-8 border-t border-cyan-500/20">
                <p className="text-center text-gray-500 text-sm">
                  In the meantime, feel free to explore our services or contact our team for assistance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
