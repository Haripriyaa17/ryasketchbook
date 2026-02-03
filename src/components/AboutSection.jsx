import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../data/portfolioData";

const AboutSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-brand-background" id="about">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-6xl md:text-7xl font-display font-bold text-brand-primary mb-12 text-center">
            {portfolioData.about.title}
          </h2>

          {/* Video Container */}
          <div className="video-container rounded-2xl overflow-hidden shadow-brand-lg mb-8">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
              poster={portfolioData.about.videoPoster}
            >
              <source src={portfolioData.about.videoUrl} type="video/mp4" />
            </video>
          </div>

          {/* Text Content */}
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              {portfolioData.about.intro}
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              {portfolioData.about.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
