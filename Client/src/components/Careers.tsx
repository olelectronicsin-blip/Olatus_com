import { useState, useEffect } from 'react';
import { submitInternshipApplication } from '../lib/serviceApi';
import { useContactModal } from '../contexts/ContactModalContext';
import { 
  Code, 
  Cpu, 
  Bot, 
  Wrench, 
  CircuitBoard, 
  GraduationCap, 
  Calendar, 
  Award, 
  Users,
  Briefcase,
  TrendingUp,
  Heart,
  Coffee,
  Zap,
  Target,
  Mail,
  MapPin,
  Clock
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const trainingPrograms = [
  {
    icon: Code,
    title: 'Web Development',
    duration: '12 Weeks',
    level: 'Beginner to Advanced',
    topics: ['React & TypeScript', 'Node.js & Express', 'Database Design', 'Cloud Deployment'],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Cpu,
    title: 'IoT & Embedded Systems',
    duration: '16 Weeks',
    level: 'Intermediate',
    topics: ['Microcontrollers', 'Sensor Integration', 'Communication Protocols', 'Real-time Systems'],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: Bot,
    title: 'Robotics & Automation',
    duration: '14 Weeks',
    level: 'Beginner to Intermediate',
    topics: ['Robot Mechanics', 'Control Systems', 'Path Planning', 'Computer Vision'],
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Wrench,
    title: 'AI & Machine Learning',
    duration: '16 Weeks',
    level: 'Advanced',
    topics: ['Neural Networks', 'Edge AI', 'Computer Vision', 'Model Optimization'],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: CircuitBoard,
    title: 'PCB Design & Fabrication',
    duration: '10 Weeks',
    level: 'Intermediate',
    topics: ['PCB Design Tools', 'Circuit Analysis', 'Manufacturing Process', 'Testing & Debugging'],
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    icon: GraduationCap,
    title: 'Product Development',
    duration: '12 Weeks',
    level: 'Advanced',
    topics: ['Concept to Prototype', 'Hardware-Software Integration', '3D Modeling', 'Market Analysis'],
    gradient: 'from-pink-500 to-purple-600',
  },
];

const benefits = [
  { icon: Award, text: 'Industry-recognized certification' },
  { icon: Code, text: 'Hands-on project experience' },
  { icon: Users, text: 'Expert mentor guidance' },
  { icon: Calendar, text: 'Flexible learning schedules' },
];

const jobOpenings = [
  {
    title: 'Senior Hardware Engineer',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full-time',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    title: 'Full Stack Developer',
    department: 'Software',
    location: 'Remote',
    type: 'Full-time',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    title: 'IoT Solutions Architect',
    department: 'Engineering',
    location: 'Bangalore, India',
    type: 'Full-time',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    title: 'Product Designer',
    department: 'Design',
    location: 'Hybrid',
    type: 'Full-time',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Bangalore, India',
    type: 'Full-time',
    gradient: 'from-pink-500 to-purple-600'
  },
  {
    title: 'Technical Writer',
    department: 'Documentation',
    location: 'Remote',
    type: 'Contract',
    gradient: 'from-yellow-500 to-orange-500'
  }
];

const companyValues = [
  {
    icon: Target,
    title: 'Innovation First',
    description: 'We encourage creative thinking and cutting-edge solutions',
    gradient: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'Work with talented teams across disciplines',
    gradient: 'from-purple-500 to-pink-500'
  },
  {
    icon: TrendingUp,
    title: 'Growth Opportunities',
    description: 'Continuous learning and career advancement',
    gradient: 'from-orange-500 to-red-500'
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Flexible schedules and wellness programs',
    gradient: 'from-green-500 to-emerald-500'
  }
];

const Careers = () => {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'jobs' | 'training'>('jobs');
  const [showInternshipForm, setShowInternshipForm] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [programTitle, setProgramTitle] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const { openContactModal } = useContactModal();
  // Toggle job openings via env (defaults to closed)
  const jobsOpen = (((import.meta as any).env?.VITE_JOBS_OPEN) ?? 'false') === 'true';

  useEffect(() => {
    // Check if URL has #training hash
    if (window.location.hash === '#training') {
      setActiveTab('training');
    }
    // If jobs are closed, default to Training
    if (!jobsOpen) {
      setActiveTab('training');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#001a24] text-gray-300 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-10 animate-float-slow">
            <Briefcase className="w-24 h-24 text-cyan-400/10" />
          </div>
          <div className="absolute top-40 right-20 animate-float-slow animation-delay-2000">
            <GraduationCap className="w-32 h-32 text-purple-400/10" />
          </div>
          <div className="absolute bottom-40 left-1/4 animate-float-slow animation-delay-4000">
            <Zap className="w-28 h-28 text-orange-400/10" />
          </div>
        </div>
      </div>

      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <span className="text-cyan-400 text-sm font-medium">Join Our Team</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
              Build Your <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Career</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              With <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">OLatus</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
              Join a team of innovators, creators, and problem-solvers. Whether you're looking for a job or want to enhance your skills through our training programs, we have opportunities for you.
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('training')}
              className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'training'
                  ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/50'
                  : 'bg-[#002E3C]/50 text-gray-300 border border-orange-500/20 hover:border-orange-500/50'
              }`}
            >
              <GraduationCap className="inline-block mr-2" size={20} />
              Training & Internships
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-8 py-4 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === 'jobs'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/50'
                  : 'bg-[#002E3C]/50 text-gray-300 border border-cyan-500/20 hover:border-cyan-500/50'
              }`}
            >
              <Briefcase className="inline-block mr-2" size={20} />
              Job Openings
            </button>
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      {activeTab === 'jobs' && (
        <div>
          {/* Company Values */}
          <section className="py-20 bg-[#002E3C]/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Why <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Work With Us?</span>
                </h2>
                <p className="text-gray-400 text-lg">Experience a workplace that values innovation and your growth</p>
                {!jobsOpen && (
                  <div className="mt-6 inline-block px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30">
                    <span className="text-red-300 text-sm font-medium">Currently, job positions are closed</span>
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {companyValues.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div 
                      key={index}
                      className="group bg-[#001a24]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300"
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                      <p className="text-gray-400">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Perks & Benefits */}
          <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Perks & <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Benefits</span>
                </h2>
                {jobsOpen ? (
                  <p className="text-gray-400 text-lg">Find your perfect role and start your journey with us</p>
                ) : (
                  <p className="text-gray-400 text-lg">There are no open positions at the moment. Please check back later or explore our Training & Internship programs.</p>
                )}

              </div>

              {jobsOpen ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {jobOpenings.map((job, index) => (
                    <div 
                      key={index}
                      className="group bg-[#001a24]/50 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
                    >
                      <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${job.gradient} text-white text-sm mb-4`}>
                        {job.department}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-cyan-400" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-purple-400" />
                          <span>{job.type}</span>
                        </div>
                      </div>
                      <button 
                        onClick={openContactModal}
                        className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                      >
                        Apply Now
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <button
                    onClick={() => setActiveTab('training')}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    Explore Training & Internships
                  </button>
                </div>
              )}
              {/* The Open Positions grid and CTA are now rendered conditionally above. */}
            </div>
          </section>
        </div>
      )}

      {/* Training & Internships Section */}
      {activeTab === 'training' && (
        <div>
          <section id="training" className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">
                  Training & <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Internships</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                  Comprehensive programs designed to transform students into industry-ready professionals
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-4 mb-12">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="bg-[#001a24]/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group">
                      <div className="flex items-center gap-3">
                        <Icon className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
                        <span className="text-white text-sm font-medium">{benefit.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {trainingPrograms.map((program, index) => {
                  const Icon = program.icon;
                  const isSelected = selectedProgram === index;

                  return (
                    <div
                      key={index}
                      onClick={() => setSelectedProgram(isSelected ? null : index)}
                      className={`group relative bg-[#001a24]/80 backdrop-blur-sm rounded-xl p-6 border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        isSelected
                          ? 'border-cyan-400 shadow-lg shadow-cyan-500/50'
                          : 'border-cyan-500/20 hover:border-cyan-500/50'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${program.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white" size={28} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock size={16} className="text-cyan-400" />
                          <span>{program.duration}</span>
                        </div>
                        <div className="px-2 py-1 bg-cyan-500/10 rounded text-cyan-400 text-xs">
                          {program.level}
                        </div>
                      </div>

                      <div className={`overflow-hidden transition-all duration-300 ${
                        isSelected ? 'max-h-96' : 'max-h-0'
                      }`}>
                        <div className="pt-4 border-t border-cyan-500/20">
                          <h4 className="text-white font-semibold mb-2">Topics Covered:</h4>
                          <ul className="space-y-2">
                            {program.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start gap-2 text-gray-400">
                                <span className="text-cyan-400 mt-1">•</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                          <button className="mt-4 w-full px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                            Enroll Now
                          </button>
                        </div>
                      </div>

                      {!isSelected && (
                        <div className="text-cyan-400 text-sm mt-4 flex items-center gap-1">
                          Click to see more
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Internship Program */}
              <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-8 border border-cyan-500/20">
                <div className="text-center mb-8">
                  <h3 className="text-3xl font-bold text-white mb-4">
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-600 text-transparent bg-clip-text">Internship Program</span>
                  </h3>
                  <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                    Get real-world experience working on live projects with our team. Our internship program combines mentorship, hands-on learning, and the opportunity to contribute to actual products.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text mb-2">
                      3-6 Months
                    </div>
                    <div className="text-gray-400">Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-2">
                      Stipend
                    </div>
                    <div className="text-gray-400">Provided</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text mb-2">
                      Certificate
                    </div>
                    <div className="text-gray-400">On Completion</div>
                  </div>
                </div>

                <div className="text-center">
                  <button 
                    onClick={() => setShowInternshipForm(true)}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105"
                  >
                    Apply for Internship
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Internship Application Modal */}
      {showInternshipForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative bg-[#001a24] rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-cyan-500/30">
            {/* Close Button */}
            <button
              onClick={() => setShowInternshipForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Ready to Start Your Journey?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Apply for our internship programs and gain real-world experience working on
                    cutting-edge projects with industry experts.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                      Live project experience
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                      Direct mentorship from experts
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-3 text-gray-300">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-orange-500 to-pink-500"></div>
                      Job placement assistance
                    </li>
                  </ul>
                </div>

                <div className="bg-[#002E3C]/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
                  <h4 className="text-xl font-bold text-white mb-4">Application Form</h4>
                  <form
                    className="space-y-4"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      setSubmitting(true);
                      setSubmitError(null);
                      setSubmitSuccess(null);
                      // Map program title to backend enum
                      const positionMap: Record<string, string> = {
                        'Web Development': 'WEB_DEVELOPMENT',
                        'IoT & Embedded Systems': 'EMBEDDED_SYSTEMS',
                        'PCB Design & Fabrication': 'PCB_DESIGN',
                        'Product Development': 'PRODUCT_DESIGN',
                        'Robotics & Automation': 'ROBOTICS',
                        'AI & Machine Learning': 'WEB_DEVELOPMENT',
                      };
                      const position = positionMap[programTitle] || 'WEB_DEVELOPMENT';
                      try {
                        await submitInternshipApplication({
                          fullName,
                          email,
                          phone,
                          position,
                          education: programTitle,
                          skills: [],
                          resume: resumeFile ?? undefined,
                        });
                        setSubmitSuccess('Application submitted successfully!');
                        // Optionally close after a short delay
                        setTimeout(() => {
                          setShowInternshipForm(false);
                          setFullName('');
                          setEmail('');
                          setPhone('');
                          setProgramTitle('');
                          setResumeFile(null);
                          setResumeError(null);
                          setSubmitSuccess(null);
                        }, 1200);
                      } catch (err: any) {
                        setSubmitError(err?.message || 'Failed to submit application');
                      } finally {
                        setSubmitting(false);
                      }
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Full Name"
                      required
                      value={fullName}
                      onChange={(e)=>setFullName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      required
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      value={phone}
                      onChange={(e)=>setPhone(e.target.value)}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                    />
                    <select 
                      required
                      value={programTitle}
                      onChange={(e)=>setProgramTitle(e.target.value)}
                      className="w-full px-4 py-3 bg-[#001a24] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors"
                    >
                      <option value="">Select Program</option>
                      {trainingPrograms.map((program, i) => (
                        <option key={i} value={program.title}>{program.title}</option>
                      ))}
                    </select>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Upload Resume (PDF preferred)</label>
                      <input
                        type="file"
                        accept=".pdf,.zip,.stl,.gbr,.ger,image/*"
                        onChange={(e)=>{
                          setResumeError(null);
                          const file = e.target.files?.[0] || null;
                          if (!file) { setResumeFile(null); return; }
                          const maxSize = 10 * 1024 * 1024; // 10MB
                          const allowedExt = [/\.pdf$/i, /\.zip$/i, /\.stl$/i, /\.gbr$/i, /\.ger$/i];
                          const name = file.name.toLowerCase();
                          const extOk = allowedExt.some((re)=>re.test(name)) || file.type.startsWith('image/');
                          if (!extOk) {
                            setResumeError('Allowed: PDF, ZIP, STL, Gerber, or image files');
                            setResumeFile(null);
                            return;
                          }
                          if (file.size > maxSize) {
                            setResumeError('File too large. Max 10MB');
                            setResumeFile(null);
                            return;
                          }
                          setResumeFile(file);
                        }}
                        className="w-full text-sm file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:text-gray-200 file:hover:bg-white/10"
                      />
                      {resumeFile && (
                        <div className="mt-2 text-xs text-gray-400">Selected: {resumeFile.name}</div>
                      )}
                      {resumeError && (
                        <div className="mt-2 text-sm text-red-300 bg-red-900/20 border border-red-500/30 rounded p-2">{resumeError}</div>
                      )}
                    </div>
                    {submitError && (
                      <div className="text-sm text-red-300 bg-red-900/20 border border-red-500/30 rounded p-2">{submitError}</div>
                    )}
                    {submitSuccess && (
                      <div className="text-sm text-green-300 bg-green-900/20 border border-green-500/30 rounded p-2">{submitSuccess}</div>
                    )}
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 disabled:opacity-60"
                    >
                      {submitting ? 'Submitting...' : 'Apply Now'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(5deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
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

export default Careers;
