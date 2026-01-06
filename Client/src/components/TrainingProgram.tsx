import { useParams, useNavigate } from 'react-router-dom';
import {
    Code,
    Cpu,
    Bot,
    Wrench,
    CircuitBoard,
    GraduationCap,
    CheckCircle,
    Clock,
    Award,
    ArrowLeft,
    BookOpen,
    Target
} from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

import { submitInternshipApplication } from '../lib/serviceApi';

// Define the data for all programs here or import it
// Define the data for all programs here
const programsData: Record<string, any> = {
    'web-development': {
        title: 'Web Development Workshop',
        icon: Code,
        gradient: 'from-blue-500 to-cyan-500',
        duration: '2 Days',
        level: 'Beginner Friendly',
        description: 'A 2-day hands-on workshop to build your first full-stack application. No prior experience required. You will build a Personal Portfolio and a Live Chat App.',
        syllabus: [
            {
                module: 'Day 1: Frontend Fundamentals',
                topics: ['HTML5 & CSS3 Crash Course', 'Building Responsive Layouts', 'JavaScript Essentials', 'Introduction to React.js']
            },
            {
                module: 'Day 2: Backend & Deployment',
                topics: ['Node.js & Express Setup', 'Connecting to MongoDB', 'Building APIs', 'Hosting your App Live']
            }
        ],
        outcomes: [
            'Build a deployed web application',
            'Understand how the web works',
            'Get Certificate of Participation',
            'Learn industry-standard tools'
        ]
    },
    'iot-embedded-systems': {
        title: 'IoT Bootcamp',
        icon: Cpu,
        gradient: 'from-purple-500 to-pink-500',
        duration: '2 Days',
        level: 'Beginner Friendly',
        description: 'Learn to control the physical world with code. In this 2-day bootcamp, you will work with ESP32 microcontrollers to build a Smart Home System.',
        syllabus: [
            {
                module: 'Day 1: Hardware Basics',
                topics: ['Microcontrollers vs Microprocessors', 'Sensors & Actuators (DHT11, Relays)', 'Arduino Programming Basics', 'Interfacing Logic']
            },
            {
                module: 'Day 2: IoT & Cloud',
                topics: ['Connecting to Wi-Fi', 'Sending Data to Cloud (Blynk/ThinkSpeak)', 'Controlling Appliances from Phone', 'Voice Control Integration']
            }
        ],
        outcomes: [
            'Build a working Smart Home Prototype',
            'Program ESP32/NodeMCU',
            'Understand IoT Architecture',
            'Take home your hardware kit (optional)'
        ]
    },
    'robotics-automation': {
        title: 'Robotics Workshop',
        icon: Bot,
        gradient: 'from-orange-500 to-red-500',
        duration: '2 Days',
        level: 'Beginner Friendly',
        description: 'Build your first robot! This workshop covers the mechanics and electronics behind autonomous machines. You will build a Line Follower and Obstacle Avoider.',
        syllabus: [
            {
                module: 'Day 1: Robot Mechanics',
                topics: ['Chassis Assembly & Motors', 'Motor Drivers (L298N)', 'Power Supply & Batteries', 'Arduino Board Setup']
            },
            {
                module: 'Day 2: Sensors & Programming',
                topics: ['IR Sensors logic', 'Ultrasonic Sensors for Distance', 'Programming Obstacle Avoidance', 'Line Following Algorithm']
            }
        ],
        outcomes: [
            'Assemble a physical robot',
            'Write Logic for Autonomy',
            'Debug Hardware Issues',
            'Race your robot in the arena'
        ]
    },
    'ai-machine-learning': {
        title: 'AI/ML Crash Course',
        icon: Wrench,
        gradient: 'from-green-500 to-emerald-500',
        duration: '2 Days',
        level: 'Beginner Friendly',
        description: 'Demystify Artificial Intelligence. Learn how machines learn by building a Face Recognition system using Python.',
        syllabus: [
            {
                module: 'Day 1: Python for Data',
                topics: ['Python Syntax Refresher', 'Handling Data with Pandas', 'Visualizing Trends with Matplotlib', 'Basic Statistics']
            },
            {
                module: 'Day 2: Building Models',
                topics: ['Computer Vision with OpenCV', 'Detecting Faces & Objects', 'Training a Simple Classifier', 'Deploying the Model']
            }
        ],
        outcomes: [
            'Create a Face Recognition App',
            'Understand ML Pipelines',
            'Use Python for Automation',
            'Certificate of Completion'
        ]
    },
    'pcb-design': {
        title: 'PCB Design Workshop',
        icon: CircuitBoard,
        gradient: 'from-cyan-500 to-blue-600',
        duration: '2 Days',
        level: 'Beginner Friendly',
        description: 'Design your own Circuit Board. Learn industry-standard KiCad software and understand how electronics are manufactured.',
        syllabus: [
            {
                module: 'Day 1: Schematic Capture',
                topics: ['Electronics Theory Refresher', 'Reading Datasheets', 'Drawing Schematics in KiCad', 'Assigning Footprints']
            },
            {
                module: 'Day 2: Layout & Routing',
                topics: ['Placing Components', 'Routing Tracks', 'Generating Gerber Files', 'Ordering your PCB']
            }
        ],
        outcomes: [
            'Design a custom PCB',
            'Generate Manufacturing Files',
            'Learn SMD vs THT tech',
            '3D Render your board'
        ]
    },
    'product-development': {
        title: 'Product Dev Workshop',
        icon: GraduationCap,
        gradient: 'from-pink-500 to-purple-600',
        duration: '2 Days',
        level: 'Beginner Friendly',
        description: 'From Idea to 3D Print. Learn how to design products using CAD software and 3D printing technology.',
        syllabus: [
            {
                module: 'Day 1: CAD Design',
                topics: ['Intro to Fusion 360', 'Sketching & Extruding', 'Designing Enclosures', 'Assembly Basics']
            },
            {
                module: 'Day 2: Prototyping',
                topics: ['Exporting for 3D Printing', 'Slicing Software (Cura)', 'Printing Materials (PLA/ABS)', 'Post-processing']
            }
        ],
        outcomes: [
            'Create 3D CAD Models',
            'Understand 3D Printing',
            'Design functional parts',
            'Rapid Prototyping workflow'
        ]
    }
};

