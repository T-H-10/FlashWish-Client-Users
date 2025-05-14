import { motion } from 'framer-motion';
import '../cssPages/home/FeatureCards.css';
const FeatureCards = () => {
  const features = [
    {
      icon: '✨',
      title: 'עיצובים מרהיבים',
      description: 'מגוון רחב של תבניות מעוצבות בקפידה לכל אירוע ומטרה'
    },
    {
      icon: '🎨',
      title: 'התאמה אישית',
      description: 'אפשרויות עריכה מתקדמות להתאמת הברכה בדיוק לצרכים שלכם'
    },
    {
      icon: '🚀',
      title: 'קל ומהיר',
      description: 'ממשק ידידותי שמאפשר יצירת ברכות מקצועיות תוך דקות ספורות'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="features-section">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        למה לבחור בנו?
      </motion.h2>
      
      <motion.div 
        className="features-container"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="feature-card"
            variants={itemVariants}
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3 className="feature-title">{feature.title}</h3>
            <p className="feature-description">{feature.description}</p>
            <div className="card-glow"></div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default FeatureCards;