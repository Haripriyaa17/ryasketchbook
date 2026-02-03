import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { portfolioData } from "../data/portfolioData";
import { supabase } from "../utils/supabase";
import Footer from "../components/Footer";

const OrderPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    product: productId || "",
    customDescription: "",
    courseDetails: "",
  });

  const allProducts = portfolioData.crochet.products;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("orders")
        .insert([
          {
            customer_name: formData.name,
            email: formData.email,
            phone: formData.phone,
            product_id:
              formData.product === "custom" ? "custom" : formData.product,
            product_name:
              formData.product === "custom"
                ? "Custom Order"
                : allProducts.find((p) => p.id.toString() === formData.product)
                    ?.name,
            custom_description: formData.customDescription,
            course_details: formData.courseDetails,
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) throw error;

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        product: "",
        customDescription: "",
        courseDetails: "",
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting order:", error);
      alert("Error submitting order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <header className="bg-brand-brown text-white py-6 sticky top-0 z-40 shadow-lg">
        <div className="container-custom">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-brand-gold transition-colors w-fit"
          >
            <ArrowLeft size={24} />
            <span className="text-lg">back to home</span>
          </Link>
        </div>
      </header>

      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-display font-bold text-brand-brown mb-4">
              Place Your Order
            </h1>
            <p className="text-xl text-gray-600">
              Fill in your details and we'll get back to you soon!
            </p>
          </div>

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 bg-green-50 border-2 border-green-500 rounded-2xl flex items-center gap-3"
            >
              <CheckCircle className="text-green-500" size={32} />
              <div>
                <h3 className="font-bold text-green-800 text-lg">
                  Order Submitted!
                </h3>
                <p className="text-green-700">
                  We'll contact you within 24 hours.
                </p>
              </div>
            </motion.div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border-2 border-brand-gold"
          >
            {/* Name */}
            <div className="mb-6">
              <label className="block text-brand-brown font-semibold mb-2 text-lg">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-brand-gold rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-brand-brown font-semibold mb-2 text-lg">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-brand-gold rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label className="block text-brand-brown font-semibold mb-2 text-lg">
                Phone Number (optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-brand-gold rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            {/* Product Selection */}
            <div className="mb-6">
              <label className="block text-brand-brown font-semibold mb-2 text-lg">
                Select Product *
              </label>
              <select
                required
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-brand-gold rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
              >
                <option value="">Choose a product...</option>
                {allProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} - ₹{product.price}
                  </option>
                ))}
                <option value="custom">Custom Order</option>
              </select>
            </div>

            {/* Custom Description - Shows when Custom is selected */}
            {formData.product === "custom" && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mb-6"
              >
                <label className="block text-brand-brown font-semibold mb-2 text-lg">
                  Custom Product Description *
                </label>
                <textarea
                  required
                  value={formData.customDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customDescription: e.target.value,
                    })
                  }
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-brand-gold rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
                  placeholder="Describe your custom crochet item in detail..."
                />
              </motion.div>
            )}

            {/* Course Details */}
            <div className="mb-8">
              <label className="block text-brand-brown font-semibold mb-2 text-lg">
                Additional Details
              </label>
              <textarea
                value={formData.courseDetails}
                onChange={(e) =>
                  setFormData({ ...formData, courseDetails: e.target.value })
                }
                rows="3"
                className="w-full px-4 py-3 border-2 border-brand-gold rounded-xl focus:ring-2 focus:ring-brand-brown focus:border-transparent transition-all"
                placeholder="Any special requirements or preferences..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Submit Order</span>
                </>
              )}
            </button>

            <p className="text-center text-gray-600 text-sm mt-4">
              We'll review your order and contact you within 24-48 hours
            </p>
          </form>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderPage;
