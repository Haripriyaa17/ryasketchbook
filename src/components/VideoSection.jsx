import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const VideoSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-white" id="templates">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="text-4xl"></span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-brand-brown">
              {portfolioData.videos?.title ?? "Video Editing"}
            </h2>
          </div>

          {Array.isArray(portfolioData.videos?.badges) &&
            portfolioData.videos.badges.length > 0 && (
              <div className="flex flex-wrap gap-4 justify-center">
                {portfolioData.videos.badges.map((badge, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-brand-gold text-brand-brown rounded-full font-semibold flex items-center gap-2 shadow-lg"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {(portfolioData.videos?.items ?? []).map((item, index) => (
            <motion.a
              key={item.id}
              href={item.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="block bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 border-4 border-brand-brown aesthetic-hover"
            >
              <div className="relative">
                <div className="aspect-[9/16] bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x450/1a1a1a/ffffff?text=" +
                        item.title;
                    }}
                  />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
