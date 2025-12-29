import { useEffect, useRef } from 'react';

const brands = [
  { id: 1, name: 'Microsoft', logo: 'https://logo.clearbit.com/microsoft.com' },
  { id: 2, name: 'Google', logo: 'https://logo.clearbit.com/google.com' },
  { id: 3, name: 'Amazon', logo: 'https://logo.clearbit.com/amazon.com' },
  { id: 4, name: 'Intel', logo: 'https://logo.clearbit.com/intel.com' },
  { id: 5, name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com' },
  { id: 6, name: 'IBM', logo: 'https://logo.clearbit.com/ibm.com' },
  { id: 7, name: 'Cisco', logo: 'https://logo.clearbit.com/cisco.com' },
  { id: 8, name: 'Oracle', logo: 'https://logo.clearbit.com/oracle.com' },
];

const BrandSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const scrollStep = 1;
    const scrollInterval = 30;

    const scroll = () => {
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      } else {
        scrollContainer.scrollLeft += scrollStep;
      }
    };

    const intervalId = setInterval(scroll, scrollInterval);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full py-12 mt-12 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 border border-cyan-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            Trusted By <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-transparent bg-clip-text">Industry Leaders</span>
          </h3>
          <p className="text-gray-400 text-sm">
            Collaborating with innovative brands worldwide
          </p>
        </div>

        <div className="relative overflow-hidden rounded-lg">
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-[#001a24] via-[#001a24]/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-[#001a24] via-[#001a24]/80 to-transparent z-10 pointer-events-none"></div>

          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-12 overflow-hidden py-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {/* Duplicate brands for seamless infinite scroll */}
            {[...brands, ...brands].map((brand, index) => (
              <div
                key={`${brand.id}-${index}`}
                className="flex-shrink-0 group"
              >
                <div className="w-[160px] h-[80px] flex items-center justify-center bg-white/5 backdrop-blur-sm rounded-xl border-2 border-cyan-500/20 hover:border-cyan-500/50 transition-all duration-300 hover:bg-white/10 hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/30">
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-full h-full object-contain p-5 transition-all duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${brand.name}&size=160&background=0891b2&color=fff&bold=true`;
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-500 text-xs">
            And many more amazing partners...
          </p>
        </div>
      </div>
    </div>
  );
};

export default BrandSlider;
