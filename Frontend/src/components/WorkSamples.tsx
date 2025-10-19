import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import cafedemo1 from '../assets/cafedemoimg1.png';
import cafedemo2 from '../assets/cafedemoimg2.png';
import cafedemo3 from '../assets/cafedemoimg3.png';
import restrodemo1 from '../assets/Demo_Restaurant1.png';
import restrodemo2 from '../assets/Demo_Restaurant2.png';
import restrodemo3 from '../assets/Demo_Restaurant3.png';
import uidemo1 from '../assets/Ai_Agent Website.png';
import uidemo2 from '../assets/Photographer_Portfolio.png';
import uidemo3 from '../assets/Tea_Portfolio.png';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Graphics Design Carousel Component
const GraphicsCarousel = () => {
  const controls = useAnimation();
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const items = [
    { image: cafedemo1, title: 'Choco Oreo Blast', description: 'Chocolate meets crunch in this indulgent shake.' },
    { image: cafedemo2, title: 'Chicken Burger', description: 'Crispy, juicy burger with fresh veggies.' },
    { image: cafedemo3, title: 'Flavour Momos', description: 'Steaming hot momos with spicy chutney.' },
    { image: restrodemo1, title: 'Hyderabadi Biryani', description: 'Aromatic rice layered with tender chicken.' },
    { image: restrodemo2, title: 'Egg Curry', description: 'Homestyle curry with soft-boiled eggs.' },
    { image: restrodemo3, title: 'Hakka Noodles', description: 'Wok-tossed noodles with crunchy veggies.' },
  ];

  const cardWidth = 320;
  const cardMargin = 16;
  const shouldCarousel = items.length > 5;
  const displayItems = shouldCarousel ? [...items, ...items, ...items] : items;

  useEffect(() => {
    if (shouldCarousel && !isPaused) {
      const singleSetWidth = items.length * (cardWidth + cardMargin * 2);
      
      controls.start({
        x: [-singleSetWidth, -singleSetWidth * 2],
        transition: {
          x: {
            repeat: Infinity,
            repeatType: 'loop',
            duration: items.length * 5,
            ease: 'linear',
          },
        },
      });
    } else if (isPaused) {
      controls.stop();
    }
  }, [isPaused, controls, items.length, shouldCarousel]);

  return (
    <div className="mb-16 mt-10">
      <h3 className="text-3xl md:text-4xl text-center font-bold text-black font-heading mb-6 px-4">
        Graphics Design
      </h3>
      <div className={shouldCarousel ? "overflow-hidden" : ""}>
        <motion.div
          className={shouldCarousel ? "flex" : "flex flex-wrap justify-center gap-6"}
          animate={shouldCarousel ? controls : {}}
        >
          {displayItems.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className={shouldCarousel ? "flex-shrink-0 relative" : "relative"}
              style={shouldCarousel ? { 
                width: `${cardWidth}px`, 
                marginLeft: `${cardMargin}px`, 
                marginRight: `${cardMargin}px` 
              } : { 
                width: `${cardWidth}px` 
              }}
              onMouseEnter={() => {
                if (shouldCarousel) setIsPaused(true);
                setHoveredIndex(index);
              }}
              onMouseLeave={() => {
                if (shouldCarousel) setIsPaused(false);
                setHoveredIndex(null);
              }}
            >
              <motion.div
                className="rounded-2xl shadow-lg border border-black  overflow-hidden relative bg-white"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-contain rounded-2xl p-3"
                  loading="lazy"
                />
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: hoveredIndex === index ? 1 : 0,
                    y: hoveredIndex === index ? 0 : 20,
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6 pointer-events-none"
                >
                  <div>
                    <h4 className="text-2xl font-bold text-white font-heading mb-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-white/90 font-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

// UI Design Carousel Component
const UICarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const items = [
    { image: uidemo1, title: 'AI Agent Interface', description: 'Modern dashboard with intuitive navigation.' },
  ];

  const cardWidth = 480;

  return (
    <div className="mb-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-black font-heading mb-6 px-4">
        UI Design
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="relative"
            style={{ width: `${cardWidth}px` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className="rounded-2xl shadow-lg border border-black h-fit overflow-hidden relative bg-white"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover p-2"
                loading="lazy"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 20,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6 pointer-events-none"
              >
                <div>
                  <h4 className="text-2xl font-bold text-white font-heading mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/90 font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Portfolio Websites Carousel Component
const PortfolioCarousel = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const items = [
    { image: uidemo2, title: 'Photography Portfolio', description: 'Stunning gallery with smooth transitions.' },
    { image: uidemo3, title: 'Tea Collection Site', description: 'Elegant e-commerce platform for teas.' },
  ];

  const cardWidth = 480;

  return (
    <div className="mb-16">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-black font-heading mb-6 px-4">
        Portfolio Websites
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        {items.map((item, index) => (
          <div
            key={`${item.title}-${index}`}
            className="relative"
            style={{ width: `${cardWidth}px` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              className="rounded-2xl shadow-lg border border-black  overflow-hidden relative bg-white"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: hoveredIndex === index ? 1 : 0,
                  y: hoveredIndex === index ? 0 : 20,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-end p-6 pointer-events-none"
              >
                <div>
                  <h4 className="text-2xl font-bold text-white font-heading mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/90 font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

const WorkSamples = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
  const handleBackToHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // If you're using React Router, you can use navigate('/') instead
    navigate('/');
  };

  return (
    <div ref={sectionRef} className="w-full min-h-screen bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={handleBackToHome}
          className="flex items-center gap-2 mb-8 px-6 py-3 bg-transparent text-black border border-black rounded-full font-semibold  transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          <ArrowLeft size={20} />
          Back to Home
        </motion.button>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-black font-heading text-center mb-16"
        >
          Our Work Samples
        </motion.h2>
        <div className='flex flex-col gap-20 '>

        <GraphicsCarousel />
        <UICarousel />
        <PortfolioCarousel />
        </div>
      </div>
    </div>
  );
};

export default WorkSamples;