import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "../data/portfolioData";

const CrochetSection = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section
      className="section-padding bg-brand-cream-dark pt-4 sm:pt-6"
      id="crochet"
    >
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-brand-brown mb-4">
            {portfolioData.crochet.title}
          </h2>
          <p className="text-xl text-gray-700 font-body italic">
            {portfolioData.crochet.description}
          </p>
        </motion.div>

        <div className="product-grid mb-12">
          {portfolioData.crochet.products.slice(0, 6).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="product-card group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/400x400/f8f9ff/151361?text=" +
                      product.name;
                  }}
                />
              </div>

              <div className="p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-display font-semibold text-brand-brown mb-1">
                    {product.name}
                  </h3>
                  <span className="text-2xl font-bold text-brand-brown">
                    ₹{product.price}
                  </span>
                </div>
                <Link
                  to={`/order?product=${product.id}`}
                  className="p-4 bg-brand-brown text-white rounded-full hover:bg-brand-brown-dark transition-all shadow-lg hover:shadow-xl hover:scale-110"
                >
                  <ShoppingBag size={24} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <Link
            to="/crochet-store"
            className="btn-primary inline-flex items-center gap-2"
          >
            <span>Show me more</span>
            <ArrowRight size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CrochetSection;
