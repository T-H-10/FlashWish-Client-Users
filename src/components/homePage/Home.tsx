// import UseStylesHome from "./style/UseStyleHome";

// import { CallToAction } from "@mui/icons-material";
import CosmicBackground from "./CosmicBackground";
import DesignExamples from "./DesignExamples";
import FeatureCards from "./FeatureCards";
import HeroSection from "./HeroSection";
import '../cssPages/HomePage.css';
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
        {/* <CallToAction /> */}
      </div>
    </div>
    </>
    );
};

export default Home;