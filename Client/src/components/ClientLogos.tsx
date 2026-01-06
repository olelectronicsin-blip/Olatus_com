import { motion } from 'framer-motion';

const clients = [
    { name: 'TechVision India', logo: 'https://via.placeholder.com/150x60/0ea5e9/ffffff?text=TechVision' },
    { name: 'STEM Foundation', logo: 'https://via.placeholder.com/150x60/8b5cf6/ffffff?text=STEM+Edu' },
    { name: 'SmartAgri Solutions', logo: 'https://via.placeholder.com/150x60/ec4899/ffffff?text=SmartAgri' },
    { name: 'GreenTech Ventures', logo: 'https://via.placeholder.com/150x60/10b981/ffffff?text=GreenTech' },
    { name: 'AutoTech Industries', logo: 'https://via.placeholder.com/150x60/f97316/ffffff?text=AutoTech' },
    { name: 'FinanceHub', logo: 'https://via.placeholder.com/150x60/3b82f6/ffffff?text=FinanceHub' },
    { name: 'HealthCare Plus', logo: 'https://via.placeholder.com/150x60/6366f1/ffffff?text=HealthCare' },
    { name: 'EduTech Global', logo: 'https://via.placeholder.com/150x60/14b8a6/ffffff?text=EduTech' },
];

const ClientLogos = () => {
    // Duplicate the array for seamless infinite scroll
    const duplicatedClients = [...clients, ...clients];

    return (
        <div className="w-full py-8 overflow-hidden">
            {/* Infinite scroll container */}
            <div className="relative">
                {/* Gradient overlays for fade effect */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#000d14] to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#000d14] to-transparent z-10 pointer-events-none" />

                {/* Scrolling logos */}
                <motion.div
                    className="flex gap-12 items-center"
                    animate={{
                        x: ['0%', '-50%'],
                    }}
                    transition={{
                        x: {
                            repeat: Infinity,
                            repeatType: 'loop',
                            duration: 30,
                            ease: 'linear',
                        },
                    }}
                >
                    {duplicatedClients.map((client, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-40 h-16 flex items-center justify-center group"
                        >
                            <img
                                src={client.logo}
                                alt={`${client.name} logo`}
                                className="max-w-full max-h-full object-contain opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500 filter brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ClientLogos;
