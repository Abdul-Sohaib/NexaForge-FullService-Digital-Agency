import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import whoweareimg from '../assets/whoweareimg.png';

import devloper2 from '../assets/devloper2.png'
import devloper3 from '../assets/devloper3.png'


import toolsdev1 from '../assets/Pratik.png'
import toolsdev2 from '../assets/Sohaib.png'
import toolsdev3 from '../assets/Abhijit.png'


// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Developers = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const middleCardRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  
  // State to track which card is being hovered
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Editable card data with customizable properties
  const developerCards = [
    {
      heading: 'Pratik Dutta',
      subtext: 'As Co-Founder of NexaForge, I turn brands into scroll-stoppers with smart social media management.',
      image: devloper3,
      backgroundClass: 'dev-bg-1',
      headingColor: '#111111',
      subtextColor: '#1A73E8',
    },
    {
      heading: 'Md Abdul Sohaib',
      subtext: 'As Founder of NexaForge, I craft digital experiences through modern websites and apps.',
      image: devloper2,
      backgroundClass: 'dev-bg-2',
      headingColor: '#FFFFFF',
      subtextColor: '#0984E3',
    },
    {
      heading: 'Abhijit Das',
      subtext: 'At NexaForge, I bring creativity to life through stunning UX/UI and impactful graphic design.',
      image: devloper3,
      backgroundClass: 'dev-bg-3',
      headingColor: '#000000',
      subtextColor: '#0984E3',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cardContainer = cardContainerRef.current;
    const middleCard = middleCardRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;

    if (!section || !heading || !cardContainer || !middleCard || !leftCard || !rightCard) return;

    // Initialize elements with optimized starting states
    gsap.set(section, { opacity: 0 });
    gsap.set(heading, { 
      opacity: 0, 
      y: 50,
      scale: 0.95 
    });
    gsap.set(middleCard, { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
      rotationY: 15 
    });
    gsap.set(leftCard, { 
      opacity: 0, 
      x: -100, 
      y: 40, 
      scale: 0.85,
      rotation: -5 
    });
    gsap.set(rightCard, { 
      opacity: 0, 
      x: 100, 
      y: 40, 
      scale: 0.85,
      rotation: 5 
    });

    // Optimized fallback timer
    const fallback = setTimeout(() => {
      gsap.to(section, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }, 5000);

    // Section visibility trigger
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom+=0vh',
      onEnter: () => {
        clearTimeout(fallback);
        gsap.to(section, { opacity: 1, duration: 0.8, ease: 'power3.out' });
      },
      onLeaveBack: () => {
        gsap.to(section, { opacity: 0, duration: 0.4, ease: 'power2.in' });
      },
    });

    // Refined main timeline with better scroll control
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 10%',
        end: '+=3000',
        scrub: 1.5, // Slower scrub for more control
        pin: true,
        anticipatePin: 1,
        markers: false,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 'labels',
          duration: { min: 0.5, max: 1.2 },
          ease: 'power3.inOut',
          delay: 0.15,
        },
      },
    });

    // Refined animation sequence with staggered timing
    mainTimeline
      .addLabel('entry-start')
      // Heading appears with refined animation
      .to(heading, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: 'power3.out',
      })
      .addLabel('heading-complete')
      // Extended pause after heading
      .to({}, { duration: 0.8 })
      // Middle card appears first with 3D effect
      .to(middleCard, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0,
        duration: 1.5,
        ease: 'power3.out',
      })
      .addLabel('middle-card-visible')
      // Side cards appear with staggered timing and refined effects
      .to(leftCard, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.4,
        ease: 'power3.out',
      }, '-=0.6')
      .to(rightCard, {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        duration: 1.4,
        ease: 'power3.out',
      }, '-=1.1')
      .addLabel('all-cards-visible')
      // Extended hold time for better readability
      .to({}, { duration: 2.0 })
      // Refined exit animation with staggered timing
      .to(heading, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 1.0,
        ease: 'power3.inOut',
      })
      .to([leftCard, rightCard], {
        opacity: 0,
        y: -35,
        x: (_index, target) => target === leftCard ? -50 : 50,
        scale: 0.9,
        rotation: (_index, target) => target === leftCard ? -3 : 3,
        duration: 1.2,
        ease: 'power3.inOut',
      }, '-=0.5')
      .to(middleCard, {
        opacity: 0,
        y: -40,
        scale: 0.88,
        rotationY: -10,
        duration: 1.3,
        ease: 'power3.inOut',
      }, '-=0.8')
      .addLabel('exit-complete');

    // Additional ScrollTrigger to handle space removal after animation
    ScrollTrigger.create({
      trigger: section,
      start: 'top -250%', // When section has scrolled past
      end: 'bottom -250%',
      onEnter: () => {
        // Completely remove the section from document flow
        gsap.set(section, { 
          display: 'none',
          position: 'absolute',
          visibility: 'hidden',
          height: 0,
          width: 0,
          overflow: 'hidden',
          margin: 0,
          padding: 0
        });
      },
      onLeaveBack: () => {
        // Restore the section when scrolling back
        gsap.set(section, { 
          display: 'block',
          position: 'relative',
          visibility: 'visible',
          height: 'auto',
          width: 'auto',
          overflow: 'visible',
          margin: '',
          padding: ''
        });
      }
    });

    // Timeline completion handler
    mainTimeline.eventCallback('onComplete', () => {
      // Additional cleanup when timeline fully completes
      setTimeout(() => {
        gsap.set(section, { 
          display: 'none',
          height: 0,
          margin: 0,
          padding: 0
        });
      }, 100);
    });

    mainTimeline.eventCallback('onReverseComplete', () => {
      // Restore when timeline reverses
      gsap.set(section, { 
        display: 'block',
        height: 'auto',
        margin: '',
        padding: ''
      });
    });

    // Cleanup function
    return () => {
      clearTimeout(fallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([section, heading, cardContainer, middleCard, leftCard, rightCard]);
      mainTimeline.kill();
    };
  }, []);

  // Handle card hover effects
  const handleCardHover = (cardIndex: number) => {
    setHoveredCard(cardIndex);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  // Get card styling based on hover state
  const getCardStyle = (cardIndex: number) => {
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
        transform: 'scale(1.08)',
        filter: 'blur(0px)',
        transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        zIndex: 10,
      };
    }
    
    return {
      transform: 'scale(1)',
      filter: 'blur(3px)',
      transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      zIndex: 1,
    };
  };

  return (
    <div ref={sectionRef} className="w-full relative z-20">
      {/* Light gradient background similar to image */}
      <div className="absolute "></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center items-center relative">
        {/* Centered Heading */}
        <div className='flex w-full justify-center items-center relative ' ref={headingRef}>
        <h2
          
          className="text-7xl font-bold text-black font-heading text-center mb-5 leading-tight z-20 "
        >
          Who We Are
        </h2>
        <img src={whoweareimg} alt="" className='w-36 absolute -top-16 right-60 z-10 rotate-3' />
        </div>

        {/* Centered Card Container with proper grid layout */}
        <div ref={cardContainerRef} className="grid grid-cols-1 lg:grid-cols-3 gap-9 px-10 w-screen justify-items-center">
          {/* Left Card - Green gradient like image */}
          <div
            ref={leftCardRef}
            className="flex flex-col justify-between p-8 rounded-3xl shadow-xl hover:shadow-2xl w-full h-[27rem] relative overflow-hidden group cursor-pointer -top-1 bg-[#0668E3] button-55"
            style={{
              background: '',
              ...getCardStyle(0),
            }}
            onMouseEnter={() => handleCardHover(0)}
            onMouseLeave={handleCardLeave}
          >
            {/* Inner card with subtle transparency */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-4xl font-bold text-black mb-6  w-full font-heading">
                  {developerCards[0].heading}
                </h3>
                <p className="text-black/70 text-sm font-body font-semibold leading-relaxed mb-2 text-left w-full">
                  {developerCards[0].subtext}
                </p>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex-shrink-0 flex">
                  <img
                    src={developerCards[0].image}
                    alt={developerCards[0].heading}
                    className="w-48 h-full rounded-full object-cover border-2 border-black"
                    loading="eager"
                  />
                   <img
                    src={toolsdev1}
                    alt={developerCards[1].heading}
                    className="w-60 h-60 rounded-full object-cover relative right-24 -rotate-12"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-8 translate-y-8"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-4 -translate-y-4"></div>
          </div>

          {/* Middle Card - Purple gradient (taller) */}
          <div
            ref={middleCardRef}
            className="flex flex-col justify-between p-8 rounded-3xl shadow-xl hover:shadow-2xl w-full h-[30rem] relative overflow-hidden group cursor-pointer mb-5 bg-[#FFF0B5] button-55"
            style={{
              background: '',
              ...getCardStyle(1),
            }}
            onMouseEnter={() => handleCardHover(1)}
            onMouseLeave={handleCardLeave}
          >
            {/* Inner card with subtle transparency */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-4xl  font-bold font-heading text-black mb-6 ">
                  {developerCards[1].heading}
                </h3>
                <p className="text-black/70 text-sm text-left  font-body font-semibold leading-relaxed mb-8">
                  {developerCards[1].subtext}
                </p>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex-shrink-0 flex ">
                  <img
                    src={developerCards[1].image}
                    alt={developerCards[1].heading}
                    className="w-52 h-52  rounded-full object-cover border-2 border-black"
                    loading="eager"
                  />
                  <img
                    src={toolsdev2}
                    alt={developerCards[1].heading}
                    className="w-60 h-60 rounded-full object-cover relative right-24"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-white/5 rounded-full transform translate-x-10 translate-y-10"></div>
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full transform translate-x-6 -translate-y-6"></div>
            <div className="absolute top-1/2 left-0 w-20 h-20 bg-white/5 rounded-full transform -translate-x-4"></div>
          </div>

          {/* Right Card - Orange/Yellow gradient */}
          <div
            ref={rightCardRef}
            className="flex flex-col justify-between p-8 rounded-3xl shadow-xl hover:shadow-2xl w-full h-[27rem] relative overflow-hidden group cursor-pointer -top-4 bg-[#8EBFDD] button-55"
            style={{
              background: '',
              ...getCardStyle(2),
            }}
            onMouseEnter={() => handleCardHover(2)}
            onMouseLeave={handleCardLeave}
          >
            {/* Inner card with subtle transparency */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-4xl font-bold text-black mb-6 tracking-wide font-heading">
                  {developerCards[2].heading}
                </h3>
                <p className="text-black/70 text-sm text-left font-body font-semibold leading-relaxed mb-4">
                  {developerCards[2].subtext}
                </p>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex-shrink-0 flex">
                  <img
                    src={developerCards[2].image}
                    alt={developerCards[2].heading}
                    className="w-48 h-full rounded-full object-cover border-2 border-black"
                    loading="eager"
                  />
                   <img
                    src={toolsdev3}
                    alt={developerCards[1].heading}
                    className="w-60 h-60 rounded-full object-cover relative right-24"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-8 translate-y-8"></div>
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-4 -translate-y-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;