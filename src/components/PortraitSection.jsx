import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { portfolioData } from "../data/portfolioData";

const PortraitSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="section-padding relative overflow-hidden"
      id="portraits"
      style={{ backgroundColor: "#151361" }}
    >
      {/* Wavy Top Divider */}
      <div className="wave-divider">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#f8f9ff"
          ></path>
        </svg>
      </div>

      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-8 py-4 border-4 border-brand-gold rounded-full mb-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white">
              🎨 graphite art
            </h2>
          </div>
          <p className="text-xl text-white/90 font-script italic">
            Hand-drawn sketches and portraits
          </p>
        </motion.div>

        {/* Art Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioData.portraits.items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{
                scale: 1.05,
                rotate: [0, -1, 1, 0],
                transition: { duration: 0.3 },
              }}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border-4 border-brand-gold aesthetic-hover">
                {/* Art Image */}
                <div className="aspect-[3/4] overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4 }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/400x533/ffffff/151361?text=Graphite+Art";
                    }}
                  />
                </div>

                {/* Overlay with title on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-brand-brown/90 via-brand-brown/50 to-transparent flex items-end p-6"
                >
                  <div className="text-white">
                    <h3 className="text-2xl font-display font-bold mb-2">
                      {item.name}
                    </h3>
                    <p className="text-brand-gold text-sm font-script">
                      {item.description}
                    </p>
                  </div>
                </motion.div>

                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none shimmer opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Wavy Bottom Divider */}
      <div className="wave-divider transform rotate-180">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            fill="#f8f9ff"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default PortraitSection;
