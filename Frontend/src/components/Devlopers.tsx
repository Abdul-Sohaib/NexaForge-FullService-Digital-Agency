import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView, type Variants, type Transition } from 'framer-motion';
import whoweareimg from '../assets/whoweareimg.png';
import devloper1 from '../assets/pratikdemo.png';
import devloper2 from '../assets/devloper2.png';
import devloper3 from '../assets/devloper3.png';
import toolsdev1 from '../assets/Pratik.png';
import toolsdev2 from '../assets/Sohaib.png';
import toolsdev3 from '../assets/Abhijit.png';

const Developers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Framer Motion controls
  const headingControls = useAnimation();
  const leftCardControls = useAnimation();
  const middleCardControls = useAnimation();
  const rightCardControls = useAnimation();

  // Use InView hook to trigger animations once
  const inView = useInView(sectionRef, { once: true, margin: '-20% 0px' });

  // State to track which card is being hovered and mobile detection
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [currentMobileCard, setCurrentMobileCard] = useState(0);

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  // Define the transition object with proper typing
  const transition: Transition = {
    duration: 0.8,
    ease: 'easeOut',
  };

  // Animation variant with explicit Variants type
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  // Editable card data with customizable properties
  const developerCards = [
  
    {
      heading: 'Md Abdul Sohaib',
      subtext: 'As Founder of NexaForge, I craft digital experiences through modern websites and apps.',
      image: devloper2,
      backgroundClass: 'dev-bg-2',
      headingColor: '#111111',
      subtextColor: '#111111',
      toolImage: toolsdev2,
    },

    {
      heading: 'Abhijit Das',
      subtext: 'At NexaForge, I bring creativity to life through stunning UX/UI and impactful graphic design.',
      image: devloper3,
      backgroundClass: 'dev-bg-3',
      headingColor: '#111111',
      subtextColor: '#111111',
      toolImage: toolsdev3,
    },
      {
      heading: 'Pratik Dutta',
      subtext: 'As Co-Founder of NexaForge, I turn brands into scroll-stoppers with smart social media management.',
      image: devloper1,
      backgroundClass: 'dev-bg-1',
      headingColor: '#111111',
      subtextColor: '#111111',
      toolImage: toolsdev1,
    },
  ];

  // Trigger animations when in view
  useEffect(() => {
    const runAnimations = async () => {
      if (inView) {
        try {
          // Sequential animation: heading first, then all cards together
          await headingControls.start('visible');
          if (!isMobile) {
            await Promise.all([
              leftCardControls.start('visible'),
              middleCardControls.start('visible'),
              rightCardControls.start('visible'),
            ]);
          } else {
            // On mobile, show cards immediately without complex animation
            leftCardControls.start('visible');
            middleCardControls.start('visible');
            rightCardControls.start('visible');
          }
        } catch (error) {
          console.error('Animation sequence error:', error);
        }
      }
    };

    runAnimations();
  }, [inView, isMobile, headingControls, leftCardControls, middleCardControls, rightCardControls]);

  // Handle card hover effects (only for desktop)
  const handleCardHover = (cardIndex: number) => {
    if (window.innerWidth > 768) {
      setHoveredCard(cardIndex);
    }
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  // Get card styling based on hover state
  const getCardStyle = (cardIndex: number) => {
    const isMobileView = window.innerWidth <= 768;

    // Disable hover effects on mobile
    if (isMobileView) {
      return {
        transform: 'scale(1)',
        filter: 'blur(0px)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 1,
      };
    }

    if (hoveredCard === null) {
      return {
        transform: 'scale(1)',
        filter: 'blur(0px)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 1,
      };
    }

    if (hoveredCard === cardIndex) {
      return {
        transform: 'scale(1.05)',
        filter: 'blur(0px)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 10,
      };
    }

    return {
      transform: 'scale(0.98)',
      filter: 'blur(2px)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      zIndex: 1,
    };
  };

  // Get mobile card styling based on current card in view
  const getMobileCardStyle = (cardIndex: number) => {
    if (!isMobile) return {};
    
    if (currentMobileCard === cardIndex) {
      return {
        transform: 'scale(1.05)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 10,
      };
    }

    return {
      transform: 'scale(0.95)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      zIndex: 1,
    };
  };

  // Handle touch events for mobile swiping
  const handleTouchStart = (cardIndex: number) => {
    if (isMobile) {
      setCurrentMobileCard(cardIndex);
    }
  };

  // Mobile Card Render Function
  const renderMobileCards = () => (
    <div className="w-full relative">
      <div 
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide2 p-10"
      >
        <div className="flex gap-4 px-4" style={{ width: `${developerCards.length * 100}vw` }}>
          {developerCards.map((card, index) => (
            <div
              key={index}
              className="flex-shrink-0"
              style={{ width: 'calc(100vw - 2rem)' }}
            >
              <div
                className={`flex flex-col justify-between p-6 rounded-3xl shadow-xl 
                  w-full h-96 mx-2
                  overflow-hidden cursor-pointer
                  ${card.backgroundClass} button-55`}
                style={getMobileCardStyle(index)}
                onTouchStart={() => handleTouchStart(index)}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 h-full flex flex-col justify-between">
                  <div>
                    <h3
                      className="text-3xl text-center font-bold mb-4 font-heading"
                      style={{ color: card.headingColor }}
                    >
                      {card.heading}
                    </h3>
                    <p
                      className="text-md font-body font-semibold leading-relaxed mb-4"
                      style={{ color: card.subtextColor }}
                    >
                      {card.subtext}
                    </p>
                  </div>
                  <div className="flex items-end justify-between mt-2">
                    <div className="flex-shrink-0 flex">
                      <img
                        src={card.image}
                        alt={card.heading}
                        className="w-48 h-48 rounded-full object-cover border-2 border-black"
                        loading="eager"
                      />
                      <img
                        src={card.toolImage}
                        alt={`${card.heading} tools`}
                        className="w-48 h-48 rounded-full object-cover relative -ml-20 -rotate-12"
                        loading="eager"
                      />
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-white/5 rounded-full transform translate-x-4 translate-y-4"></div>
                <div className="absolute top-0 right-0 w-12 h-12 bg-white/5 rounded-full transform translate-x-2 -translate-y-2"></div>
                {index === 1 && (
                  <div className="absolute top-1/2 left-0 w-10 h-10 bg-white/5 rounded-full transform -translate-x-2"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mobile Pagination Dots - Fixed position */}
      <div className="flex justify-center mt-6 gap-2 w-full">
        {developerCards.map((_, index) => (
          <div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentMobileCard === index ? 'bg-black w-6' : 'bg-gray-400 w-2'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // Desktop Card Render Function
  const renderDesktopCards = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 gap-2 place-items-center w-full">
      {developerCards.map((card, index) => (
        <motion.div
          key={index}
          className={`flex flex-col justify-between p-6 rounded-3xl shadow-xl 
            scale-100 transition-transform duration-500 ease-in-out 
            hover:shadow-2xl hover:scale-125 
            w-full max-w-[30vw] 2xl:h-[55vh] 2xl:w-7xl md:max-w-[30rem] md:h-[25rem] h-80 sm:h-96 lg:h-[25rem] 
            overflow-hidden group cursor-pointer
            ${card.backgroundClass} button-55`}
          style={getCardStyle(index)}
          onMouseEnter={() => handleCardHover(index)}
          onMouseLeave={handleCardLeave}
          initial="hidden"
          animate={
            index === 0 ? leftCardControls : index === 1 ? middleCardControls : rightCardControls
          }
          variants={fadeUp}
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 h-full flex flex-col justify-between">
            <div>
              <h3
                className="text-2xl 2xl:text-3xl lg:text-3xl sm:text-3xl text-center font-bold mb-4 font-heading"
                style={{ color: card.headingColor }}
              >
                {card.heading}
              </h3>
              <p
                className="text-sm 2xl:text-sm lg:text-sm sm:text-base font-body font-semibold leading-relaxed mb-4"
                style={{ color: card.subtextColor }}
              >
                {card.subtext}
              </p>
            </div>
            <div className="flex items-end justify-between mt-10">
              <div className="flex-shrink-0 flex">
                <img
                  src={card.image}
                  alt={card.heading}
                  className="w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-full object-cover border-2 border-black"
                  loading="eager"
                />
                <img
                  src={card.toolImage}
                  alt={`${card.heading} tools`}
                  className="w-40 sm:w-44 lg:w-60 h-40 sm:h-44 lg:h-60 rounded-full object-cover relative right-16 sm:right-20 lg:right-24 -rotate-12"
                  loading="eager"
                />
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-8 translate-y-8"></div>
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-4 -translate-y-4"></div>
          {index === 1 && (
            <div className="absolute top-1/2 left-0 w-20 h-20 bg-white/5 rounded-full transform -translate-x-4"></div>
          )}
        </motion.div>
      ))}
    </div>
  );

  // Handle scroll events for mobile pagination - Updated for better accuracy
  useEffect(() => {
    if (!isMobile) return;

    const handleScroll = () => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      const cardWidth = containerWidth - 32; // Account for padding
      
      // Calculate which card is most in view
      const centerPosition = scrollLeft + containerWidth / 2;
      const cardIndex = Math.round(centerPosition / cardWidth);
      const clampedIndex = Math.max(0, Math.min(cardIndex, developerCards.length - 1));
      
      setCurrentMobileCard(clampedIndex);
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
      return () => scrollContainer.removeEventListener('scroll', handleScroll);
    }
  }, [isMobile, developerCards.length]);

  return (
    <div ref={sectionRef} className="w-full relative z-20 min-h-screen">
      <div className={`max-w-screen mx-auto ${!isMobile ? 'px-4 sm:px-6 lg:px-8' : ''} py-12 flex flex-col items-center ${isMobile ? 'gap-8' : 'gap-[11vh]'}`}>
        {/* Centered Heading */}
        <motion.div
          className={`relative flex justify-center items-center ${isMobile ? 'px-4' : ''}`}
          initial="hidden"
          animate={headingControls}
          variants={fadeUp}
        >
          <h2 className={`${isMobile ? 'text-5xl' : 'text-4xl sm:text-5xl'} z-20 md:text-6xl lg:text-7xl font-bold text-black font-heading text-center leading-tight`}>
            Who We Are
          </h2>
          <img
            src={whoweareimg}
            alt="Who We Are decoration"
            className={`${isMobile ? 'w-24 -top-9 -right-14' : 'w-20 2xl:w-40 sm:w-24 md:w-28 lg:w-36'} absolute z-10 2xl:-top-20 2xl:-right-36 lg:-top-16 lg:-right-28 md:-top-14 md:-right-20 rotate-3`}
          />
        </motion.div>

        {/* Card Container - Responsive */}
        {isMobile ? renderMobileCards() : renderDesktopCards()}
      </div>

    
    </div>
  );
};

export default Developers;