import '../../cssPages/messages/GeneratorLoading.css';

const GeneratorLoading = () => {
  return (
    <div className="cosmic-generator-loading">
      <div className="loading-animation">
        <div className="cosmic-brain">
          <div className="brain-center"></div>
          <div className="brain-pulse p1"></div>
          <div className="brain-pulse p2"></div>
          <div className="brain-pulse p3"></div>
          
          <div className="brain-particles">
            {Array.from({ length: 8 }).map((_, index) => (
              <div 
                key={index}
                className="brain-particle"
                style={{
                  animationDelay: `${index * 0.2}s`,
                  transform: `rotate(${index * 45}deg)`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="loading-message">
        <h3 className="loading-title">יוצר ברכה מותאמת אישית</h3>
        <div className="loading-dots">
          <span className="dot dot1">.</span>
          <span className="dot dot2">.</span>
          <span className="dot dot3">.</span>
        </div>
        <p className="loading-description">
          המערכת מעבדת את הבקשה שלך ויוצרת ברכה מיוחדת
        </p>
      </div>
    </div>
  );
};

export default GeneratorLoading;