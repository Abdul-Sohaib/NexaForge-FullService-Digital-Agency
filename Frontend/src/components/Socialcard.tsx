import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation, useInView, type Variants, type Transition } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import bento1 from '../assets/Ai_Agent Website.png';
import bento2 from '../assets/Photographer_Portfolio.png';
import bento3 from '../assets/cafeui.png';
import bento4 from '../assets/cafeloadingui.png';
import bento5 from '../assets/Tea_Portfolio.png';

const Socialcard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Animation controls
  const bento1Control = useAnimation();
  const bento2Control = useAnimation();
  const bento3Control = useAnimation();
  const bento4Control = useAnimation();
  const bento5Control = useAnimation();
  const buttonControl = useAnimation();

  // Detect if section is in view
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-100px',
  });

  // Check for screen size and reduced motion preference
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    checkScreenSize();

    window.addEventListener('resize', checkScreenSize);
    mediaQuery.addEventListener('change', (e) => setPrefersReducedMotion(e.matches));

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      mediaQuery.removeEventListener('change', () => {});
    };
  }, []);

  // Transition settings
  const transition: Transition = {
    duration: prefersReducedMotion ? 0 : 0.8,
    ease: 'easeOut',
  };

  // Animation variants
  const bentoVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition },
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ...transition, delay: 0.2 } },
  };

  // Animation sequence
  useEffect(() => {
    const runAnimationSequence = async () => {
      if (!isInView || prefersReducedMotion) {
        bento1Control.start('visible');
        bento2Control.start('visible');
        bento3Control.start('visible');
        bento4Control.start('visible');
        bento5Control.start('visible');
        buttonControl.start('visible');
        return;
      }

      await bento1Control.start('visible');
      await Promise.all([bento2Control.start('visible'), bento3Control.start('visible'), bento5Control.start('visible')]);
      await buttonControl.start('visible');
    };

    runAnimationSequence();
  }, [isInView, prefersReducedMotion, bento1Control, bento2Control, bento3Control, bento4Control, bento5Control, buttonControl]);

  const handleLoadWorkSamples = () => {
    navigate('/worksamples', { state: { showSplash: true } });
  };

  return (
    <div ref={sectionRef} className="w-full min-h-screen relative z-20">
      <div>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-3xl md:text-5xl lg:text-6xl sm:text-3xl font-bold text-black font-heading text-center mt-12 mb-8"
        >
          Explore Our Work Samples
        </motion.h2>
      </div>
      <div className={`max-w-7xl mx-auto ${isMobile ? 'px-4' : 'px-4 sm:px-6 lg:px-8'} flex flex-col gap-12 items-center justify-center py-12`}>
        {/* Bento Grid */}
        <div className={`${isMobile ? 'flex flex-col gap-4 px-2' : 'flex gap-5'} w-screen justify-center`}>
          {/* Left Column: Two stacked cards */}

          <div className={`${isMobile ? 'flex flex-col gap-4' : 'h-[100vh]'} flex flex-col gap-4`}>
            <motion.div
              initial="hidden"
              animate={bento1Control}
              variants={bentoVariants}
              className={`bento1 rounded-3xl shadow-2xl border-2 border-black overflow-hidden relative ${isMobile ? 'h-80' : 'h-fit w-[40vw]'}`}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
              <img
                src={bento1}
                alt="Bento 1"
                className="w-full h-full object-fit p-2 rounded-3xl z-10 relative"
                loading="eager"
              />
            </motion.div>

            <motion.div
              initial="hidden"
              animate={bento2Control}
              variants={bentoVariants}
              className={`bento2 rounded-3xl shadow-2xl border-2 border-black overflow-hidden relative ${isMobile ? 'h-80' : 'h-fit w-[40vw]'}`}
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
              <img
                src={bento2}
                alt="Bento 2"
                className="w-full h-full object-fit p-2 z-10 rounded-3xl relative"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* Right Column: Desktop only - bento3 and bento4 */}
          {!isMobile && (
            <div className='flex gap-4'>
              <motion.div
                initial="hidden"
                animate={bento3Control}
                variants={bentoVariants}
                className="bento3 rounded-3xl shadow-2xl border-2 border-white overflow-hidden relative w-fit h-[100vh]"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
                <img
                  src={bento3}
                  alt="Bento 3"
                  className="w-fit h-full object-fit p-2 z-10 rounded-3xl relative"
                  loading="eager"
                />
              </motion.div>
              <motion.div
                initial="hidden"
                animate={bento4Control}
                variants={bentoVariants}
                className="bento4 rounded-3xl shadow-2xl border-2 border-white overflow-hidden relative w-fit h-[100vh]"
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
                <img
                  src={bento4}
                  alt="Bento 4"
                  className="w-fit h-full object-fit p-2 z-10 rounded-3xl relative"
                  loading="eager"
                />
              </motion.div>
            </div>
          )}

          {/* Mobile only: bento5 */}
          {isMobile && (
            <motion.div
              initial="hidden"
              animate={bento5Control}
              variants={bentoVariants}
              className="bento5 rounded-3xl shadow-2xl border-2 border-white overflow-hidden relative h-80"
            >
              <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
              <img
                src={bento5}
                alt="Bento 5"
                className="w-full h-full object-cover p-2 z-10 rounded-3xl relative"
                loading="eager"
              />
            </motion.div>
          )}
        </div>

        {/* Load Work Samples Button */}
        <motion.button
          initial="hidden"
          animate={buttonControl}
          variants={buttonVariants}
          className="button-55 px-8 py-4 text-lg font-semibold font-heading text-black bg-transparent hover:bg-black hover:text-white transition-all duration-300"
          onClick={handleLoadWorkSamples}
        >
          <span>Load Work Samples</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Socialcard;