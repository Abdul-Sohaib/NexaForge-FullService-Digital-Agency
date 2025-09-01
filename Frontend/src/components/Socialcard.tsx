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

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Socialcard = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLHeadingElement>(null);
  const line2Ref = useRef<HTMLHeadingElement>(null);
  const line3Ref = useRef<HTMLHeadingElement>(null);
  const finalLineRef = useRef<HTMLHeadingElement>(null);
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const currentCardRef = useRef<HTMLDivElement>(null);

  // Card data with unique images, background classes, and customizable colors
  const cafeCards = [
    { heading: 'Choco Oreo Blast', subtext: 'Indulge in the perfect mix of rich chocolate, crunchy Oreo, and creamy delight - crafted for true dessert lovers.', image: cafedemo1, backgroundClass: 'cafedemo1back', headingColor: '#F5E6D3', subtextColor: '#F5E0C8' },
    { heading: 'Bold Designs That Spark Appetite', subtext: 'A mouthwatering burger ad with striking typography and rich visuals crafted to grab attention and drive instant cravings.', image: cafedemo2, backgroundClass: 'cafedemo2back', headingColor: '#FFFFFF', subtextColor: '#2B2B2B' },
    { heading: 'Flavour That Speaks', subtext: 'A fresh and tempting momo ad with bold visuals - crafted to make every bite irresistible.', image: cafedemo3, backgroundClass: 'cafedemo3back', headingColor: '#FFFFFF', subtextColor: '#000000' },
  ];

  const restaurantCards = [
    { heading: 'Hyderabadi Biryani Special', subtext: 'Authentic taste, rich aroma, and pure indulgence  crafted to delight every bite.', image: restrodemo1, backgroundClass: 'restro-bg-1', headingColor: '#000000', subtextColor: '#F8F1E7' },
    { heading: 'Authentic Flavors, Served Fresh', subtext: 'Experience the perfect blend of taste and tradition', image: restrodemo2, backgroundClass: 'restro-bg-2', headingColor: '#4F3B2A', subtextColor: '#F8F1E7' },
    { heading: 'Your Cravings, Answered.', subtext: 'Authentic Hakka noodles tossed with fresh, crunchy vegetables.', image: restrodemo3, backgroundClass: 'restro-bg-3', headingColor: '#2E5B4B', subtextColor: '#4A8876' },
  ];

  const uiCards = [
    { heading: 'Portfolio Site', subtext: 'Sleek and responsive design', image: 'https://images.unsplash.com/photo-1467232004584-2cf1d1153fd8', backgroundClass: 'ui-bg-1', headingColor: '#2E395B', subtextColor: '#4A5688' },
    { heading: 'E-Commerce', subtext: 'User-friendly shopping platform', image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3', backgroundClass: 'ui-bg-2', headingColor: '#4B2E5B', subtextColor: '#6B4A88' },
    { heading: 'Dashboard UI', subtext: 'Intuitive and modern interface', image: 'https://images.unsplash.com/photo-1551288049-b1f3a85551c7', backgroundClass: 'ui-bg-3', headingColor: '#2E4F3B', subtextColor: '#4A7B5A' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const line3 = line3Ref.current;
    const finalLine = finalLineRef.current;
    const cardContainer = cardContainerRef.current;
    const currentCard = currentCardRef.current;

    if (!section || !content || !line1 || !line2 || !line3 || !finalLine || !cardContainer || !currentCard) return;

    // Initialize elements with better starting states
    gsap.set(section, { opacity: 0 });
    gsap.set([line1, line2, line3], {
      opacity: 0,
      y: 30,
    });
    gsap.set(finalLine, {
      opacity: 0,
      y: 50,
      scale: 0.8,
    });
    gsap.set(currentCard, {
      opacity: 0,
      y: 20,
      scale: 0.95,
    });

    const sections = [
      { line: line1, cards: cafeCards, title: 'Some demos of Cafes' },
      { line: line2, cards: restaurantCards, title: 'Some demos of Restaurants' },
      { line: line3, cards: uiCards, title: 'Some demos of UI and Websites' },
    ];

    // Improved updateCard function with image slide animation
    const updateCard = (data: any) => {
      return new Promise<void>((resolve) => {
        const img = currentCard.querySelector('img') as HTMLImageElement;
        const heading = currentCard.querySelector('.card-heading') as HTMLElement;
        const subtext = currentCard.querySelector('.card-subtext') as HTMLElement;
        const card = currentCard;

        if (img && heading && subtext && card) {
          // Update content immediately (while card is hidden)
          img.style.display = 'block';
          heading.style.display = 'block';
          subtext.style.display = 'block';
          
          // Preload image to prevent flashing and add slide animation
          if (img.src !== data.image) {
            const tempImg = new Image();
            tempImg.onload = () => {
              img.src = data.image;
              
              // Add slide-up animation to the image when it changes
              gsap.fromTo(img, 
                { 
                  y: 50, 
                  opacity: 0.7,
                  scale: 0.95,
                  rotation: -8 // Start with more rotation
                },
                { 
                  y: 0, 
                  opacity: 1,
                  scale: 1,
                  rotation: -6, // End with original rotation
                  duration: 0.8,
                  ease: 'power3.out'
                }
              );
              
              resolve();
            };
            tempImg.onerror = () => resolve(); // Continue even if image fails
            tempImg.src = data.image;
          } else {
            // Even if same image, add a subtle animation
            gsap.fromTo(img, 
              { scale: 0.98 },
              { 
                scale: 1,
                duration: 0.4,
                ease: 'power2.out'
              }
            );
            resolve();
          }
          
          heading.textContent = data.heading;
          heading.style.color = data.headingColor || '#4B2E39';
          subtext.textContent = data.subtext;
          subtext.style.color = data.subtextColor || '#6B4E56';
          
          // Update background class
          card.className = `w-full  bg-white shadow-2xl rounded-3xl p-2 flex items-center justify-center gap-8 hover:shadow-3xl transition-all duration-300 border-2 border-white h-96 mb-16 ${data.backgroundClass || ''}`;
          
          if (img.src === data.image) {
            resolve();
          }
        } else {
          resolve();
        }
      });
    };

    // Initialize first card content
    updateCard(sections[0].cards[0]);

    // Reduced fallback time
    const fallback = setTimeout(() => {
      gsap.to(section, { opacity: 1, duration: 0.5, ease: 'power2.out' });
    }, 6000);

    // ScrollTrigger to show section
    ScrollTrigger.create({
      trigger: section,
      start: 'top bottom+=40vh',
      onEnter: () => {
        clearTimeout(fallback);
        gsap.to(section, { opacity: 1, duration: 0.6, ease: 'power2.out' });
      },
      onLeaveBack: () => {
        gsap.to(section, { opacity: 0, duration: 0.3, ease: 'power2.in' });
      },
    });

    // Refined main timeline with corrected positioning
    const mainTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 10%',
        end: '+=4500', // Slightly reduced for better pacing
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        markers: false,
        invalidateOnRefresh: true,
        snap: {
          snapTo: 'labels',
          duration: { min: 0.4, max: 1.0 },
          ease: 'power3.inOut',
          delay: 0.2,
        },
      },
    });

    // Improved card sequence with refined scroll pacing
    const addCardSequence = async (cards: any[], line: HTMLElement, sectionLabel: string) => {
      mainTimeline.addLabel(`${sectionLabel}-start`);
      
      // Load first card content before showing anything
      mainTimeline.add(() => {
        updateCard(cards[0]);
      });
      
      // Show line and first card with staggered timing
      mainTimeline
        .to(line, { 
          opacity: 1, 
          y: 0, 
          duration: 1.5,
          ease: 'power3.out' 
        })
        .to(currentCard, { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 1.5,
          ease: 'power3.out' 
        }, '-=0.8')
        .addLabel(`${sectionLabel}-card1`)
        .to({}, { duration: 1.2 }); // Hold first card longer

      // Card transitions with more spacing and refined timing
      cards.slice(1).forEach((card, index) => {
        mainTimeline
          .addLabel(`${sectionLabel}-transition-${index + 2}-start`)
          .to({}, { duration: 0.8 }) // Longer pause for better scroll feel
          .to(currentCard, { 
            opacity: 0, 
            y: -30,
            scale: 0.92,
            rotation: 0.5,
            duration: 1.0,
            ease: 'power3.inOut' 
          })
          .add(() => {
            updateCard(card);
          })
          .to(currentCard, { 
            opacity: 1, 
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: 'power3.out' 
          }, '+=0.2')
          .addLabel(`${sectionLabel}-card${index + 2}`)
          .to({}, { duration: 1.0 }); // Hold each card
      });

      // Exit with refined animation
      mainTimeline
        .to({}, { duration: 1.2 })
        .to([line, currentCard], { 
          opacity: 0, 
          y: -30,
          scale: 0.92,
          rotation: -0.5,
          duration: 1.0,
          ease: 'power3.inOut' 
        })
        .addLabel(`${sectionLabel}-end`);
    };

    // Build timeline with better section spacing
    const buildTimeline = async () => {
      // Section 1: Cafes
      addCardSequence(sections[0].cards, line1, 'cafes');
      mainTimeline.to({}, { duration: 0.8 });

      // Section 2: Restaurants
      addCardSequence(sections[1].cards, line2, 'restaurants');
      mainTimeline.to({}, { duration: 0.8 });

      // Section 3: UI and Websites
      addCardSequence(sections[2].cards, line3, 'ui');
      mainTimeline.to({}, { duration: 1.2 });

      // Optimized final section - clean and minimal
      mainTimeline.addLabel('final-start');
      mainTimeline
        .to(finalLine, { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.8,
          ease: 'power3.out' 
        })
        .addLabel('final-hold')
        .to({}, { duration: 2.5 }) // Extended hold for impact
        .to(finalLine, { 
          opacity: 0, 
          y: -20,
          scale: 0.9,
          duration: 1.0,
          ease: 'power3.in' 
        });
      mainTimeline.addLabel('final-end');
    };

    buildTimeline();

    // Cleanup function
    return () => {
      clearTimeout(fallback);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf('*');
      mainTimeline.kill();
    };
  }, []);

  return (
    <div ref={sectionRef} className="w-full min-h-screen bg-transparent relative z-20">
      <div ref={contentRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center">
        {/* All lines positioned absolutely to occupy same space */}
        <div className="relative mt-20 ">
          <div className="text-center">
            <h2 ref={line1Ref} className="absolute inset-0 text-7xl font-bold text-black font-heading flex items-center justify-center">
              Some demos Grafics of Cafes
            </h2>
            <h2 ref={line2Ref} className="absolute inset-0 text-6xl font-bold text-black font-heading flex items-center justify-center">
              Some demos Grafics of Restaurants
            </h2>
            <h2 ref={line3Ref} className="absolute inset-0 text-7xl font-bold text-black font-heading flex items-center justify-center">
              Some demos of UI 
            </h2>
            {/* Optimized final line - standalone without card background */}
            <h2 ref={finalLineRef} className="absolute inset-0 text-6xl font-bold text-gray-800 font-heading flex items-center justify-center mt-60 w-full h-full">
              Let Us ShowCase Your Business
            </h2>
          </div>
          {/* Invisible spacer to maintain height */}
          <div className="text-5xl font-bold text-transparent font-heading text-center">
            Some demos of Placeholder
          </div>
        </div>

        {/* Fixed Card Container with improved structure and overflow hidden for image animations */}
        <div ref={cardContainerRef} className="flex justify-center items-center flex-grow">
          <div
            ref={currentCardRef}
            className="w-full  bg-transparent shadow-2xl rounded-3xl p-2 flex items-center justify-center gap-8 hover:shadow-3xl transition-all duration-300 border-2 border-white cafe-bg-1 relative h-96 mb-16 overflow-hidden"
          >
            <div className="flex-shrink-0 overflow-hidden">
              <img
                src={cafedemo1}
                alt="Demo"
                className="max-w-[28rem] rounded-2xl shadow-lg absolute -top-14 -left-5 -z-10 -rotate-6 transition-transform duration-300"
                loading="eager"
                style={{
                  willChange: 'transform, opacity'
                }}
              />
            </div>
            <div className="flex flex-col justify-center space-y-4 flex-grow items-end px-5">
              <h3 className="card-heading text-5xl font-bold text-[#4B2E39] font-heading leading-tight transition-colors duration-300 text-right max-w-3xl">
                Cafe Mocha
              </h3>
              <p className="card-subtext text-md text-[#6B4E56] font-body leading-relaxed transition-colors duration-300 text-right max-w-2xl">
                Cozy ambiance with artisan coffee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socialcard;