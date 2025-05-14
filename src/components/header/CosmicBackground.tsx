import React, { useEffect, useState } from 'react';
import '../cssPages/header/CosmicBackground.css';
interface CosmicParticle {
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

const CosmicBackground: React.FC = () => {
  const [particles, setParticles] = useState<CosmicParticle[]>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 15 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="cosmic-background">
      <div className="nebula-layer"></div>
      <div className="stars-layer">
        {particles.map((particle, index) => (
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