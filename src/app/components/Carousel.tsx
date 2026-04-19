import React, { useRef, useEffect } from 'react';

interface CarouselProps {
  title: string;
  children: React.ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ title, children }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const scrollDirection = useRef<null | 'left' | 'right'>(null);

  // Mouse move handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width / 3) {
      scrollDirection.current = 'left';
    } else if (x > (2 * rect.width) / 3) {
      scrollDirection.current = 'right';
    } else {
      scrollDirection.current = null;
    }
  };

  // Mouse leave handler
  const handleMouseLeave = () => {
    scrollDirection.current = null;
  };

  // Animation loop
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    // let lastScroll = 0;
    const scrollStep = () => {
      if (scrollDirection.current === 'left') {
        container.scrollLeft -= 2;
      } else if (scrollDirection.current === 'right') {
        container.scrollLeft += 2;
      }
      animationRef.current = requestAnimationFrame(scrollStep);
    };
    if (scrollDirection.current) {
      animationRef.current = requestAnimationFrame(scrollStep);
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Start/stop animation on direction change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onMove = () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (scrollDirection.current) {
        animationRef.current = requestAnimationFrame(function scrollStep() {
          if (scrollDirection.current === 'left') {
            container.scrollLeft -= 2;
          } else if (scrollDirection.current === 'right') {
            container.scrollLeft += 2;
          }
          animationRef.current = requestAnimationFrame(scrollStep);
        });
      }
    };
    document.addEventListener('mousemove', onMove);
    return () => {
      document.removeEventListener('mousemove', onMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div className="mb-8">
      <h2 className="font-bold text-xl mb-4 text-white">{title}</h2>
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar py-2 px-1 h-full items-stretch"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {React.Children.map(children, (child) => (
          <div className="flex-shrink-0 w-[340px] md:w-[380px] lg:w-[400px] h-full flex flex-col">{child}</div>
        ))}
      </div>
    </div>
  );
};

export default Carousel; 