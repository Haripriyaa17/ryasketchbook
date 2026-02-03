import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="relative max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 z-10 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center hover:bg-brand-gold transition-colors"
          >
            <X size={24} className="text-brand-brown" />
          </button>

          {/* Product Image Only */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-brand-gold">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/1200x800/f8f9ff/151361?text=" +
                  product.name;
              }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProductModal;
