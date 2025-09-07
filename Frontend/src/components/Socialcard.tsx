/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView, type Variants, type Transition } from 'framer-motion';
import cafedemo1 from '../assets/cafedemoimg1.png';
import cafedemo2 from '../assets/cafedemoimg2.png';
import cafedemo3 from '../assets/cafedemoimg3.png';
import restrodemo1 from '../assets/Demo_Restaurant1.png';
import restrodemo2 from '../assets/Demo_Restaurant2.png';
import restrodemo3 from '../assets/Demo_Restaurant3.png';
import uidemo1 from '../assets/Ai_Agent Website.png';
import uidemo2 from '../assets/Photographer_Portfolio.png';
import uidemo3 from '../assets/Tea_Portfolio.png';

const Socialcard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredCafeCard, setHoveredCafeCard] = useState<number | null>(null);
  const [hoveredRestaurantCard, setHoveredRestaurantCard] = useState<number | null>(null);
  const [hoveredUICard, setHoveredUICard] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Animation controls for each element
  const line1Control = useAnimation();
  const line2Control = useAnimation();
  const line3Control = useAnimation();
  const finalLineControl = useAnimation();

  const cafeCard1Control = useAnimation();
  const cafeCard2Control = useAnimation();
  const cafeCard3Control = useAnimation();

  const restaurantCard1Control = useAnimation();
  const restaurantCard2Control = useAnimation();
  const restaurantCard3Control = useAnimation();

  const uiCard1Control = useAnimation();
  const uiCard2Control = useAnimation();
  const uiCard3Control = useAnimation();

  // Detect if section is in view
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  // Check for screen size and reduced motion preference
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    checkScreenSize();

    const handleResize = () => {
      checkScreenSize();
    };

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    window.addEventListener('resize', handleResize);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Define the transition object with proper typing
  const transition: Transition = {
    duration: prefersReducedMotion ? 0 : 0.8,
    ease: 'easeOut',
  };

  const finalLineTransition: Transition = {
    duration: prefersReducedMotion ? 0 : 1.0,
    ease: 'easeOut',
  };

  // Animation variants with explicit Variants type
  const headingVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition,
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 100, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition,
    },
  };

  const finalLineVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: finalLineTransition,
    },
  };

  // Animation sequence
  useEffect(() => {
    const runAnimationSequence = async () => {
      if (!isInView) return;

      if (prefersReducedMotion || isMobile) {
        // Show all content immediately if reduced motion is preferred or on mobile
        line1Control.start('visible');
        cafeCard1Control.start('visible');
        cafeCard2Control.start('visible');
        cafeCard3Control.start('visible');
        line2Control.start('visible');
        restaurantCard1Control.start('visible');
        restaurantCard2Control.start('visible');
        restaurantCard3Control.start('visible');
        line3Control.start('visible');
        uiCard1Control.start('visible');
        uiCard2Control.start('visible');
        uiCard3Control.start('visible');
        finalLineControl.start('visible');
        return;
      }

      try {
        // 1. Fade + slide up the first heading
        await line1Control.start('visible');

        // 2. Fade + slide up the first section's cards
        await Promise.all([
          cafeCard1Control.start('visible'),
          cafeCard2Control.start('visible'),
          cafeCard3Control.start('visible'),
        ]);

        // 3. Reveal the second heading
        await line2Control.start('visible');

        // 4. Animate restaurant cards
        await Promise.all([
          restaurantCard1Control.start('visible'),
          restaurantCard2Control.start('visible'),
          restaurantCard3Control.start('visible'),
        ]);

        // 5. Reveal third heading
        await line3Control.start('visible');

        // 6. Animate UI cards
        await Promise.all([
          uiCard1Control.start('visible'),
          uiCard2Control.start('visible'),
          uiCard3Control.start('visible'),
        ]);

        // 7. Finally reveal the final line
        await finalLineControl.start('visible');
      } catch (error) {
        console.error('Animation sequence error:', error);
      }
    };

    runAnimationSequence();
  }, [
    isInView,
    prefersReducedMotion,
    isMobile,
    line1Control,
    line2Control,
    line3Control,
    finalLineControl,
    cafeCard1Control,
    cafeCard2Control,
    cafeCard3Control,
    restaurantCard1Control,
    restaurantCard2Control,
    restaurantCard3Control,
    uiCard1Control,
    uiCard2Control,
    uiCard3Control,
  ]);

  const cafeCards = [
    { 
      image: cafedemo1, 
      backgroundClass: 'cafedemo1back', 
      control: cafeCard1Control,
      title: " Choco Oreo Blast",
      description: "Chocolate meets crunch in this indulgent shake creamy swirls blended with Oreo bits for the ultimate sweet treat."
    },
    { 
      image: cafedemo2, 
      backgroundClass: 'cafedemo2back', 
      control: cafeCard2Control,
      title: "Avantika Café - Chicken Burger",
      description: "Crispy on the outside, juicy on the inside. Fresh veggies, melty cheese, and a golden fried chicken patty make this burger hard to resist."
    },
    { 
      image: cafedemo3, 
      backgroundClass: 'cafedemo3back', 
      control: cafeCard3Control,
      title: "Cranto’s Café - Flavour Momos",
      description: "Soft, steaming hot momos paired with spicy chutney. Every bite is a little explosion of flavor."
    },
  ];

  const restaurantCards = [
    { 
      image: restrodemo1, 
      backgroundClass: 'restro-bg-1', 
      control: restaurantCard1Control,
      title: "Hyderabadi Biryani",
      description: "Slow-cooked to perfectionfluffy rice layered with tender chicken, aromatic spices, and the rich flavors of Hyderabad."
    },
    { 
      image: restrodemo2, 
      backgroundClass: 'restro-bg-2', 
      control: restaurantCard2Control,
      title: " Egg Curry",
      description: "Comfort food at its finest. A homestyle curry simmered with spices, finished with soft-boiled eggs for a hearty, satisfying meal."
    },
    { 
      image: restrodemo3, 
      backgroundClass: 'restro-bg-3', 
      control: restaurantCard3Control,
      title: " Hakka Noodles",
      description: "Wok-tossed noodles with crunchy veggies and bold seasonings a wholesome bowl full of freshness and flavor."
    },
  ];

  const uiCards = [
    { 
      image: uidemo1, 
      backgroundClass: 'ui-bg-1', 
      control: uiCard1Control,
      title: "AI Agent Interface",
      description: "Modern dashboard design for AI-powered solutions. Clean interface with intuitive navigation and real-time data visualization."
    },
    { 
      image: uidemo2, 
      backgroundClass: 'ui-bg-2', 
      control: uiCard2Control,
      title: "Photography Portfolio",
      description: "Stunning gallery layout showcasing creative work. Responsive design with smooth transitions and image optimization."
    },
    { 
      image: uidemo3, 
      backgroundClass: 'ui-bg-3', 
      control: uiCard3Control,
      title: "Tea Collection Site",
      description: "Elegant e-commerce platform for premium teas. Features product catalogs, brewing guides, and seamless checkout."
    },
  ];

  const getDefaultText = (section: string) => {
    switch (section) {
      case 'cafe':
        return {
          title: "Cafe Branding & Design",
          description: "Creating memorable experiences through thoughtful design. From cozy atmospheres to modern aesthetics, we craft unique identities for every cafe."
        };
      case 'restaurant':
        return {
          title: "Restaurant Identity",
          description: "Developing distinctive brand experiences for dining establishments. From fine dining to casual eateries, we create compelling visual narratives."
        };
      case 'ui':
        return {
          title: "Digital Experiences",
          description: "Designing intuitive interfaces and engaging user experiences. From web applications to mobile platforms, we create digital solutions that delight users."
        };
      default:
        return { title: "", description: "" };
    }
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' }
    }
  };

