import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../data/portfolioData";

const Header = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <header className="relative w-full bg-brand-cream-dark">
      {/* Top Bar - Community Stats */}
      <div className="w-full bg-brand-primary text-white py-3 border-b border-brand-primary/10">
        <div className="container-custom flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-brand-accent">✨</span>
            <span>
              Hi! Welcome to <strong>rya's sketchbook</strong> .
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Video Background */}
      <div className="w-full aspect-video">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-contain bg-brand-cream-dark"
          poster={portfolioData.hero.videoPlaceholder}
        >
          <source src={portfolioData.hero.videoUrl} type="video/mp4" />
        </video>
      </div>
      {/* Hero Content */}

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1,
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full"></div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
