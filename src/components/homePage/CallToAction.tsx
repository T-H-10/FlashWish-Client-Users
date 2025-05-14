import { motion } from 'framer-motion';
import '../cssPages/home/CallToAction.css'

const CallToAction = () => {
  return (
    <section className="cta-section">
      <div className="cta-cosmic-particles">
        <div className="cta-particle p1"></div>
        <div className="cta-particle p2"></div>
        <div className="cta-particle p3"></div>
      </div>
      
      <motion.div 
        className="cta-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="cta-title">מוכנים ליצור את הברכה המושלמת?</h2>
        <p className="cta-description">
          התחילו עכשיו ותוכלו ליצור ברכות מרהיבות לכל אירוע בקלות ובמהירות
        </p>
        
        <button className="cosmic-button primary large">
          <span className="button-text">צור ברכה עכשיו</span>
          <div className="button-glow"></div>
        </button>
      </motion.div>
    </section>
  );
};

export default CallToAction;