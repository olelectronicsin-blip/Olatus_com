import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe,
  Cpu,
  Package,
  Box,
  CircuitBoard,
  FlaskConical,
} from 'lucide-react';

const services = [
  {
    icon: CircuitBoard,
    title: 'PCB Manufacturing',
    description: 'Complete PCB design, fabrication, and assembly services',
    details: [
      'Single & multi-layer PCB',
      'SMD & Through-hole assembly',
      'Custom PCB design',
      'Fast prototyping & bulk orders',
    ],
    gradient: 'from-cyan-500 to-blue-500',
    link: '/pcb-manufacturing',
  },
  {
    icon: Box,
    title: 'Online 3D Printing',
    description: 'Rapid prototyping and 3D printing solutions',
    details: [
      'FDM & SLA printing',
      'Concept-to-prototype design',
      'Material exploration',
      'Fast turnaround time',
    ],
    gradient: 'from-green-500 to-emerald-500',
    link: '/online-3d-printing',
  },
  {
    icon: Package,
    title: 'Product Development',
    description: 'End-to-end product engineering and manufacturing',
    details: [
      'Research-driven development',
      'Hardware-software integration',
      'Customized solutions',
      'Production-ready design',
    ],
    gradient: 'from-orange-500 to-red-500',
    link: '/product-development',
  },
  {
    icon: FlaskConical,
    title: 'Technology Lab Setup',
    description: 'Complete lab solutions for educational institutions',
    details: [
      'ATL & STEM labs',
      'Robotics & IoT labs',
      'Setup & training',
      'Ongoing support',
    ],
    gradient: 'from-purple-500 to-pink-500',
    link: '/technology-lab',
  },
  {
    icon: Globe,
    title: 'IT Services & Development',
    description: 'Modern websites and web applications',
    details: [
      'React & TypeScript',
      'E-commerce solutions',
      'Cloud-based systems',
      'Responsive design',
    ],
    gradient: 'from-blue-500 to-cyan-500',
    link: '/web-development',
  },
  {
    icon: Cpu,
    title: 'Embedded Systems & Software',
    description: 'IoT systems and embedded firmware development',
    details: [
      'Firmware development',
      'IoT & AI edge devices',
      'Real-time systems',
      'Hardware integration',
    ],
    gradient: 'from-pink-500 to-purple-600',
    link: '/embedded-software',
  },
];

const Services = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleServiceClick = (link: string) => {
    navigate(link);
    window.scrollTo(0, 0);
  };

  return (
    <section id="services" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 mb-4">
            <span className="text-cyan-400 text-sm font-medium">What We Do</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Our <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-transparent bg-clip-text">Services</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Bringing India into the mainframe silicon trade route through cutting-edge technology solutions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group relative cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleServiceClick(service.link)}
              >
                <div className={`
                  relative h-full bg-[#001a24]/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20
                  transition-all duration-500 transform
                  ${hoveredIndex === index ? 'scale-105 shadow-2xl' : 'scale-100'}
                `}>
                  <div className={`
                    absolute inset-0 rounded-xl bg-gradient-to-br ${service.gradient} opacity-0
                    transition-opacity duration-500
                    ${hoveredIndex === index ? 'opacity-10' : 'opacity-0'}
                  `}></div>

                  <div className="relative z-10">
                    <div className={`
                      w-16 h-16 rounded-lg bg-gradient-to-br ${service.gradient}
                      flex items-center justify-center mb-4
                      transition-transform duration-500
                      ${hoveredIndex === index ? 'rotate-12 scale-110' : 'rotate-0 scale-100'}
                    `}>
                      <Icon className="text-white" size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-gray-400 text-sm mb-4">
                      {service.description}
                    </p>

                    <ul className="space-y-2">
                      {service.details.map((detail, i) => (
                        <li key={i} className="text-gray-500 text-xs flex items-start gap-2">
                          <span className={`mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient} flex-shrink-0`}></span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 pt-4 border-t border-cyan-500/20">
                      <div className="text-cyan-400 text-sm font-semibold group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                        Learn More
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
