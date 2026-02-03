import Header from "../components/Header";
import CrochetSection from "../components/CrochetSection";
import VideoSection from "../components/VideoSection"; // Shows Digital Templates
import PortraitSection from "../components/PortraitSection"; // Shows Graphite Art
import AboutSection from "../components/AboutSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <CrochetSection />
      <VideoSection /> {/* Digital Templates section */}
      <PortraitSection /> {/* Graphite Art section with navy background */}
      <AboutSection />
      <Footer />
    </div>
  );
};

export default Home;
