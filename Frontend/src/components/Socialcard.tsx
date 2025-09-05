/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import cafedemo1 from '../assets/cafedemoimg1.png';
import cafedemo2 from '../assets/cafedemoimg2.png';
import cafedemo3 from '../assets/cafedemoimg3.png';
import restrodemo1 from '../assets/Demo_Restaurant1.png';
import restrodemo2 from '../assets/Demo_Restaurant2.png';
import restrodemo3 from '../assets/Demo_Restaurant3.png';
import uidemo1 from '../assets/Ai_Agent Website.png'
import uidemo2 from '../assets/Photographer_Portfolio.png'
import uidemo3 from '../assets/Tea_Portfolio.png'

gsap.registerPlugin(ScrollTrigger);

const Socialcard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const finalLineRef = useRef<HTMLHeadingElement>(null);
  const cafeCardsRef = useRef<HTMLDivElement>(null);
  const restaurantCardsRef = useRef<HTMLDivElement>(null);
  const uiCardsRef = useRef<HTMLDivElement>(null);

  const cafeCards = [
    { image: cafedemo1, backgroundClass: 'cafedemo1back' },
    { image: cafedemo2, backgroundClass: 'cafedemo2back' },
    { image: cafedemo3, backgroundClass: 'cafedemo3back' },
  ];

  const restaurantCards = [
    { image: restrodemo1, backgroundClass: 'restro-bg-1' },
    { image: restrodemo2, backgroundClass: 'restro-bg-2' },
    { image: restrodemo3, backgroundClass: 'restro-bg-3' },
  ];

  const uiCards = [
    { image: uidemo1, backgroundClass: 'ui-bg-1' },
    { image: uidemo2, backgroundClass: 'ui-bg-2' },
    { image: uidemo3, backgroundClass: 'ui-bg-3' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const finalLine = finalLineRef.current;
    const cafeCardsContainer = cafeCardsRef.current;
    const restaurantCardsContainer = restaurantCardsRef.current;
    const uiCardsContainer = uiCardsRef.current;

    if (!section || !content || !line1 || !line2 || !line3 || !finalLine || 
        !cafeCardsContainer || !restaurantCardsContainer || !uiCardsContainer) return;

    const cafeCardElements = cafeCardsContainer.querySelectorAll('.card-item');
    const restaurantCardElements = restaurantCardsContainer.querySelectorAll('.card-item');
    const uiCardElements = uiCardsContainer.querySelectorAll('.card-item');
    
    const isMobile = window.innerWidth <= 768;

    gsap.set(section, { opacity: 0 });
    gsap.set([line1, line2, line3], { opacity: 0, y: 30 });
    gsap.set(finalLine, { opacity: 0, y: 50, scale: 0.8 });
    gsap.set([cafeCardsContainer, restaurantCardsContainer, uiCardsContainer], { opacity: 0 });
    gsap.set([...cafeCardElements, ...restaurantCardElements, ...uiCardElements], {
      opacity: 0,
      y: 100,
      scale: 0.9,
    });

    const fallback = setTimeout(() => {
      gsap.to(section, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }, 6000);

    ScrollTrigger.create({
      trigger: section,
      start: isMobile ? 'top bottom+=10vh' : 'top bottom+=40vh',
      onEnter: () => {
        clearTimeout(fallback);
        gsap.to(section, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      },
      onLeaveBack: () => {
        gsap.to(section, { opacity: 0, duration: 0.3, ease: 'power2.in' });
        document.body.style.backgroundColor = '';
      },
    });

    const changeBodyColor = (color: string) => {
      document.body.style.backgroundColor = color;
    };

    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: isMobile ? 'top 30%' : 'top 10%',
        end: isMobile ? '+=22000' : '+=4500',
        scrub: isMobile ? 1.0 : 1.2,
        pin: true,
        anticipatePin: 1,
        markers: false,
        invalidateOnRefresh: true,
        snap: isMobile ? undefined : {
          snapTo: 'labels',
          duration: { min: 0.4, max: 1.0 },
          ease: 'power3.inOut',
          delay: 0.2,
        },
        onUpdate: (self) => {
          const progress = self.progress;
          
          if (isMobile) {
            // Mobile-specific color change logic
            // Keep black background until after the last UI card animation is complete
            if (progress < 0.90) {
              changeBodyColor('#2B2B29');
            } else {
              changeBodyColor('#F1E8D7');
            }
          } else {
            // Desktop color change logic (unchanged)
            if (progress < 0.25) {
              changeBodyColor('#2B2B29');
            } else if (progress >= 0.25 && progress < 0.5) {
              changeBodyColor('#2B2B29');
            } else if (progress >= 0.5 && progress < 0.80) {
              changeBodyColor('#2B2B29');
            } else {
              changeBodyColor('#F1E8D7');
            }
          }
        },
        onLeave: () => {
          document.body.style.backgroundColor = '';
        },
        onEnterBack: () => {
          changeBodyColor('#F1E8D7');
        },
        onLeaveBack: () => {
          document.body.style.backgroundColor = '';
        },
      },
    });

    // Modified Mobile-specific card animation function
    const animateCardsMobile = (line: HTMLElement, container: HTMLElement, cardElements: NodeListOf<Element>, labelPrefix: string) => {
      // Show heading first
      mainTimeline
        .addLabel(`${labelPrefix}-start`)
        .to(line, { 
          opacity: 1, 
          y: 0, 
          duration: 1.0,
          ease: 'power3.out' 
        })
        .to(container, { 
          opacity: 1,
          duration: 0.1
        }, '-=0.5');

      // Define unique starting and ending points based on section (labelPrefix) and screen width
      const screenWidth = window.innerWidth;
      const isVerySmallScreen = screenWidth <= 375; // Add check for very small screens
      
      const positions = {
        cafes: {
          start: [
            { y: 200, x: 0 }, // Cafe card 1
            { y: 250, x: 0 },   // Cafe card 2
            { y: 300, x: 0 }, // Cafe card 3
          ],
          end: [
            { y: isVerySmallScreen ? 160 : 180, x: 0 },  // Cafe card 1 - reduced for very small screens
            { y: isVerySmallScreen ? -170 : -150, x: 0 },   // Cafe card 2 - reduced for very small screens
            { y: isVerySmallScreen ? -520 : -500, x: 0 },  // Cafe card 3 - reduced for very small screens
          ]
        },
        restaurants: {
          start: [
            { y: 220, x: 0 }, // Restaurant card 1
            { y: 270, x:0 },  // Restaurant card 2
            { y: 320, x: 0 }, // Restaurant card 3
          ],
          end: [
            { y: isVerySmallScreen ? 80 : 100, x: 0 },  // Restaurant card 1 - reduced for very small screens
            { y: isVerySmallScreen ? -240 : -220, x: 0 },   // Restaurant card 2 - reduced for very small screens
            { y: isVerySmallScreen ? -600 : -580, x: 0 },  // Restaurant card 3 - reduced for very small screens
          ]
        },
        ui: {
          start: [
            { y: 100, x: 0 }, // UI card 1
            { y: 200, x: 0 },  // UI card 2
            { y: 100, x: 0 }, // UI card 3
          ],
          end: [
            { y: isVerySmallScreen ? 80 : 100, x: 0 },  // UI card 1 - reduced for very small screens
            { y: isVerySmallScreen ? -230 : -210, x: 0 },   // UI card 2 - reduced for very small screens
            { y: isVerySmallScreen ? -570 : -550, x: 0 },  // UI card 3 - reduced for very small screens
          ]
        },
      };

      // Animate each card one by one - positioned just below the heading
      cardElements.forEach((card, index) => {
        // Set initial position for each card based on section
        // Fix: Add type assertion to allow string indexing
        const startPos = positions[labelPrefix as keyof typeof positions].start[index];
        gsap.set(card, { 
          y: startPos.y,
          x: startPos.x,
          opacity: 0, 
          scale: 0.9
        });

        // Get ending position for each card
        // Fix: Add type assertion to allow string indexing
        const endPos = positions[labelPrefix as keyof typeof positions].end[index];

        mainTimeline
          // Card slides to unique ending point just below heading
          .to(card, { 
            opacity: 1, 
            y: endPos.y, 
            x: endPos.x,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out' 
          }, index === 0 ? '-=0.2' : '+=0.2')
          .addLabel(`${labelPrefix}-card${index + 1}-visible`)
          // Hold card in position
          .to({}, { 
            duration: 3.0
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
            .addLabel(`${labelPrefix}-card${index + 1}-fadeout`);
        }
      });

      // After all cards shown, fade out last card and heading together
      mainTimeline
        .to([line, cardElements[cardElements.length - 1]], { 
          opacity: 0, 
          y: -50,
          duration: 1.0,
          ease: 'power3.inOut' 
        })
        .addLabel(`${labelPrefix}-complete`);
    };

    // Desktop animation function (unchanged)
    const animateCardsDesktop = (line: HTMLElement, container: HTMLElement, cardElements: NodeListOf<Element>, labelPrefix: string) => {
      mainTimeline
        .addLabel(`${labelPrefix}-start`)
        .to(line, { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: 'power3.out' 
        })
        .to(container, { 
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out' 
        }, '-=0.3')
        .to(cardElements, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: 'power3.out' 
        }, '-=0.5')
        .addLabel(`${labelPrefix}-visible`)
        .to({}, { duration: 2.0 })
        .to([line, container], { 
          opacity: 0, 
          y: -30,
          duration: 1.0,
          ease: 'power3.inOut' 
        })
        .addLabel(`${labelPrefix}-end`);
    };

    // Choose animation function based on device
    const animateCards = isMobile ? animateCardsMobile : animateCardsDesktop;

    // Execute animations for each section
    animateCards(line1, cafeCardsContainer, cafeCardElements, 'cafes');
    animateCards(line2, restaurantCardsContainer, restaurantCardElements, 'restaurants');
    animateCards(line3, uiCardsContainer, uiCardElements, 'ui');

    // Final line animation
    mainTimeline
      .addLabel('final-start')
      .to(finalLine, { 
        opacity: 1, 
        y: 0,
        scale: 1,
        duration: 1.5,
        ease: 'power3.out' 
      })
      .addLabel('final-hold')
      .to({}, { duration: 3.0 })
      .to(finalLine, { 
        opacity: 0, 
        y: -20,
        scale: 0.9,
        duration: 1.0,
        ease: 'power3.in' 
      })
      .addLabel('final-end');

    return () => {
      clearTimeout(fallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf('*');
      mainTimeline.kill();
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full min-h-screen relative z-20">
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-0 lg:px-0 min-h-screen flex flex-col justify-center">
        <div className="relative pt-12 md:pt-0">
          <div className="text-center">
            <h2 ref={line1Ref} className={`${window.innerWidth <= 768 ? 'relative mb-4' : 'absolute inset-0'} 2xl:text-6xl lg:text-5xl md:text-4xl sm:text-2xl xs:text-xl  2xl:mt-32 lg:mt-32 sm:-mt-10 xs:-mt-20 font-bold text-white font-heading flex items-center justify-center px-2`}>
              Some demo Graphics of Cafes
            </h2>
            <h2 ref={line2Ref} className={`${window.innerWidth <= 768 ? 'relative mb-4' : 'absolute inset-0'} 2xl:text-5xl lg:text-4xl md:text-4xl sm:text-2xl xs:text-xl 2xl:mt-32 lg:mt-32 md:-mt-10 sm:-mt-24 xs:-mt-24 font-bold text-white font-heading flex items-center justify-center px-2`}>
              Some demo Graphics of Restaurants
            </h2>
            <h2 ref={line3Ref} className={`${window.innerWidth <= 768 ? 'relative mb-4' : 'absolute inset-0'} 2xl:text-7xl lg:text-6xl md:text-5xl sm:text-3xl xs:text-2xl md:-mt-10 2xl:mt-32 lg:mt-32 sm:-mt-20 font-bold text-white  font-heading flex items-center justify-center px-2`}>
              Some demos of UI 
            </h2>
            <h2 ref={finalLineRef} className="absolute 2xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl xs:text-2xl font-bold text-black font-heading flex items-center justify-center 2xl:mt-60 lg:mt-60 md:mt-20 sm:mt-24 w-full h-full px-2">
              Let Us ShowCase Your Business
            </h2>
          </div>
          <div className="text-5xl font-bold text-transparent font-heading text-center">
            Some demos of Placeholder
          </div>
        </div>

        <div className="flex justify-center items-center flex-grow">
          {/* Cafe Cards - Positioned just below heading in mobile */}
          <div ref={cafeCardsRef} className={`absolute px-6 grid ${window.innerWidth <= 768 ? 'grid-cols-1 place-items-center gap-4 2xl:mt-12 lg:mt-12 md:mt-12 sm:mt-10 xs:-mt-0' : '2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-5'} w-screen max-w-7xl ${window.innerWidth <= 768 ? 'left-1/2 transform -translate-x-1/2' : ''}`}>
            {cafeCards.map((card, index) => (
              <div
                key={index}
                className={`card-item w-full shadow-2xl rounded-3xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 border-2 border-white 2xl:h-[25rem] lg:h-[20rem] md:h-[20rem] sm:h-[20rem] xs:h-[18rem] overflow-hidden relative object-cover ${card.backgroundClass} ${window.innerWidth <= 768 ? 'max-w-sm mx-auto' : ''}`}
                style={window.innerWidth <= 768 ? { transform: `translateX(${index === 0 ? '-100px' : index === 1 ? '0px' : '100px'})` } : {}}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
                <div className="relative z-10 flex-shrink-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={`Cafe Demo ${index + 1}`}
                    className="2xl:max-w-[24rem] lg:max-w-[18rem] md:max-w-[18rem] sm:max-w-[18rem] xs:max-w-[16rem] rounded-3xl shadow-xl object-cover border-2 border-black transition-transform duration-300 hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Restaurant Cards - Positioned just below heading in mobile */}
          <div ref={restaurantCardsRef} className={`absolute px-6 grid ${window.innerWidth <= 768 ? 'grid-cols-1 place-items-center gap-4 2xl:mt-44 lg:mt-44 md:-mt-10 sm:-mt-10 xs:mt-0 xs:top-8 2xl:top-0 lg:-top-20' : '2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-5'} w-screen max-w-7xl ${window.innerWidth <= 768 ? 'left-1/2 transform -translate-x-1/2' : ''}`}>
            {restaurantCards.map((card, index) => (
              <div
                key={index}
                className={`card-item w-full shadow-2xl rounded-3xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 border-2 border-white 2xl:h-[25rem] lg:h-[20rem] md:h-[20rem] sm:h-[20rem] xs:h-[18rem] overflow-hidden relative object-cover ${card.backgroundClass} ${window.innerWidth <= 768 ? 'max-w-sm mx-auto' : ''}`}
                style={window.innerWidth <= 768 ? { transform: `translateX(${index === 0 ? '-120px' : index === 1 ? '20px' : '120px'})` } : {}}
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
                <div className="relative z-10 flex-shrink-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={`Restaurant Demo ${index + 1}`}
                    className="2xl:max-w-[24rem] lg:max-w-[18rem] md:max-w-[18rem] sm:max-w-[18rem] xs:max-w-[16rem] rounded-3xl shadow-xl object-cover border-2 border-black transition-transform duration-300 hover:scale-105"
                    loading="eager"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* UI Cards - Positioned just below heading in mobile */}
          <div
            ref={uiCardsRef}
            className={`absolute px-6 grid ${
              window.innerWidth <= 768
                ? 'grid-cols-1 place-items-center gap-4 2xl:mt-52 lg:mt-52 md:mt-52 sm:mt-20 xs:mt-40'
                : '2xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-1 gap-5'
            } w-screen ${
              window.innerWidth <= 768 ? 'left-1/2 transform -translate-x-1/2' : ''
            }`}
          >
            {uiCards.map((card, index) => (
              <div
                key={index}
                className={`card-item w-full shadow-2xl rounded-3xl flex items-center justify-center hover:shadow-3xl transition-all duration-300 border-2 border-white 2xl:h-[24rem] lg:h-[16rem] md:h-[18rem] sm:h-[20rem] xs:h-[15rem] overflow-hidden relative object-cover ${card.backgroundClass} ${
                  window.innerWidth <= 768 ? 'max-w-sm mx-auto' : ''
                }`}
                style={
                  window.innerWidth <= 768
                    ? {
                        transform: `translateX(${
                          index === 0
                            ? '-140px'
                            : index === 1
                            ? '40px'
                            : '140px'
                        })`,
                      }
                    : {}
                }
              >
                <div className="absolute inset-0 bg-white/10 backdrop-blur-xl z-0"></div>
                <div className="relative z-10 flex-shrink-0 overflow-hidden">
                  <img
                    src={card.image}
                    alt={`UI Demo ${index + 1}`}
                    className="2xl:max-w-[28rem] lg:max-w-[18rem] md:max-w-[22rem] sm:max-w-[22rem] xs:max-w-[19rem] rounded-3xl shadow-xl object-cover border-2 border-black transition-transform duration-300 hover:scale-105"
                    loading="eager"
                    style={{ willChange: 'transform' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socialcard;