import { motion } from 'framer-motion';
import '../cssPages/home/HeroSection.css';

const HeroSection = () => {
  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.8, 
        delay: 0.3,
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          <span className="gradient-text">ברוכים הבאים</span> לעולם הברכות הקסום
        </motion.h1>
        
        <motion.p 
          className="hero-description"
          initial="hidden"
          animate="visible"
          variants={textVariants}
        >
          צרו ברכות מרהיבות ואישיות בקלות ובמהירות. בחרו תבנית, הוסיפו תוכן, והפכו רגעים מיוחדים לבלתי נשכחים.
        </motion.p>
        
        <motion.div 
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <button className="cosmic-button primary">
            <span className="button-text">צור ברכה חדשה</span>
            <div className="button-glow"></div>
          </button>
          {/* <button className="cosmic-button secondary">
            <span className="button-text">גלה עיצובים</span>
            <div className="button-glow"></div>
          </button> */}
        </motion.div>
      </div>
      
      <div className="hero-decoration">
        <div className="cosmic-orb">
          <div className="orb-ring"></div>
          <div className="orb-core"></div>
          <div className="orb-glow"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;