import { Zap, Target, Award, Users, Linkedin, Github, Mail } from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingBot from './FloatingBot';
import BrandSlider from './BrandSlider';

const milestones = [
  { year: '2018', event: 'Olatus Founded', description: 'Started journey in electronics innovation' },
  { year: '2019', event: 'First IoT Lab Setup', description: 'Established technology education programs' },
  { year: '2020', event: 'PCB Division Launch', description: 'Expanded into manufacturing solutions' },
  { year: '2021', event: 'E-commerce Platform', description: 'Launched Olelectronic.in' },
  { year: '2023', event: 'AI Integration', description: 'Added AI edge device capabilities' },
  { year: '2025', event: 'Industry Leader', description: 'Recognized as core tech innovator' },
];

const values = [
  {
    icon: Zap,
    title: 'Innovation',
    description: 'Pushing boundaries with cutting-edge research and development',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Delivering exact solutions tailored to client requirements',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'Maintaining highest standards in every project',
  },
  {
    icon: Users,
    title: 'Accessibility',
    description: 'Making advanced technology available to all',
  },
];

const teamMembers = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Founder & CEO',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    bio: 'Visionary leader with 15+ years in electronics and IoT innovation',
    social: {
      linkedin: '#',
      github: '#',
      email: 'rajesh@olatus.com'
    }
  },
  {
    name: 'Priya Sharma',
    role: 'CTO',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Expert in embedded systems and AI edge computing solutions',
    social: {
      linkedin: '#',
      github: '#',
      email: 'priya@olatus.com'
    }
  },
  {
    name: 'Amit Verma',
    role: 'Head of R&D',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    bio: 'Leading research in next-gen PCB design and manufacturing',
    social: {
      linkedin: '#',
      github: '#',
      email: 'amit@olatus.com'
    }
  },
  {
    name: 'Sneha Patel',
    role: 'Head of Operations',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    bio: 'Streamlining processes and ensuring excellence in delivery',
    social: {
      linkedin: '#',
      github: '#',
      email: 'sneha@olatus.com'
    }
  },
  {
    name: 'Karthik Reddy',
    role: 'Lead Hardware Engineer',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
    bio: 'Specialist in IoT devices and sensor integration',
    social: {
      linkedin: '#',
      github: '#',
      email: 'karthik@olatus.com'
    }
  },
  {
    name: 'Anjali Singh',
    role: 'Lead Software Developer',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    bio: 'Full-stack developer specializing in web and mobile solutions',
    social: {
      linkedin: '#',
      github: '#',
      email: 'anjali@olatus.com'
    }
  },
  {
    name: 'Vikram Menon',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop',
    bio: 'Bridging technology and business needs for optimal solutions',
    social: {
      linkedin: '#',
      github: '#',
      email: 'vikram@olatus.com'
    }
  },
  {
    name: 'Divya Krishnan',
    role: 'Training & Education Lead',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
    bio: 'Passionate about empowering the next generation of engineers',
    social: {
      linkedin: '#',
      github: '#',
      email: 'divya@olatus.com'
    }
  },
];

const stats = [
  { number: '500+', label: 'Projects Completed' },
  { number: '100+', label: 'Industry Clients' },
  { number: '5000+', label: 'Students Trained' },
  { number: '7+', label: 'Years of Excellence' },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#000810]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-purple-500/5 to-transparent"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
              <span className="text-purple-400 text-sm font-medium">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              About <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">Olatus</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Innovating at the intersection of hardware and intelligence, leading India's Core Electronics Revolution
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="bg-[#001a24]/80 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20 text-center group hover:border-cyan-500/50 transition-all duration-300">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-white">
                Leading India's Core Electronics Revolution
              </h2>
              <p className="text-gray-300 leading-relaxed text-lg">
                Olatus is one of the first core electronics and technology companies in India,
                dedicated to bringing the nation into the mainframe silicon trade route of the world.
              </p>
              <p className="text-gray-300 leading-relaxed">
                With over 7 years of experience in research and development, embedded systems,
                IoT, AI edge devices, and web technologies, we bridge the gap between cutting-edge
                innovation and practical implementation.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our mission is to make innovations accessible by all, serving industrial clients,
                educational institutions, and aspiring engineers alike through comprehensive
                solutions and training programs.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <div key={index} className="bg-[#001a24]/80 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 group">
                      <Icon className="text-cyan-400 mb-2 group-hover:scale-110 transition-transform" size={24} />
                      <h4 className="text-white font-semibold mb-1">{value.title}</h4>
                      <p className="text-gray-400 text-xs">{value.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
              <div className="relative bg-[#001a24]/80 backdrop-blur-sm rounded-2xl p-8 border border-cyan-500/20">
                <h3 className="text-3xl font-bold text-white mb-6">Our Journey</h3>
                <div className="space-y-4">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="relative pl-8 pb-6 last:pb-0 group">
                      <div className="absolute left-0 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:scale-125 transition-transform"></div>
                      {index !== milestones.length - 1 && (
                        <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 to-purple-500/20"></div>
                      )}
                      <div className="bg-[#002E3C]/50 rounded-lg p-4 hover:bg-[#002E3C] transition-colors">
                        <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-cyan-400 font-bold text-lg">{milestone.year}</span>
                          <span className="text-white font-semibold">{milestone.event}</span>
                        </div>
                        <p className="text-gray-400 text-sm">{milestone.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-20 bg-[#001a24]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
              <span className="text-cyan-400 text-sm font-medium">Our Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet the <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">Innovators</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Passionate experts driving India's electronics revolution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="group relative bg-[#001a24]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-cyan-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4">{member.bio}</p>
                  <div className="flex gap-3">
                    <a 
                      href={member.social.linkedin} 
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={18} />
                    </a>
                    <a 
                      href={member.social.github} 
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={18} />
                    </a>
                    <a 
                      href={`mailto:${member.social.email}`} 
                      className="text-gray-400 hover:text-cyan-400 transition-colors"
                      aria-label="Email"
                    >
                      <Mail size={18} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-cyan-500/20">
              <div className="text-cyan-400 text-5xl mb-4">🎯</div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To empower India's technological ecosystem by providing world-class electronics solutions,
                comprehensive training programs, and innovative products that bridge the gap between 
                research and practical implementation. We aim to make cutting-edge technology accessible 
                to everyone.
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl p-8 border border-purple-500/20">
              <div className="text-purple-400 text-5xl mb-4">🚀</div>
              <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To position India as a global leader in core electronics and silicon technology, 
                creating a robust ecosystem that fosters innovation, supports local manufacturing, 
                and develops the next generation of electronics engineers and entrepreneurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-12 border border-cyan-500/20 text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Build the Future Together?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
              Join us in our mission to make India a global leader in electronics and technology innovation
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105">
                Partner With Us
              </button>
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105">
                Join Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Slider */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BrandSlider />
        </div>
      </section>

      <Footer />
      <FloatingBot />
    </div>
  );
};

export default AboutPage;
