import { useState } from 'react';
import { Lightbulb, Factory, ShoppingBag, GraduationCap, Home, Car, ExternalLink, LucideIcon } from 'lucide-react';
import CaseStudy from './CaseStudy';

interface Project {
  icon: LucideIcon;
  title: string;
  category: string;
  description: string;
  image: string;
  stats: Record<string, string>;
  client?: string;
  location?: string;
  duration?: string;
  team?: string;
  challenge?: string;
  solution?: string;
  results?: string[];
  technologies?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
  };
}

const projects: Project[] = [
  {
    icon: ShoppingBag,
    title: 'Smart Vending Machine',
    category: 'IoT & Automation',
    description: 'AI-powered vending solution with inventory management and cashless payment integration',
    image: 'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?w=800&h=600&fit=crop',
    stats: { clients: '15+', uptime: '99.9%', transactions: '50K+' },
    client: 'RetailTech Solutions',
    location: 'Mumbai, Maharashtra',
    duration: '6 months',
    team: '5 Engineers',
    challenge: 'Traditional vending machines faced issues with cash handling, inventory tracking, and limited payment options. Our client needed a modern solution that could operate 24/7 with minimal human intervention while providing real-time analytics.',
    solution: 'We developed an IoT-enabled smart vending machine with AI-powered inventory management, multiple payment options (UPI, cards, digital wallets), real-time monitoring dashboard, and predictive analytics for stock replenishment. The system uses computer vision for product recognition and automated dispensing.',
    results: [
      'Reduced operational costs by 40% through automated inventory management',
      'Increased sales by 65% with cashless payment integration',
      'Achieved 99.9% uptime with remote monitoring and diagnostics',
      'Processed over 50,000 transactions with zero payment failures',
      'Reduced stock-out incidents by 80% with predictive analytics',
      'Decreased maintenance time by 50% through IoT-based alerts'
    ],
    technologies: ['Raspberry Pi', 'Python', 'TensorFlow', 'MQTT', 'AWS IoT', 'React Dashboard', 'Payment Gateway APIs', 'OpenCV'],
    testimonial: {
      text: 'Olatus transformed our vending business completely. The smart vending machines have exceeded our expectations in terms of reliability and customer satisfaction. The real-time analytics help us make data-driven decisions.',
      author: 'Rajesh Kumar',
      position: 'CEO, RetailTech Solutions'
    }
  },
  {
    icon: Factory,
    title: 'Industrial Automation System',
    category: 'Embedded Systems',
    description: 'Complete factory automation with real-time monitoring, predictive maintenance, and analytics',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    stats: { factories: '8', efficiency: '+45%', savings: '₹2Cr+' },
    client: 'Manufacturing Corp India',
    location: 'Pune, Maharashtra',
    duration: '12 months',
    team: '8 Engineers',
    challenge: 'The manufacturing facility was experiencing frequent equipment downtime, inefficient production processes, and lack of real-time visibility into operations. Manual monitoring led to delayed responses and production losses averaging ₹50 lakhs per month.',
    solution: 'We implemented a comprehensive Industrial IoT solution with sensor networks across all production lines, a centralized SCADA system for real-time monitoring, machine learning algorithms for predictive maintenance, automated quality control systems, and an analytics dashboard for production optimization.',
    results: [
      'Increased overall equipment efficiency by 45%',
      'Reduced unplanned downtime by 70%',
      'Saved ₹2 Crore+ annually in operational costs',
      'Improved product quality with 99.5% defect detection rate',
      'Decreased energy consumption by 30%',
      'Achieved ROI within 8 months of deployment'
    ],
    technologies: ['PLCs (Siemens)', 'SCADA', 'Industrial IoT Sensors', 'Python', 'Machine Learning', 'Edge Computing', 'InfluxDB', 'Grafana', 'OPC-UA'],
    testimonial: {
      text: 'The automation system by Olatus has revolutionized our manufacturing operations. We now have complete visibility and control over our production lines. The predictive maintenance alone has saved us millions in potential losses.',
      author: 'Priya Sharma',
      position: 'Operations Director, Manufacturing Corp India'
    }
  },
  {
    icon: Lightbulb,
    title: 'IoT Smart Lighting',
    category: 'Smart Cities',
    description: 'Energy-efficient street lighting system with adaptive brightness and remote control',
    image: 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop',
    stats: { lights: '1000+', energy: '-60%', cities: '3' },
    client: 'Smart City Initiative',
    location: 'Multiple Cities, India',
    duration: '9 months',
    team: '6 Engineers',
    challenge: 'Municipal corporations were struggling with high energy costs from street lighting, frequent maintenance issues, and inability to monitor lighting infrastructure. Traditional systems operated at full brightness regardless of actual need, wasting significant energy.',
    solution: 'We deployed IoT-enabled smart street lights with adaptive brightness control based on ambient light and motion detection, centralized monitoring and control system, automated fault detection and reporting, energy consumption analytics, and integration with existing city infrastructure.',
    results: [
      'Reduced energy consumption by 60% through adaptive lighting',
      'Decreased maintenance costs by 55% with predictive alerts',
      'Achieved 99% uptime across all installations',
      'Reduced carbon footprint by 500 tons CO2 annually',
      'Saved ₹1.2 Crore in electricity costs per year',
      'Improved response time to faults from 48 hours to 2 hours'
    ],
    technologies: ['LoRaWAN', 'Smart LED Controllers', 'Node.js', 'MongoDB', 'Cloud Platform', 'Mobile App', 'Light Sensors', 'Motion Detectors'],
    testimonial: {
      text: 'The smart lighting solution has transformed our city infrastructure. Not only are we saving energy and costs, but we can also monitor and control every light remotely. It is a game-changer for urban management.',
      author: 'Dr. Anil Mehta',
      position: 'Smart City Project Director'
    }
  },
  {
    icon: GraduationCap,
    title: 'ATL Robotics Lab',
    category: 'Education',
    description: 'Complete Atal Tinkering Lab setup with robotics kits, training modules, and mentorship',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
    stats: { schools: '25+', students: '5000+', projects: '500+' },
    client: 'Education Department',
    location: 'Pan India',
    duration: '18 months (Ongoing)',
    team: '12 Trainers & Engineers',
    challenge: 'Schools lacked proper infrastructure and expertise to teach modern technologies like robotics, AI, and IoT to students. Teachers needed training, and students required hands-on learning experiences with industry-standard tools.',
    solution: 'We established complete Atal Tinkering Labs with robotics kits, 3D printers, electronics components, and IoT devices. Provided comprehensive training programs for teachers, developed curriculum-aligned project modules, conducted regular workshops and competitions, and offered ongoing mentorship to students.',
    results: [
      'Successfully set up 25+ ATL labs across India',
      'Trained 5000+ students in robotics and emerging technologies',
      'Mentored 500+ innovative student projects',
      'Achieved 90% student engagement rate',
      'Trained 100+ teachers in STEM education',
      'Students won 15+ national level competitions'
    ],
    technologies: ['Arduino', 'Raspberry Pi', '3D Printing', 'Robotics Kits', 'IoT Sensors', 'MIT App Inventor', 'Scratch Programming', 'CAD Software'],
    testimonial: {
      text: 'Olatus has made a profound impact on our students. The hands-on learning approach and expert mentorship have ignited a passion for technology in our children. We have seen remarkable projects and innovations from our students.',
      author: 'Mrs. Sunita Desai',
      position: 'Principal, Modern High School'
    }
  },
  {
    icon: Home,
    title: 'Smart Home Ecosystem',
    category: 'IoT',
    description: 'Integrated home automation with voice control, energy monitoring, and security features',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=600&fit=crop',
    stats: { homes: '50+', devices: '200+', satisfaction: '4.8/5' },
    client: 'Luxury Homes Group',
    location: 'Bangalore, Karnataka',
    duration: '8 months',
    team: '7 Engineers',
    challenge: 'Homeowners wanted a unified smart home solution that could integrate various devices, provide energy savings, enhance security, and offer intuitive control. Existing solutions were fragmented and difficult to use.',
    solution: 'We created a comprehensive smart home ecosystem with unified control through mobile app and voice assistants, automated lighting, climate control, and security systems, energy monitoring and optimization, AI-powered automation based on user patterns, and seamless integration with popular smart devices.',
    results: [
      'Deployed in 50+ premium homes',
      'Integrated 200+ smart devices per home on average',
      'Reduced energy consumption by 35%',
      'Achieved 4.8/5 customer satisfaction rating',
      'Decreased security response time by 80%',
      'Saved homeowners average ₹15,000/month on utilities'
    ],
    technologies: ['Home Assistant', 'Zigbee', 'Z-Wave', 'MQTT', 'Node-RED', 'Alexa Integration', 'Google Home', 'Mobile App (React Native)', 'AI/ML'],
    testimonial: {
      text: 'Living in a home automated by Olatus feels futuristic. Everything works seamlessly, and the energy savings are significant. The voice control and automated scenes make daily life so much easier.',
      author: 'Vikram Patel',
      position: 'Homeowner'
    }
  },
  {
    icon: Car,
    title: 'Vehicle Tracking System',
    category: 'GPS & IoT',
    description: 'Real-time fleet management with route optimization, fuel monitoring, and driver analytics',
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&h=600&fit=crop',
    stats: { vehicles: '300+', distance: '5M km', clients: '20+' },
    client: 'LogiTrack Solutions',
    location: 'Delhi NCR',
    duration: '10 months',
    team: '9 Engineers',
    challenge: 'Fleet operators were facing challenges with vehicle tracking, fuel theft, driver behavior monitoring, and route inefficiencies. Lack of real-time visibility led to delayed deliveries and increased operational costs.',
    solution: 'We developed a complete fleet management system with GPS tracking devices installed in all vehicles, real-time location monitoring dashboard, geofencing and route optimization, fuel monitoring and theft detection, driver behavior analytics (speed, braking, idling), automated alerts and notifications, and comprehensive reporting.',
    results: [
      'Tracking 300+ vehicles across 20+ clients',
      'Monitored 5 million kilometers of travel',
      'Reduced fuel costs by 25% through better monitoring',
      'Improved on-time deliveries by 40%',
      'Decreased accidents by 35% with driver behavior tracking',
      'Saved clients average ₹2.5 lakhs per vehicle annually'
    ],
    technologies: ['GPS Modules', 'GSM/4G', 'Web Dashboard (React)', 'Node.js', 'MongoDB', 'Google Maps API', 'Mobile App', 'Real-time Analytics', 'Cloud Infrastructure'],
    testimonial: {
      text: 'The vehicle tracking system has given us complete control over our fleet. We can now track every vehicle in real-time, optimize routes, and monitor driver behavior. The ROI has been exceptional.',
      author: 'Amit Singh',
      position: 'Fleet Manager, LogiTrack Solutions'
    }
  },
];

