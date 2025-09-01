import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SketchLineProps {
  startRef: React.RefObject<HTMLDivElement|null>;
  endRef: React.RefObject<HTMLDivElement|null>;
}

const SketchLine = ({ startRef, endRef }: SketchLineProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!startRef.current || !endRef.current || !svgRef.current || !pathRef.current) return;

    const path = pathRef.current;
    let pathLength = 0;

    const updatePath = () => {
      if (!startRef.current || !endRef.current || !svgRef.current || !pathRef.current) return;

      const startRect = startRef.current.getBoundingClientRect();
      const endRect = endRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();

      // Calculate start point 70vh down from the original position
      const startX = startRect.left + startRect.width / 2 - svgRect.left;
      const startY = startRect.bottom - svgRect.top + (window.innerHeight * 0.7); // Added 70vh down
      
      // Calculate end point at the center-top of the social card
      const endX = endRect.left + endRect.width / 2 - svgRect.left;
      const endY = endRect.top - svgRect.top;

      // Create a natural, slightly curved path with longer distance
      const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
      const curvature = distance * 0.15; // Slightly increased curvature for longer path
      
      const controlX = (startX + endX) / 2 + (startX > endX ? -curvature : curvature) * 0.4;
      const controlY = (startY + endY) / 2 - curvature;

      const pathD = `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
      pathRef.current.setAttribute('d', pathD);
      
      // Update path length for dash animation
      pathLength = path.getTotalLength();
      return pathLength;
    };

    const resetLine = () => {
      // Clear any pending timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      // Kill any existing animation
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      
      // Reset line to hidden state
      gsap.set(path, { 
        strokeDasharray: pathLength || 1000, 
        strokeDashoffset: pathLength || 1000,
        opacity: 0 
      });
    };

    const animateLine = () => {
      // Kill any existing animation first
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }

      // Update path and get new length
      const newPathLength = updatePath();
      
      // Set initial state - line hidden
      gsap.set(path, { 
        strokeDasharray: newPathLength, 
        strokeDashoffset: newPathLength,
        opacity: 1 
      });

      // Animate line drawing with longer duration for smoother effect
      animationRef.current = gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.5, // Increased duration for longer line
        ease: 'power2.out',
      });
    };

    const handleBentoGridVisible = () => {
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      // Start line animation 6 seconds after bento grids complete their animation
      timeoutRef.current = setTimeout(() => {
        animateLine();
      }, 6000); // Increased to 6 seconds as requested
    };

    // Initialize
    updatePath();
    resetLine();

    // Create ScrollTrigger - trigger when bento grid section becomes visible
    const scrollTrigger = ScrollTrigger.create({
      trigger: startRef.current,
      start: 'top 80%', // Start when bento section comes into view
      end: 'bottom 20%', // End when bento section leaves
      onEnter: handleBentoGridVisible,
      onLeave: resetLine,
      onEnterBack: handleBentoGridVisible,
      onLeaveBack: resetLine,
      refreshPriority: -1,
      // Add markers for debugging (remove in production)
      markers: false, // Set to true to see trigger points
    });

    // Handle window resize
    const handleResize = () => {
      updatePath();
      ScrollTrigger.refresh();
    };

    // Throttled resize handler
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', throttledResize);

    // Cleanup function
    return () => {
      clearTimeout(resizeTimeout);
      window.removeEventListener('resize', throttledResize);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      
      scrollTrigger.kill();
      gsap.killTweensOf(path);
    };
  }, [startRef, endRef]);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'fixed', // Changed from absolute to fixed
        width: '100vw',
        height: '200vh', // Increased height to accommodate longer line
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 5, // Higher z-index to ensure visibility
        overflow: 'visible'
      }}
    >
      <path
        ref={pathRef}
        fill="none"
        stroke="#333"
        strokeWidth="3" // Increased width for better visibility
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
          filter: 'url(#sketchFilter)',
          opacity: 0
        }}
      />
      <defs>
        <filter id="sketchFilter" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.04" 
            numOctaves="3" 
            result="noise" 
          />
          <feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale="1.5" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </defs>
    </svg>
  );
};

export default SketchLine;