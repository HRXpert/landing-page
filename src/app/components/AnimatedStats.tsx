import React, { useState, useEffect, useRef } from 'react';

interface StatItemProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-gray-400 text-sm">{label}</div>
    </div>
  );
};

const AnimatedStats: React.FC = () => {
  const stats = [
    { value: 10000, label: 'Successful Hires', suffix: '+' },
    { value: 500, label: 'Companies Trust Us', suffix: '+' },
    { value: 75, label: 'Faster Hiring', suffix: '%' },
    { value: 95, label: 'Match Accuracy', suffix: '%' }
  ];

  return (
    <section className="py-16" style={{ background: '#181f29', borderBottom: '8px solid #151b24' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of companies that have transformed their hiring process with HRXpert
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedStats; 