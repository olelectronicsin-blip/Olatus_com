import { X, Calendar, MapPin, Users, TrendingUp, Award, CheckCircle, ArrowRight, LucideIcon } from 'lucide-react';

interface CaseStudyProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    category: string;
    description: string;
    image: string;
    stats: Record<string, string>;
    icon: LucideIcon;
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
    gallery?: string[];
  };
}

const CaseStudy = ({ isOpen, onClose, project }: CaseStudyProps) => {
  if (!isOpen) return null;

  const Icon = project.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-gradient-to-br from-[#001a24] to-[#002a3a] rounded-2xl shadow-2xl overflow-hidden border border-cyan-500/30">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors backdrop-blur-sm"
        >
          <X className="text-white" size={24} />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          {/* Hero Section */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#001a24]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-4">
                <Icon className="text-white" size={40} />
              </div>
              <div className="inline-block px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/50 mb-3">
                <span className="text-cyan-400 text-sm font-medium">{project.category}</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-gray-300 text-lg max-w-2xl">{project.description}</p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-10">
            {/* Project Info Grid */}
            <div className="grid md:grid-cols-4 gap-4 mb-10">
              {project.client && (
                <div className="bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                  <Users className="text-cyan-400 mb-2" size={24} />
                  <div className="text-gray-400 text-sm">Client</div>
                  <div className="text-white font-semibold">{project.client}</div>
                </div>
              )}
              {project.location && (
                <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
                  <MapPin className="text-purple-400 mb-2" size={24} />
                  <div className="text-gray-400 text-sm">Location</div>
                  <div className="text-white font-semibold">{project.location}</div>
                </div>
              )}
              {project.duration && (
                <div className="bg-pink-500/5 border border-pink-500/20 rounded-lg p-4">
                  <Calendar className="text-pink-400 mb-2" size={24} />
                  <div className="text-gray-400 text-sm">Duration</div>
                  <div className="text-white font-semibold">{project.duration}</div>
                </div>
              )}
              {project.team && (
                <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-4">
                  <Users className="text-green-400 mb-2" size={24} />
                  <div className="text-gray-400 text-sm">Team Size</div>
                  <div className="text-white font-semibold">{project.team}</div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {Object.entries(project.stats).map(([key, value], i) => (
                <div key={i} className="text-center p-6 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
                  <TrendingUp className="text-cyan-400 mx-auto mb-2" size={32} />
                  <div className="text-3xl font-bold text-white mb-1">{value}</div>
                  <div className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>

            {/* Challenge */}
            {project.challenge && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Award className="text-cyan-400" size={28} />
                  The Challenge
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg bg-red-500/5 border-l-4 border-red-500 p-6 rounded-r-lg">
                  {project.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.solution && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle className="text-green-400" size={28} />
                  Our Solution
                </h3>
                <p className="text-gray-300 leading-relaxed text-lg bg-green-500/5 border-l-4 border-green-500 p-6 rounded-r-lg">
                  {project.solution}
                </p>
              </div>
            )}

            {/* Technologies */}
            {project.technologies && project.technologies.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full text-cyan-300 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Results */}
            {project.results && project.results.length > 0 && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <TrendingUp className="text-pink-400" size={28} />
                  Results & Impact
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.results.map((result, i) => (
                    <div key={i} className="flex items-start gap-3 bg-cyan-500/5 border border-cyan-500/20 rounded-lg p-4">
                      <CheckCircle className="text-green-400 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-300">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-white mb-4">Client Testimonial</h3>
                <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6 md:p-8">
                  <div className="text-6xl text-purple-400/30 mb-4">"</div>
                  <p className="text-gray-300 text-lg italic leading-relaxed mb-6">
                    {project.testimonial.text}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
                      {project.testimonial.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{project.testimonial.author}</div>
                      <div className="text-gray-400 text-sm">{project.testimonial.position}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
                Start Your Project
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 26, 36, 0.5);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(34, 211, 238, 0.3);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(34, 211, 238, 0.5);
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default CaseStudy;
