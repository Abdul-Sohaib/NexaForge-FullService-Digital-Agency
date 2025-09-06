/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import whoweareimg from '../assets/whoweareimg.png';
import devloper1 from '../assets/pratikdemo.png';
import devloper2 from '../assets/devloper2.png';
import devloper3 from '../assets/devloper3.png';
import toolsdev1 from '../assets/Pratik.png';
import toolsdev2 from '../assets/Sohaib.png';
import toolsdev3 from '../assets/Abhijit.png';

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
      image: devloper1,
      backgroundClass: 'dev-bg-1',
      headingColor: '#111111',
      subtextColor: '#1A73E8',
      toolImage: toolsdev1,
    },
    {
      heading: 'Md Abdul Sohaib',
      subtext: 'As Founder of NexaForge, I craft digital experiences through modern websites and apps.',
      image: devloper2,
      backgroundClass: 'dev-bg-2',
      headingColor: '#FFFFFF',
      subtextColor: '#0984E3',
      toolImage: toolsdev2,
    },
    {
      heading: 'Abhijit Das',
      subtext: 'At NexaForge, I bring creativity to life through stunning UX/UI and impactful graphic design.',
      image: devloper3,
      backgroundClass: 'dev-bg-3',
      headingColor: '#000000',
      subtextColor: '#0984E3',
      toolImage: toolsdev3,
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

    const cardElements = [leftCard, middleCard, rightCard];
    const isMobile = window.innerWidth <= 768;

    // Initialize elements with starting states
    gsap.set(section, { opacity: 0 });
    gsap.set(heading, { 
      opacity: 0, 
      y: 50,
      scale: 0.95 
    });
    gsap.set(cardElements, { 
      opacity: 0, 
      y: 60, 
      scale: 0.9,
    });

    // Fallback timer
    const fallback = setTimeout(() => {
      gsap.to(section, { opacity: 1, duration: 0.6, ease: 'power2.out' });
    }, 5000);

    // Section visibility trigger
    ScrollTrigger.create({
      trigger: section,
      start: isMobile ? 'top bottom+=10vh' : 'top bottom+=20vh',
      onEnter: () => {
        clearTimeout(fallback);
        gsap.to(section, { opacity: 1, duration: 0.8, ease: 'power3.out' });
      },
      onLeaveBack: () => {
        gsap.to(section, { opacity: 0, duration: 0.4, ease: 'power2.in' });
      },
    });

    // Main timeline with scroll control - MOVED BEFORE animation functions
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: isMobile ? 'top 20%' : 'top 20%',
        end: isMobile ? '+=3000' : '+=2500', // Increased mobile scroll distance
        scrub: isMobile ? 1.5 : 1.2, // Adjusted scrub for mobile
        pin: true, // Pin on both mobile and desktop
        anticipatePin: 1,
        markers: false,
        invalidateOnRefresh: true,
        snap: isMobile ? undefined : {
          snapTo: 'labels',
          duration: { min: 0.5, max: 1.0 },
          ease: 'power3.inOut',
          delay: 0.15,
        },
      },
    });

    // Mobile-specific card animation function with screen size customization
    const animateCardsMobile = (cardElements: HTMLElement[]) => {
      // Get current screen width at the time of animation
      const currentScreenWidth = window.innerWidth;
      console.log('Current screen width:', currentScreenWidth); // Debug log
      
      // Different positions based on screen width
      let positions;
      if (currentScreenWidth > 425) {
        console.log('Using positions for screens <= 425px'); // Debug log
        // Smaller ending positions for screens ≤ 425px
        positions = {
          start: [
            { y: 0, x: 0 }, // Card 1
            { y: 0, x: 0 }, // Card 2
            { y: 0, x: 0 }, // Card 3
          ],
          end: [
            { y: 250, x: 0 },  // Card 1 - reduced from 370
            { y: -80, x: 0 },  // Card 2 - reduced from -30
            { y: -400, x: 0 }, // Card 3 - reduced from -400
          ]
        };
      } else {
        console.log('Using positions for screens > 425px'); // Debug log
        // Original positions for screens > 425px
        positions = {
          start: [
            { y: 0, x: 0 }, // Card 1
            { y: 0, x: 0 }, // Card 2
            { y: 0, x: 0 }, // Card 3
          ],
          end: [
            { y: 370, x: 0 },  // Card 1 positioned below heading
            { y: -30, x: 0 }, // Card 2
            { y: -400, x: 0 }, // Card 3
          ]
        };
      }

      // Show heading first
      mainTimeline
        .addLabel('heading-start')
        .to(heading, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.0,
          ease: 'power3.out',
        })
        .to(cardContainer, { 
          opacity: 1,
          duration: 0.1
        }, '-=0.5');

      // Animate each card one by one
      cardElements.forEach((card, index) => {
        // Set initial position for each card
        const startPos = positions.start[index];
        if (!startPos) return;
        
        gsap.set(card, { 
          y: startPos.y,
          x: startPos.x,
          opacity: 0, 
          scale: 0.9
        });

        // Get ending position for each card
        const endPos = positions.end[index];
        if (!endPos) return;

        mainTimeline
          // Card slides to position just below heading
          .to(card, { 
            opacity: 1, 
            y: endPos.y, 
            x: endPos.x,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out' 
          }, index === 0 ? '-=0.2' : '+=0.2')
          .addLabel(`card${index + 1}-visible`)
          // Hold card in position
          .to({}, { 
            duration: 2.5
          });

        // If not the last card, fade it out before showing next
        if (index < cardElements.length - 1) {
          mainTimeline
            .to(card, { 
              opacity: 0, 
              y: -50,
              scale: 0.9,
              duration: 0.8,
              ease: 'power3.inOut' 
            })
            .addLabel(`card${index + 1}-fadeout`);
        }
      });

      // After all cards shown, fade out last card and heading together
      mainTimeline
        .to([heading, cardElements[cardElements.length - 1]], { 
          opacity: 0, 
          y: -50,
          scale: 0.95,
          duration: 1.0,
          ease: 'power3.inOut' 
        })
        .addLabel('exit-complete');
    };

    // Desktop animation function (unchanged)
    const animateCardsDesktop = () => {
      mainTimeline
        .addLabel('entry-start')
        .to(heading, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
        })
        .addLabel('heading-complete')
        .to({}, { duration: 0.5 })
        .to(middleCard, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationY: 0,
          duration: 1.2,
          ease: 'power3.out',
        })
        .addLabel('middle-card-visible')
        .to(leftCard, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
        }, '-=0.6')
        .to(rightCard, {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: 'power3.out',
        }, '-=0.9')
        .addLabel('all-cards-visible')
        .to({}, { duration: 1.5 })
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
          duration: 1.0,
          ease: 'power3.inOut',
        }, '-=0.5')
        .to(middleCard, {
          opacity: 0,
          y: -40,
          scale: 0.88,
          rotationY: -10,
          duration: 1.1,
          ease: 'power3.inOut',
        }, '-=0.6')
        .addLabel('exit-complete');
    };

    // Choose animation based on device type
    if (isMobile) {
      animateCardsMobile(cardElements);
    } else {
      animateCardsDesktop();
    }

    // Cleanup function
    return () => {
      clearTimeout(fallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf([section, heading, cardContainer, middleCard, leftCard, rightCard]);
      mainTimeline.kill();
    };
  }, []);

  // Handle card hover effects (only for desktop)
  const handleCardHover = (cardIndex: number) => {
    setHoveredCard(cardIndex);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  // Get card styling based on hover state
  const getCardStyle = (cardIndex: number) => {
    const isMobile = window.innerWidth <= 768;
    
    // Disable hover effects on mobile
    if (isMobile) {
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

  return (
    <div ref={sectionRef} className="w-full relative z-25 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center items-center relative">
        {/* Centered Heading */}
        <div className="flex w-full justify-center items-center relative mb-16 2xl:-mt-40 lg:-mt-40 md:-mt-[30rem] sm:-mt-[30rem] xs:-mt-[30rem] customwidth:-mt-[40rem]" ref={headingRef}>
          <h2 className="2xl:text-7xl lg:text-6xl md:text-6xl sm:text-4xl xs:text-3xl font-bold text-black font-heading text-center leading-tight z-20">
            Who We Are
          </h2>
          <img
            src={whoweareimg}
            alt=""
            className="2xl:w-36 lg:w-28 md:w-28 sm:w-20 xs:w-20 absolute 2xl:-top-16 2xl:right-60 lg:-top-14 lg:right-40 md:-top-14 md:right-14 sm:-top-10 sm:-right-5 xs:-top-10 xs:-right-5 z-10 rotate-3"
          />
        </div>

        {/* Card Container */}
        <div
          ref={cardContainerRef}
          className={`${window.innerWidth <= 768 ? 'absolute left-1/2 transform -translate-x-1/2' : 'grid'} ${window.innerWidth <= 768 ? '' : '2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'} 2xl:mt-0 lg:mt-0 md:mt-0  sm:mt-10 xs:mt-0 2xl:gap-5 lg:gap-6 md:gap-6 sm:gap-8 xs:gap-0  px-4 w-screen justify-items-center`}
        >
          {/* Left Card - Pratik */}
          <div
            ref={leftCardRef}
            className={`flex flex-col justify-between p-6 rounded-3xl shadow-xl hover:shadow-2xl w-full 2xl:h-[25rem] lg:h-[22rem] md:h-[24rem] sm:h-[20rem] xs:h-[20rem] 2xl:top-0 lg:top-0 md:top-28 sm:top-0 xs:-top-20 customwidth:-top-[20vh]  relative overflow-hidden group  cursor-pointer bg-[#0668E3] button-55 ${window.innerWidth <= 768 ? 'max-w-sm mx-auto absolute' : ''}`}
            style={getCardStyle(0)}
            onMouseEnter={() => handleCardHover(0)}
            onMouseLeave={handleCardLeave}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 h-full flex flex-col justify-between">
              <div>
                <h3 className="2xl:text-3xl lg:text-2xl md:text-3xl sm:text-2xl xs:text-2xl font-bold text-black mb-4 font-heading">
                  {developerCards[0].heading}
                </h3>
                <p className="text-black/70 2xl:text-sm lg:text-xs md:text-xs sm:text-xs xs:text-xs font-body font-semibold leading-relaxed mb-4">
                  {developerCards[0].subtext}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex-shrink-0 flex">
                  <img
                    src={developerCards[0].image}
                    alt={developerCards[0].heading}
                    className="2xl:w-48 lg:w-32 md:w-40 sm:w-40 xs:w-40 h-full rounded-full object-cover border-2 border-black"
                    loading="eager"
                  />
                  <img
                    src={developerCards[0].toolImage}
                    alt={`${developerCards[0].heading} tools`}
                    className="2xl:w-60 2xl:h-60 lg:w-40 lg:h-40 md:w-44 md:h-44 sm:w-44 sm:h-44 xs:w-44 xs:h-44 rounded-full object-cover relative 2xl:right-24 lg:right-16 md:right-16 sm:right-16 xs:right-16 -rotate-12"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-8 translate-y-8"></div>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full transform translate-x-4 -translate-y-4"></div>
          </div>

          {/* Middle Card - Sohaib */}
          <div
            ref={middleCardRef}
            className={`flex flex-col justify-between p-6 rounded-3xl shadow-xl hover:shadow-2xl w-full 2xl:h-[25rem] lg:h-[22rem] md:h-[24rem] sm:h-[20rem] xs:h-[20rem] 2xl:-mt-20 lg:-mt-20  md:top-10 customwidth:-top-[10vh]  relative overflow-hidden group cursor-pointer bg-[#FFF0B5] button-55 ${window.innerWidth <= 768 ? 'max-w-sm mx-auto absolute' : ''}`}
            style={getCardStyle(1)}
            onMouseEnter={() => handleCardHover(1)}
            onMouseLeave={handleCardLeave}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 h-full flex flex-col justify-between">
              <div>
                <h3 className="2xl:text-3xl lg:text-2xl md:text-3xl sm:text-2xl xs:text-2xl font-bold text-black mb-4 font-heading">
                  {developerCards[1].heading}
                </h3>
                <p className="text-black/70 2xl:text-sm lg:text-xs md:text-xs sm:text-xs xs:text-xs font-body font-semibold leading-relaxed mb-4">
                  {developerCards[1].subtext}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex-shrink-0 flex">
                  <img
                    src={developerCards[1].image}
                    alt={developerCards[1].heading}
                    className="2xl:w-48 2xl:h-48 lg:w-32 md:w-40 sm:w-40 sm:h-40 xs:w-40 xs:h-40 h-full rounded-full object-cover border-2 border-black"
                    loading="eager"
                  />
                  <img
                    src={developerCards[1].toolImage}
                    alt={`${developerCards[1].heading} tools`}
                    className="2xl:w-60 2xl:h-60 lg:w-40 lg:h-40 md:w-44 md:h-44 sm:w-44 sm:h-44 xs:w-44 xs:h-44 rounded-full object-cover relative 2xl:right-24 lg:right-16 md:right-20 sm:right-20 xs:right-20"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-white/5 rounded-full transform translate-x-10 translate-y-10"></div>
            <div className="absolute top-0 right-0 w-28 h-28 bg-white/5 rounded-full transform translate-x-6 -translate-y-6"></div>
            <div className="absolute top-1/2 left-0 w-20 h-20 bg-white/5 rounded-full transform -translate-x-4"></div>
          </div>

          {/* Right Card - Abhijit */}
          <div
            ref={rightCardRef}
            className={`flex flex-col justify-between p-6 rounded-3xl shadow-xl hover:shadow-2xl w-full 2xl:h-[25rem] lg:h-[22rem] md:h-[24rem] sm:h-[20rem] xs:h-[20rem] 2xl:top-0 lg:top-0 md:top-0 sm:top-0  xs:top-10 customwidth:-top-[4vh]  relative overflow-hidden group cursor-pointer bg-[#8EBFDD] button-55 ${window.innerWidth <= 768 ? 'max-w-sm mx-auto absolute' : ''}`}
            style={getCardStyle(2)}
            onMouseEnter={() => handleCardHover(2)}
            onMouseLeave={handleCardLeave}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 h-full flex flex-col justify-between">
              <div>
                <h3 className="2xl:text-3xl lg:text-2xl md:text-3xl sm:text-2xl xs:text-2xl font-bold text-black mb-4 font-heading">
                  {developerCards[2].heading}
                </h3>
                <p className="text-black/70 2xl:text-sm lg:text-xs md:text-xs sm:text-xs xs:text-xs font-body font-semibold leading-relaxed mb-4">
                  {developerCards[2].subtext}
                </p>
              </div>
              <div className="flex items-end justify-between">
                <div className="flex-shrink-0 flex">
                  <img
                    src={developerCards[2].image}
                    alt={developerCards[2].heading}
                    className="2xl:w-48 lg:w-32 md:w-40 sm:w-40 xs:w-40 h-full rounded-full object-cover border-2 border-black"
                    loading="eager"
                  />
                  <img
                    src={developerCards[2].toolImage}
                    alt={`${developerCards[2].heading} tools`}
                    className="2xl:w-60 2xl:h-60 lg:w-40 lg:h-40 md:w-44 md:h-44 sm:w-44 sm:h-44 xs:w-44 xs:h-44 rounded-full object-cover relative 2xl:right-24 lg:right-16 md:right-20 sm:right-20 xs:right-20"
                    loading="eager"
                  />
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-8 translate-y-8"></div>
            <div className="absolute top-0 left-0 w-24 h-24 bg-white/5 rounded-full transform -translate-x-4 -translate-y-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developers;