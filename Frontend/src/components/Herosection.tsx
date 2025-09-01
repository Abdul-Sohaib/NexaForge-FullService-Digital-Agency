import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import heroimg from '../assets/heroimg.png';
import togethersvg from '../assets/together.svg';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const Herosection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const container = containerRef.current;
    if (!hero || !headingRef.current || !paragraphRef.current || !imageRef.current || !carouselRef.current || !container) return;

    // Function to disable scrolling
    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
      document.documentElement.style.overflow = 'hidden';
    };

    // Function to enable scrolling
    const enableScroll = () => {
      document.body.style.overflow = '';
      document.body.style.height = '';
      document.documentElement.style.overflow = '';
    };

    // Disable scroll at the start of animation
    disableScroll();

    // Store original text content
    const headingText = "Forging Stronger Connections for Your Brand. Your Brand, Our Creative Forge";
    const paragraphText = "Your ideas, our expertise together forging digital solutions that inspire and deliver.";
    
    // Clear content initially
    headingRef.current.textContent = '';
    paragraphRef.current.textContent = '';

    // Typewriter effect function
    const typeWriter = (element: HTMLElement, text: string, speed: number = 50): Promise<void> => {
      return new Promise((resolve) => {
        let i = 0;
        element.textContent = ''; // Ensure element is empty before starting
        const timer = setInterval(() => {
          if (i < text.length) {
            element.textContent = text.substring(0, i + 1);
            i++;
          } else {
            clearInterval(timer);
            resolve();
          }
        }, speed);
      });
    };

    // Animation sequence
    const animateSequence = async () => {
      const heroContent = headingRef.current!.parentElement!;
      const imageContainer = imageRef.current!.parentElement!;
      
      // Initially set up the layout - text takes full width, image is hidden
      gsap.set(heroContent, { 
        width: '100%',
        transition: 'none'
      });
      gsap.set(imageContainer, { 
        opacity: 0,
        width: '0%',
        overflow: 'hidden'
      });
      
      // Typewriter for heading
      await typeWriter(headingRef.current!, headingText);
      
      // Small delay between heading and paragraph
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Typewriter for paragraph
      await typeWriter(paragraphRef.current!, paragraphText);
      
      // Delay before repositioning
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a smooth transition timeline
      const tl = gsap.timeline();
      
      // Simultaneously animate text width down and image container width up
      tl.to(heroContent, {
        width: '66.666667%', // equivalent to w-2/3
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0)
      .to(imageContainer, {
        width: '33.333333%', // equivalent to w-1/3
        opacity: 1,
        duration: 1.5,
        ease: 'power3.inOut'
      }, 0);
      
      // Wait for layout animation to complete
      await new Promise(resolve => {
        tl.call(() => resolve(true), [], 1.5);
      });
      
      // Small delay before image animation
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Smooth fade in image with enhanced animation
      await new Promise(resolve => {
        gsap.fromTo(
          imageRef.current,
          { 
            opacity: 0, 
            scale: 0.9,
            y: 30,
            rotationY: 15
          },
          { 
            opacity: 1, 
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 1.5, 
            ease: 'power3.out',
            onComplete: () => resolve(true)
          }
        );
      });

      // Optimized seamless carousel animation
      const carousel = carouselRef.current;
      if (!carousel) return;

      // Wait for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 100)); 
      
      // Calculate the width of one complete set of items
      const firstItem = carousel.querySelector('.carousel-item');
      if (!firstItem) return;
      
      const itemWidth = firstItem.getBoundingClientRect().width;
      const totalItems = carousel.children.length / 2; // We have two sets of items
      const oneSetWidth = itemWidth * totalItems;

      // Set initial position
      gsap.set(carousel, { x: 0 });

      // Create smooth infinite scroll
      gsap.to(carousel, {
        x: -oneSetWidth,
        duration: 25, // Slower, smoother animation
        ease: 'none',
        repeat: -1,
        immediateRender: false
      });

      // Smooth SVG rotation
      const svgs = carousel.querySelectorAll('.carousel-svg');
      gsap.to(svgs, {
        rotation: 360,
        duration: 6, // Slower rotation for smoother effect
        ease: 'none',
        repeat: -1,
        transformOrigin: 'center center'
      });

      // Enable scroll immediately after all animations are complete
      enableScroll();
    };

    // Start the animation sequence
    animateSequence();

    // Scroll-triggered fade-out for hero section (only applies after scroll is enabled)

    // Cleanup on unmount
    return () => {
      enableScroll(); // Make sure to re-enable scroll on cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      gsap.killTweensOf(carouselRef.current);
    };
  }, []);
  
  // Optimized carousel items - consistent styling
  const carouselItems = Array(8).fill(null); // Optimal number for smooth looping

  return (
    <div
      ref={heroRef}
      className="hero-section relative flex flex-col items-center justify-center min-h-[60vh] bg-transparent mt-[9vh]"
    >
      <div 
        ref={containerRef}
        className="flex flex-col md:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="hero-content text-left flex flex-col justify-center items-start font-heading will-change-[width] min-h-[200px]">
          <motion.h1
            ref={headingRef}
            className="text-5xl font-bold text-black mb-6 leading-snug"
            initial={{ opacity: 1 }}
          >
            {/* Text will be populated by typewriter effect */}
          </motion.h1>
          <motion.p
            ref={paragraphRef}
            className="text-xl font-body text-black max-w-full"
            initial={{ opacity: 1 }}
          >
            {/* Text will be populated by typewriter effect */}
          </motion.p>
        </div>
        <div className="flex justify-center mt-8 md:mt-0 will-change-[width,opacity] min-h-[200px] items-center">
          <img 
            ref={imageRef} 
            src={heroimg} 
            alt="Hero" 
            className="max-w-full h-auto opacity-0 transform" 
          />
        </div>
      </div>
      
      {/* Optimized Carousel Section */}
      <div className="w-full overflow-hidden mt-8">
        <div
          ref={carouselRef}
          className="flex flex-nowrap items-center"
          style={{ width: 'fit-content' }}
        >
          {/* First set of items */}
          {carouselItems.map((_, index) => (
            <div key={`set1-${index}`} className="carousel-item flex items-center flex-shrink-0 px-8">
              <span className="carousel-text text-lg font-semibold text-black uppercase whitespace-nowrap mr-6">
                Let's Build Together
              </span>
              <img 
                src={togethersvg} 
                alt="decorative icon" 
                className="carousel-svg w-6 h-6 flex-shrink-0" 
              />
            </div>
          ))}
          {/* Second set of items for seamless loop */}
          {carouselItems.map((_, index) => (
            <div key={`set2-${index}`} className="carousel-item flex items-center flex-shrink-0 px-8">
              <span className="carousel-text text-lg font-semibold text-black uppercase whitespace-nowrap mr-6">
                Let's Build Together
              </span>
              <img 
                src={togethersvg} 
                alt="decorative icon" 
                className="carousel-svg w-6 h-6 flex-shrink-0" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Herosection;