const Projects = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCaseStudyOpen, setIsCaseStudyOpen] = useState(false);

  const handleViewCaseStudy = (project: Project) => {
    setSelectedProject(project);
    setIsCaseStudyOpen(true);
  };

  const handleCloseCaseStudy = () => {
    setIsCaseStudyOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <section id="projects" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-4">
            <span className="text-pink-400 text-sm font-medium">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">Projects</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Transforming ideas into reality with innovative technology solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const Icon = project.icon;
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleViewCaseStudy(project)}
              >
                <div className={`
                  relative h-full bg-[#001a24]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20
                  transition-all duration-500 transform
                  ${isHovered ? 'scale-105 shadow-2xl border-cyan-500/50' : 'scale-100'}
                `}>
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`
                      absolute inset-0 bg-gradient-to-b from-black/50 to-black/70
                      transition-all duration-500
                      ${isHovered ? 'opacity-40' : 'opacity-60'}
                    `}></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`
                        w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center
                        transition-all duration-500
                        ${isHovered ? 'scale-125 rotate-12' : 'scale-100 rotate-0'}
                      `}>
                        <Icon className="text-white" size={40} />
                      </div>
                    </div>

                    <div className={`
                      absolute inset-0 flex items-center justify-center bg-black/60
                      transition-all duration-500
                      ${isHovered ? 'opacity-100' : 'opacity-0'}
                    `}>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewCaseStudy(project);
                        }}
                        className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-cyan-400 transition-colors flex items-center gap-2"
                      >
                        View Case Study
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-3">
                      <span className="text-cyan-400 text-xs font-medium">{project.category}</span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cyan-500/20">
                      {Object.entries(project.stats).map(([key, value], i) => (
                        <div key={i} className="text-center">
                          <div className="text-cyan-400 font-bold text-sm">{value}</div>
                          <div className="text-gray-500 text-xs capitalize">{key}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Modal */}
      {selectedProject && (
        <CaseStudy
          isOpen={isCaseStudyOpen}
          onClose={handleCloseCaseStudy}
          project={selectedProject}
        />
      )}
    </section>
  );
};

export default Projects;
