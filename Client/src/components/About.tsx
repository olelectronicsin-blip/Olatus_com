import { Zap, Target, Award, Users } from 'lucide-react';
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

const About = () => {
  return (
    <section id="about" className="relative py-12 sm:py-16 md:py-20 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
            <span className="text-purple-400 text-sm font-medium">Our Story</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">Olatus</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Innovating at the intersection of hardware and intelligence
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-white">
              Leading India's Core Electronics Revolution
            </h3>
            <p className="text-gray-300 leading-relaxed">
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
              <h4 className="text-2xl font-bold text-white mb-6">Our Journey</h4>
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

        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-8 border border-cyan-500/20">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Build the Future Together?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Join us in our mission to make India a global leader in electronics and technology innovation
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105">
              Partner With Us
            </button>
          </div>
        </div>

        <BrandSlider />
      </div>
    </section>
  );
};

export default About;
