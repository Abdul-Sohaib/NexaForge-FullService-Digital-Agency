import { useEffect, useRef, useState } from 'react';
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
  const imageContainerRef = useRef<HTMLDivElement>(null);
  
  // State for image loading
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload image for better performance
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      setImageError(true);
    };
    img.src = heroimg;
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const container = containerRef.current;
    const imageContainer = imageContainerRef.current;
    if (!hero || !headingRef.current || !paragraphRef.current || !imageRef.current || !carouselRef.current || !container || !imageContainer) return;

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
    const typeWriter = (element: HTMLElement, text: string, speed: number = 25): Promise<void> => {
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
      
      // Check screen width using md breakpoint (768px)
      const isMobile = window.innerWidth <= 768;
      const customMobile = window.innerWidth >= 300 && window.innerWidth <= 600;

      // Initially set up the layout
      gsap.set(heroContent, { 
        width: '100%',
        transition: 'none'
      });
      gsap.set(imageContainer, { 
        opacity: (isMobile && !customMobile) ? 0 : 0, // Hide for mobile except 412px
        width: (isMobile && !customMobile) ? '0%' : '0%',
        overflow: 'hidden',
        display: customMobile ? 'flex' : (isMobile ? 'none' : 'flex')
      });
      
      // Typewriter for heading
      await typeWriter(headingRef.current!, headingText);
      
      // Small delay between heading and paragraph
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Typewriter for paragraph
      await typeWriter(paragraphRef.current!, paragraphText);
      
      // Delay before repositioning
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create a smooth transition timeline for image container
      const tl = gsap.timeline();
      
      // Animate layout based on screen size
      if (!isMobile || customMobile) {
        // Desktop animation (md and above) OR custom mobile (412px)
        const contentWidth = customMobile ? '100%' : '66.666667%'; // Adjust width for 412px
        const imageWidth = customMobile ? '100%' : '33.333333%'; // Adjust width for 412px
        
        tl.to(heroContent, {
          width: contentWidth,
          duration: 1.5,
          ease: 'power3.inOut'
        }, 0)
        .to(imageContainer, {
          width: imageWidth,
          opacity: 1,
          duration: 1.5,
          ease: 'power3.inOut'
        }, 0);
      } else {
        // Regular mobile: keep full width, keep image hidden
        tl.to(heroContent, {
          width: '100%',
          duration: 1.5,
          ease: 'power3.inOut'
        }, 0);
      }
      
      // Wait for layout animation to complete
      await new Promise(resolve => {
        tl.call(() => resolve(true), [], 1.5);
      });
      
      // Small delay before image animation (for desktop AND 412px)
      if (!isMobile || customMobile) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        // Wait for image to be fully loaded before showing it
        if (imageLoaded && !imageError) {
          // Smooth fade in image with enhanced animation
          await new Promise(resolve => {
            const imageScale = customMobile ? 0.8 : 0.9; // Slightly smaller scale for 412px
            const imageDuration = customMobile ? 1.2 : 1.5; // Faster animation for 412px
            
            gsap.fromTo(
              imageRef.current,
              { 
                opacity: 0, 
                scale: imageScale,
                y: customMobile ? 20 : 30, // Less movement for 412px
                rotationY: customMobile ? 10 : 15 // Less rotation for 412px
              },
              { 
                opacity: 1, 
                scale: 1,
                y: 0,
                rotationY: 0,
                duration: imageDuration, 
                ease: 'power3.out',
                onComplete: () => resolve(true)
              }
            );
          });
        }
      }

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

    // Cleanup on unmount
    return () => {
      enableScroll(); // Make sure to re-enable scroll on cleanup
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      // eslint-disable-next-line react-hooks/exhaustive-deps
      gsap.killTweensOf(carouselRef.current);
    };
  }, [imageLoaded, imageError]); // Add imageLoaded and imageError to dependencies

  // Handle image load - now just a fallback
  const handleImageLoad = () => {
    if (!imageLoaded) {
      setImageLoaded(true);
    }
  };

  // Handle image error
  const handleImageError = () => {
    setImageError(true);
  };
  
  // Optimized carousel items - consistent styling
  const carouselItems = Array(8).fill(null); // Optimal number for smooth looping

  return (
    <div
      ref={heroRef}
      className="hero-section relative flex flex-col items-center justify-center min-h-[60vh] bg-transparent mt-28 2xl:mt-[16vh] sm:mt-32 md:mt-[15rem] lg:mt-[16vh]"
    >
      <div 
        ref={containerRef}
        className="flex flex-col items-center justify-between w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 customwidth:mt-[0vh] md:flex-row"
      >
        <div className="hero-content text-left flex flex-col justify-center items-start font-heading will-change-[width] min-h-[200px]"
        >
          <motion.h1
            ref={headingRef}
            className="text-3xl sm:text-4xl md:text-5xl xs:text-4xl font-bold text-black mb-6 2xl:leading-snug lg:leading-tight md:leading-tight sm:leading-tight xs:leading-tight font-heading"
            initial={{ opacity: 1 }}
          >
            {/* Text will be populated by typewriter effect */}
          </motion.h1>
          <motion.p
            ref={paragraphRef}
            className="text-sm sm:text-base md:text-lg lg:text-xl xs:text-lg font-body text-black max-w-full customwidth:w-screen"
            initial={{ opacity: 1 }}
          >
            {/* Text will be populated by typewriter effect */}
          </motion.p>
        </div>
        
        <div 
          ref={imageContainerRef}
          className="justify-center mt-8 md:mt-0 will-change-[width,opacity] min-h-[200px] items-center hidden md:flex"
        >
          {/* ImageLoader - shows until image is loaded */}
        
                   
          {/* Error State */}
          {imageError && (
            <div className="max-w-full 2xl:h-[40vh] lg:h-[70vh] xs:h-[40vh] bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center text-gray-500">
                <svg 
                  className="w-16 h-16 mx-auto mb-2 text-gray-400" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
                </svg>
                <p>Image failed to load</p>
              </div>
            </div>
          )}
                   
          {/* Actual Image - shows only when fully loaded */}
          {imageLoaded && !imageError && (
            <img
              ref={imageRef} 
              src={heroimg} 
              alt="Hero" 
              className="max-w-full 2xl:h-[70vh] lg:h-[70vh] xs:h-[40vh] opacity-0"
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          )}
        </div>
      </div>
      
      {/* Optimized Carousel Section */}
      <div className="w-full overflow-hidden
                  customwidth:mt-[9vh]
                  xs:mt-[2vh]
                  sm:mt-[10vh]
                  md:mt-[30vh]
                  lg:mt-[10vh]
                  xl:mt-[10vh]
                  2xl:mt-[8vh]
                  3xl:mt-[10vh]">

        <div
          ref={carouselRef}
          className="flex flex-nowrap items-center"
          style={{ width: 'fit-content' }}
        >
          {/* First set of items */}
          {carouselItems.map((_, index) => (
            <div key={`set1-${index}`} className="carousel-item flex items-center flex-shrink-0 px-4 sm:px-8">
              <span className="carousel-text text-base sm:text-lg font-semibold text-black uppercase whitespace-nowrap mr-4 sm:mr-6">
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
            <div key={`set2-${index}`} className="carousel-item flex items-center flex-shrink-0 px-4 sm:px-8">
              <span className="carousel-text text-base sm:text-lg font-semibold text-black uppercase whitespace-nowrap mr-4 sm:mr-6">
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