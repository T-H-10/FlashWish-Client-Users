import { useState } from 'react';
import { Outlet } from 'react-router';
import './cssPages/Gallery.css';
import CategoriesList from './CategoriesList';

const Gallery = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);

    return (
        <div className="cosmic-gallery-container">
            <div className="cosmic-background">
                <div className="nebula-layer"></div>
                <div className="stars-layer">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <div 
                            key={index}
                            className="cosmic-particle"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 3 + 1}px`,
                                height: `${Math.random() * 3 + 1}px`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${Math.random() * 5 + 5}s`
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
            
            <div className="cosmic-gallery-content">
                <div className="cosmic-panel categories-panel">
                    <div className="panel-glow"></div>
                    <h2 className="panel-title">בחר קטגוריה:</h2>
                    <CategoriesList onCategorySelect={setSelectedCategoryId} />
                </div>
                
                <div className="cosmic-panel templates-panel">
                    <div className="panel-glow"></div>
                    <Outlet context={{ selectedCategoryId }} />
                </div>
            </div>
        </div>
    );
};

export default Gallery;