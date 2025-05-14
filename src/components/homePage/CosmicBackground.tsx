import { useEffect, useRef } from 'react';
import '../cssPages/CosmicBackground.css';

const CosmicBackground = () => {
  const particlesRef = useRef<{ top: number; left: number; size: number; delay: number; duration: number; }[]>([]);
  
  useEffect(() => {
    // Generate random particles
    particlesRef.current = Array(15).fill(null).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 100 + 50,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15
    }));
  }, []);

  return (
    <div className="cosmic-background">
      <div className="nebula-layer"></div>
      <div className="stars-layer">
        {particlesRef.current.map((particle, index) => (
          <div 
            key={index}
            className="cosmic-particle"
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>
      <div className="cosmic-waves">
        <div className="cosmic-wave wave1"></div>
        <div className="cosmic-wave wave2"></div>
        <div className="cosmic-wave wave3"></div>
      </div>
    </div>
  );
};

export default CosmicBackground;