import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "../data/portfolioData";
import ProductModal from "../components/ProductModal";
import Footer from "../components/Footer";

const CrochetStore = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="bg-brand-brown text-white py-6 sticky top-0 z-40 shadow-lg">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center gap-2 hover:text-brand-gold transition-colors"
            >
              <ArrowLeft size={24} />
              <span className="text-lg font-semibold">back to home</span>
            </Link>
            <h1 className="text-3xl font-display font-bold">crocheted store</h1>
            <div className="w-24"></div>
          </div>
        </div>
      </header>

      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-display font-bold text-brand-brown mb-4">
            crocheted store
          </h2>
          <p className="text-xl text-gray-700 italic font-script">
            by rya sketchbook
          </p>
          <p className="text-lg text-gray-600 mt-4">
            curated handmade creations to brighten your day.
          </p>
        </motion.div>

        {/* Products Grid - Same as home */}
        <div className="product-grid">
          {portfolioData.crochet.products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="product-card group aesthetic-hover"
            >
              <div
                className="aspect-square overflow-hidden"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 cursor-pointer"
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
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
      <Footer />
    </div>
  );
};

export default CrochetStore;