const TrainingProgram = () => {
    const { programId } = useParams();
    const navigate = useNavigate();

    const [showApplyModal, setShowApplyModal] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const program = programsData[programId || ''];

    if (!program) {
        return (
            <div className="min-h-screen bg-[#001a24] flex items-center justify-center text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Program Not Found</h2>
                    <button
                        onClick={() => navigate('/careers')}
                        className="px-6 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-700 transition"
                    >
                        Back to Careers
                    </button>
                </div>
            </div>
        );
    }

    const Icon = program.icon;

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);
        try {
            // Reusing the internship submission API for training as well for now
            // Or map to a specific training inquiry type
            await submitInternshipApplication({
                fullName,
                email,
                phone,
                position: 'TRAINING_INQUIRY', // Or similar enum if exists, or just reuse internship enum if acceptable
                education: program.title, // Using education field to store program name for context
                skills: [],
            });
            setSubmitSuccess('Application submitted successfully! Our team will contact you shortly.');
            setTimeout(() => {
                setShowApplyModal(false);
                setSubmitSuccess(null);
                setFullName('');
                setEmail('');
                setPhone('');
            }, 2000);
        } catch (err: any) {
            setSubmitError(err.message || 'Failed to submit application.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#001a24] text-gray-300 relative overflow-hidden font-sans">
            {/* Background Image & Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <img
                    src="/assets/tech_workshop_bg.png"
                    alt="Background"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#001a24]/95 via-[#001a24]/80 to-[#001a24]/95" />

                {/* Tech Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage: `linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20">
                <div className={`absolute inset-0 bg-gradient-to-b ${program.gradient} opacity-5`}></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <button
                        onClick={() => navigate('/careers')}
                        className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-8 transition-colors group"
                    >
                        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Workshops
                    </button>

                    <div className="flex flex-col md:flex-row items-center gap-12">
                        <div className="relative group">
                            <div className={`absolute inset-0 bg-gradient-to-br ${program.gradient} blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></div>
                            <div className={`relative p-10 rounded-3xl bg-[#002E3C]/80 backdrop-blur-xl border border-white/10 shadow-2xl skew-x-1`}>
                                <Icon size={80} className="text-white drop-shadow-lg" />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-semibold mb-6">
                                <Target size={14} />
                                {program.level}
                            </div>

                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                                {program.title}
                            </h1>

                            <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0 font-light">
                                {program.description}
                            </p>

                            <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm font-bold text-white">
                                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <Clock className="text-cyan-400" size={20} />
                                    {program.duration}
                                </div>
                                <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-xl border border-white/10 backdrop-blur-sm">
                                    <Award className="text-purple-400" size={20} />
                                    Certificate of Completion
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section: Timeline & Outcomes */}
            <section className="py-24 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-12 gap-16">

                        {/* Main Content: Agenda Timeline */}
                        <div className="lg:col-span-8">
                            <h2 className="text-3xl font-bold text-white flex items-center gap-3 mb-10">
                                <BookOpen className="text-cyan-400" />
                                Workshop Schedule
                            </h2>

                            <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-cyan-500/20 before:to-transparent">
                                {program.syllabus.map((unit: any, idx: number) => (
                                    <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">

                                        {/* Dot on Line */}
                                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#001a24] bg-cyan-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                            {idx + 1}
                                        </div>

                                        {/* Content Card */}
                                        <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#002E3C]/40 border border-cyan-500/10 p-6 rounded-2xl hover:bg-[#002E3C]/60 hover:border-cyan-500/30 transition-all duration-300">
                                            <div className="font-bold text-cyan-400 mb-1 text-sm tracking-wide uppercase">
                                                {unit.module.split(':')[0]}
                                            </div>
                                            <h3 className="text-xl font-bold text-white mb-4">
                                                {unit.module.split(':')[1]}
                                            </h3>
                                            <ul className="space-y-3">
                                                {unit.topics.map((topic: string, tIdx: number) => (
                                                    <li key={tIdx} className="flex items-start gap-2 text-gray-400 text-sm">
                                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500/50 shrink-0"></div>
                                                        <span>{topic}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Sidebar: Outcomes & CTA */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-3xl p-8 sticky top-24 backdrop-blur-lg">
                                <h3 className="text-xl font-bold text-white mb-6">What You Will Build</h3>
                                <ul className="space-y-6 mb-8">
                                    {program.outcomes.map((outcome: string, idx: number) => (
                                        <li key={idx} className="flex gap-4">
                                            <div className={`mt-1 flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br ${program.gradient} text-white shrink-0 shadow-lg`}>
                                                <CheckCircle size={16} />
                                            </div>
                                            <div>
                                                <p className="text-gray-200 font-medium leading-relaxed">{outcome}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                <div className="p-4 bg-cyan-500/10 rounded-xl border border-cyan-500/20 mb-8">
                                    <p className="text-sm text-cyan-200 text-center">
                                        ⚡ Limited seats! Next batch starting soon.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowApplyModal(true)}
                                    className={`w-full py-4 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-[1.02] bg-gradient-to-r ${program.gradient}`}
                                >
                                    Reserve Your Spot
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Apply Modal - Polished */}
            {showApplyModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
                    <div className="bg-[#001a24] border border-white/10 rounded-2xl max-w-lg w-full p-8 relative shadow-2xl animate-scaleIn">
                        <button
                            onClick={() => setShowApplyModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
                        >
                            ✕
                        </button>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Join the Workshop</h3>
                            <p className="text-gray-400">You are applying for <span className="text-cyan-400 font-semibold">{program.title}</span></p>
                        </div>

                        <form onSubmit={handleApply} className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                                <input
                                    type="text"
                                    required
                                    value={fullName}
                                    onChange={e => setFullName(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="name@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-400 ml-1">Phone Number</label>
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-cyan-500/50 focus:bg-white/10 focus:outline-none transition-all"
                                    placeholder="+91 90000 00000"
                                />
                            </div>

                            {submitError && (
                                <div className="text-red-400 text-sm bg-red-500/10 p-3 rounded-xl border border-red-500/10 flex items-center gap-2">
                                    <span>⚠️</span> {submitError}
                                </div>
                            )}
                            {submitSuccess && (
                                <div className="text-green-400 text-sm bg-green-500/10 p-3 rounded-xl border border-green-500/10 flex items-center gap-2">
                                    <span>✅</span> {submitSuccess}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className={`w-full py-4 mt-4 font-bold rounded-xl text-white shadow-lg bg-gradient-to-r ${program.gradient} hover:opacity-90 transition-all ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {submitting ? 'Processing...' : 'Confirm Registration'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default TrainingProgram;
