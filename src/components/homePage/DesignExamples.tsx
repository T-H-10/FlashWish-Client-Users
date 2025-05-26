import { useState } from 'react';
import { motion } from 'framer-motion';
import '../cssPages/home/DesignExamples.css';

const DesignExamples = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const designs = [
    {
      title: 'עיצוב קלאסי',
      image: import.meta.env.VITE_STANDART_EXAMPLE_URL,
      description: 'עיצוב אלגנטי המתאים לכל אירוע חגיגי'
    },
    {
      title: 'עיצוב מודרני',
      image: import.meta.env.VITE_MODERN_EXAMPLE_URL,
      description: 'מראה נקי ועכשווי עם דגש על מינימליזם'
    },
    {
      title: 'עיצוב צבעוני',
      image: import.meta.env.VITE_COLORFULL_EXAMPLE_URL,
      description: 'שילוב צבעים עשיר ומרהיב לאירועים שמחים'
    }
  ];

  return (
    <section className="designs-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        דוגמאות לעיצובים
      </motion.h2>
      
      <div className="designs-showcase">
        <div className="designs-carousel">
          {designs.map((design, index) => (
            <motion.div 
              key={index}
              className={`design-card ${activeIndex === index ? 'active' : ''}`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setActiveIndex(index)}
            >
              <div className="design-image-container">
                <img src={design.image || "/placeholder.svg"} alt={design.title} className="design-image" />
                <div className="image-overlay">
                  <span className="view-text">דוגמה</span>
                </div>
              </div>
              <div className="design-info">
                <h3 className="design-title">{design.title}</h3>
                <p className="design-description">{design.description}</p>
              </div>
              <div className="card-constellation">
                <div className="constellation-star cs1"></div>
                <div className="constellation-star cs2"></div>
                <div className="constellation-star cs3"></div>
                <div className="constellation-line"></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="designs-navigation">
          {designs.map((_, index) => (
            <button 
              key={index} 
              className={`nav-dot ${activeIndex === index ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignExamples;