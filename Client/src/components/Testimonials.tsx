import { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
    {
        id: 1,
        name: 'Rajesh Kumar',
        role: 'CTO',
        company: 'TechVision India',
        image: 'https://ui-avatars.com/api/?name=Rajesh+Kumar&background=0ea5e9&color=fff&size=128',
        rating: 5,
        text: 'Olatus transformed our product development cycle. Their PCB manufacturing and embedded systems expertise helped us launch our IoT product 3 months ahead of schedule. Exceptional quality and support!',
    },
    {
        id: 2,
        name: 'Dr. Priya Sharma',
        role: 'Director',
        company: 'STEM Education Foundation',
        image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=8b5cf6&color=fff&size=128',
        rating: 5,
        text: 'The ATL Robotics Lab setup by Olatus has been a game-changer for our institution. Over 5000 students have benefited from their world-class equipment and training programs. Highly recommended!',
    },
    {
        id: 3,
        name: 'Amit Patel',
        role: 'Founder & CEO',
        company: 'SmartAgri Solutions',
        image: 'https://ui-avatars.com/api/?name=Amit+Patel&background=ec4899&color=fff&size=128',
        rating: 5,
        text: 'From concept to production, Olatus has been our trusted partner. Their product development team delivered a complex agricultural IoT system with precision. The 24-hour prototyping service is incredible!',
    },
    {
        id: 4,
        name: 'Sarah Williams',
        role: 'Head of Innovation',
        company: 'GreenTech Ventures',
        image: 'https://ui-avatars.com/api/?name=Sarah+Williams&background=10b981&color=fff&size=128',
        rating: 5,
        text: 'Outstanding web and mobile app development! Olatus built our entire digital ecosystem from scratch. Their attention to detail and modern tech stack exceeded our expectations. 100% satisfied!',
    },
    {
        id: 5,
        name: 'Vikram Singh',
        role: 'Engineering Manager',
        company: 'AutoTech Industries',
        image: 'https://ui-avatars.com/api/?name=Vikram+Singh&background=f97316&color=fff&size=128',
        rating: 5,
        text: 'The embedded software solutions from Olatus powered our vehicle tracking system serving 10,000+ vehicles. Their firmware development and ongoing support have been flawless. True professionals!',
    },
];

const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [isAutoPlaying]);

    const handlePrevious = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const handleNext = () => {
        setIsAutoPlaying(false);
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const currentTestimonial = testimonials[currentIndex];

    return (
        <section id="testimonials" className="relative py-20 overflow-hidden">
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 mb-4">
                        <span className="text-purple-400 text-sm font-medium">Client Success Stories</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        What Our <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">Clients Say</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join 100+ satisfied clients who trust Olatus for their technology needs
                    </p>
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Main Testimonial Card */}
                    <div className="relative bg-[#001a24]/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-cyan-500/20 overflow-hidden">
                        {/* Decorative gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />

                        {/* Quote icon */}
                        <div className="absolute top-8 right-8 opacity-10">
                            <Quote size={80} className="text-cyan-400" />
                        </div>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentTestimonial.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                                className="relative z-10"
                            >
                                {/* Rating */}
                                <div className="flex gap-1 mb-6 justify-center md:justify-start">
                                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                                        <Star key={i} size={20} className="text-yellow-400 fill-yellow-400" />
                                    ))}
                                </div>

                                {/* Testimonial Text */}
                                <blockquote className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 italic">
                                    "{currentTestimonial.text}"
                                </blockquote>

                                {/* Author Info */}
                                <div className="flex items-center gap-4">
                                    <img
                                        src={currentTestimonial.image}
                                        alt={currentTestimonial.name}
                                        className="w-16 h-16 rounded-full border-2 border-cyan-500/30"
                                    />
                                    <div>
                                        <div className="text-white font-semibold text-lg">{currentTestimonial.name}</div>
                                        <div className="text-cyan-400 text-sm">{currentTestimonial.role}</div>
                                        <div className="text-gray-400 text-sm">{currentTestimonial.company}</div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <button
                            onClick={handlePrevious}
                            className="w-12 h-12 rounded-full bg-[#001a24]/80 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center"
                            aria-label="Previous testimonial"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="flex gap-2">
                            {testimonials.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => {
                                        setIsAutoPlaying(false);
                                        setCurrentIndex(index);
                                    }}
                                    className={`transition-all duration-300 rounded-full ${index === currentIndex
                                            ? 'w-8 h-2 bg-gradient-to-r from-cyan-400 to-purple-500'
                                            : 'w-2 h-2 bg-gray-600 hover:bg-gray-500'
                                        }`}
                                    aria-label={`Go to testimonial ${index + 1}`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={handleNext}
                            className="w-12 h-12 rounded-full bg-[#001a24]/80 backdrop-blur-sm border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all duration-300 flex items-center justify-center"
                            aria-label="Next testimonial"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Auto-play indicator */}
                    {isAutoPlaying && (
                        <div className="text-center mt-4">
                            <span className="text-gray-500 text-xs">Auto-playing • Click arrows to pause</span>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