// Mobile Card Render Function - Updated with click functionality
const renderMobileCardSection = (
  cards: any[], 
  hoveredCard: number | null, 
  setHoveredCard: (index: number | null) => void,
  sectionType: string,
  textGradient: string
) => (
  <div className="flex flex-col gap-6">
    {/* Horizontal Scrollable Cards */}
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-4 pb-4" style={{ width: `${cards.length * 100}vw` }}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flex-shrink-0 w-screen px-4`}
          >
            <div
              className={`card-item w-full shadow-2xl rounded-3xl flex items-center justify-center transition-all duration-300 border-2 border-white h-80 overflow-hidden relative cursor-pointer ${card.backgroundClass} ${hoveredCard === index ? 'ring-4 ring-blue-300 ring-opacity-50' : ''}`}
              onClick={() => setHoveredCard(hoveredCard === index ? null : index)}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
              <div className="relative z-10 flex-shrink-0 overflow-hidden rounded-3xl">
                <img
                  src={card.image}
                  alt={`${sectionType} Demo ${index + 1}`}
                  className="w-full max-w-sm h-fit object-cover p-6 shadow-xl"
                  loading="eager"
                />
              </div>
              {/* Optional: Add a click indicator */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${hoveredCard === index ? 'bg-blue-500' : 'bg-white/50'}`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Text Container - Show only when a card is selected */}
    {hoveredCard !== null && (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`${textGradient} rounded-3xl p-6 shadow-2xl border-2 border-white mx-4`}
      >
        <h3 className="text-xl font-bold mb-3 text-gray-800 font-heading">
          {cards[hoveredCard].title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-body text-sm">
          {cards[hoveredCard].description}
        </p>
        {/* Optional: Add a close button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            setHoveredCard(null);
          }}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
        >
          ✕ Close
        </button>
      </motion.div>
    )}
  </div>
);

  // Desktop Card Render Function
  const renderDesktopCardSection = (
    cards: any[], 
    hoveredCard: number | null, 
    setHoveredCard: (index: number | null) => void,
    sectionType: string,
    textGradient: string,
    textControl: any
  ) => (
    <div className="grid grid-cols-1 2xl:grid-cols-1 2xl:grid-rows-2 lg:grid-cols-1 md:grid-cols-1  gap-6 h-fit">
      {/* Image Cards */}
      <div className="lg:col-span-1 2xl:col-span-1 grid grid-cols-1 2xl:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <motion.div
            key={index}
            initial="hidden"
            animate={card.control}
            variants={cardVariants}
            className={`card-item w-full 2xl:w-full lg:w-full md:w-full shadow-2xl rounded-3xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 border-2 border-white h-52 2xl:h-[40vh]
              lg:h-[40vh] md:h-[40vh] overflow-hidden relative cursor-pointer ${card.backgroundClass}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
            <div className="relative z-10 flex-shrink-0 overflow-hidden rounded-3xl">
              <img
                src={card.image}
                alt={`${sectionType} Demo ${index + 1}`}
                className="w-full 2xl:max-w-2xl lg:max-w-2xl md:max-w-sm h-fit object-cover p-6 shadow-xl transition-transform duration-500 ease-in-out hover:scale-50"
                loading="eager"
              />
            </div>
          </motion.div>
        ))}
        {/* Text Container */}
        <motion.div
          initial="hidden"
          animate={textControl}
          variants={cardVariants}
          className={`lg:col-span-1 ${textGradient} rounded-3xl p-8 flex flex-col justify-center shadow-2xl border-2 border-white h-full`}
        >
          <motion.div
            key={hoveredCard}
            initial="hidden"
            animate="visible"
            variants={textVariants}
          >
            <h3 className="text-2xl font-bold mb-4 text-black font-heading">
              {hoveredCard !== null ? cards[hoveredCard].title : getDefaultText(sectionType).title}
            </h3>
            <p className="text-black leading-relaxed font-body">
              {hoveredCard !== null ? cards[hoveredCard].description : getDefaultText(sectionType).description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div ref={sectionRef} className="w-full min-h-screen relative z-20">
      <div className={`max-w-7xl mx-auto ${!isMobile ? 'px-4 sm:px-6 lg:px-8' : ''} flex flex-col 2xl:gap-[5rem] lg:gap-[20rem] md:gap-[20rem] ${isMobile ? 'xs:gap-[10rem]' : 'sm:gap-[10rem] xs:gap-[10rem]'}`}>
        
        {/* First Section: Cafe Demos */}
        <div className={`flex flex-col ${isMobile ? 'gap-16' : 'gap-20'}`}>
          <motion.h2
            initial="hidden"
            animate={line1Control}
            variants={headingVariants}
            className={`${isMobile ? 'text-2xl px-4' : 'text-3xl sm:text-4xl md:text-4xl lg:text-6xl'} font-bold text-black font-heading text-center`}
          >
            Some demo Graphics of Cafes
          </motion.h2>

          {isMobile ? 
            renderMobileCardSection(
              cafeCards, 
              hoveredCafeCard, 
              setHoveredCafeCard, 
              'cafe',
              'bg-gradient-to-br from-amber-50 to-orange-100'
            ) :
            renderDesktopCardSection(
              cafeCards, 
              hoveredCafeCard, 
              setHoveredCafeCard, 
              'cafe',
              'bg-gradient-to-br from-amber-50 to-orange-100',
              cafeCard1Control
            )
          }
        </div>

        {/* Second Section: Restaurant Demos */}
        <div className={`flex flex-col ${isMobile ? 'gap-16' : 'gap-20'}`}>
          <motion.h2
            initial="hidden"
            animate={line2Control}
            variants={headingVariants}
            className={`${isMobile ? 'text-2xl px-4' : 'text-3xl sm:text-4xl md:text-4xl lg:text-6xl'} font-bold text-black font-heading text-center`}
          >
            Some demo Graphics of Restaurants
          </motion.h2>

          {isMobile ? 
            renderMobileCardSection(
              restaurantCards, 
              hoveredRestaurantCard, 
              setHoveredRestaurantCard, 
              'restaurant',
              'bg-gradient-to-br from-red-50 to-pink-100'
            ) :
            renderDesktopCardSection(
              restaurantCards, 
              hoveredRestaurantCard, 
              setHoveredRestaurantCard, 
              'restaurant',
              'bg-gradient-to-br from-red-50 to-pink-100',
              restaurantCard1Control
            )
          }
        </div>

        {/* Third Section: UI Demos */}
        <div className={`flex flex-col ${isMobile ? 'gap-16' : 'gap-20 '}`}>
          <motion.h2
            initial="hidden"
            animate={line3Control}
            variants={headingVariants}
            className={`${isMobile ? 'text-3xl px-4' : 'text-3xl sm:text-4xl md:text-4xl lg:text-6xl'} font-bold text-black font-heading text-center`}
          >
            Some demos of UI
          </motion.h2>

          {isMobile ? 
            renderMobileCardSection(
              uiCards, 
              hoveredUICard, 
              setHoveredUICard, 
              'ui',
              'bg-gradient-to-br from-blue-50 to-purple-100'
            ) :
            renderDesktopCardSection(
              uiCards, 
              hoveredUICard, 
              setHoveredUICard, 
              'ui',
              'bg-gradient-to-br from-blue-50 to-purple-100',
              uiCard1Control
            )
          }
        </div>

        {/* Final Heading */}
        <motion.h2
          initial="hidden"
          animate={finalLineControl}
          variants={finalLineVariants}
          className={`${isMobile ? 'text-5xl px-4 leading-tight' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'} font-bold text-black font-heading text-center `}
        >
          Let Us ShowCase Your Business
        </motion.h2>
      </div>

      
    </div>
  );
};

export default Socialcard;