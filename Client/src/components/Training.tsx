import { useState } from 'react';
import { Code, Cpu, Bot, Wrench, CircuitBoard, GraduationCap, Calendar, Award, Users } from 'lucide-react';

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

const Training = () => {
  const [selectedProgram, setSelectedProgram] = useState<number | null>(null);

  return (
    <section id="training" className="relative py-24 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-4">
            <span className="text-orange-400 text-sm font-medium">Learn & Grow</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
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
                className={`
                  group relative cursor-pointer
                  transition-all duration-500 transform
                  ${isSelected ? 'scale-105' : 'scale-100 hover:scale-102'}
                `}
                onClick={() => setSelectedProgram(isSelected ? null : index)}
              >
                <div className="relative h-full bg-[#001a24]/80 backdrop-blur-sm rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300">
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${program.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500
                  `}></div>

                  <div className="relative z-10 p-6">
                    <div className={`
                      w-16 h-16 rounded-lg bg-gradient-to-br ${program.gradient}
                      flex items-center justify-center mb-4
                      transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110
                    `}>
                      <Icon className="text-white" size={32} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {program.title}
                    </h3>

                    <div className="flex items-center gap-4 mb-4 text-sm">
                      <span className="text-cyan-400 font-semibold">{program.duration}</span>
                      <span className="text-gray-400">{program.level}</span>
                    </div>

                    <div className="space-y-2 mb-6">
                      {program.topics.map((topic, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${program.gradient}`}></div>
                          <span className="text-gray-400 text-sm">{topic}</span>
                        </div>
                      ))}
                    </div>

                    <button className={`
                      w-full py-3 rounded-lg font-semibold transition-all duration-300
                      ${isSelected
                        ? 'bg-gradient-to-r ' + program.gradient + ' text-white shadow-lg'
                        : 'bg-transparent border-2 border-cyan-500/30 text-cyan-400 hover:border-cyan-500/50'
                      }
                    `}>
                      {isSelected ? 'Program Selected' : 'Learn More'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-2xl p-8 md:p-12 border border-orange-500/20">
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

            <div className="bg-[#001a24]/80 backdrop-blur-sm rounded-xl p-6 border border-cyan-500/20">
              <h4 className="text-xl font-bold text-white mb-4">Application Form</h4>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
                <select className="w-full px-4 py-3 bg-[#002E3C] border border-cyan-500/20 rounded-lg text-white focus:outline-none focus:border-cyan-500/50 transition-colors">
                  <option value="">Select Program</option>
                  {trainingPrograms.map((program, i) => (
                    <option key={i} value={program.title}>{program.title}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
                >
                  Apply Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Training;
