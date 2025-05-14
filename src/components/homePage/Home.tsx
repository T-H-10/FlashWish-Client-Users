// import UseStylesHome from "./style/UseStyleHome";

import CosmicBackground from "./CosmicBackground";
import DesignExamples from "./DesignExamples";
import FeatureCards from "./FeatureCards";
import HeroSection from "./HeroSection";
import CallToAction from "./CallToAction";
import '../cssPages/home/HomePage.css'
const Home = () => {
    // const classes = UseStylesHome();

    return (
        <>
        <div className="home-page">
      <CosmicBackground />
      <div className="home-content">
        <HeroSection />
        <FeatureCards />
        <DesignExamples />
        <CallToAction />
      </div>
    </div>
        </>
    );
};

export default Home;