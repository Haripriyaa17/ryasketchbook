import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Phone, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { portfolioData } from "../data/portfolioData";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-brand-background">
      {/* Header */}
      <header className="bg-brand-primary text-white py-6">
        <div className="container-custom">
          <Link
            to="/"
            className="flex items-center gap-2 hover:text-brand-accent transition-colors w-fit"
          >
            <ArrowLeft size={24} />
            <span className="text-lg"> back to home</span>
          </Link>
        </div>
      </header>

      {/* Contact Content */}
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block px-8 py-4 bg-brand-primary rounded-full mb-6">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white">
                contact us
              </h1>
            </div>
          </div>

          {/* Contact Card */}
          <div className="bg-white rounded-3xl shadow-brand-lg p-8 md:p-12 border-4 border-brand-accent relative">
            {/* Gold accent corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent rounded-bl-full opacity-20"></div>

            {/* Business Information */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📍</span>
                <h2 className="text-2xl font-display font-bold text-brand-primary">
                  business information
                </h2>
              </div>
              <div className="space-y-3 ml-10">
                <p>
                  <strong>Trade Name:</strong>{" "}
                  {portfolioData.contact.business.tradeName}
                </p>
                <p>
                  <strong>Legal Name:</strong>{" "}
                  {portfolioData.contact.business.legalName}
                </p>
                <p>
                  <strong>Business Category:</strong>{" "}
                  {portfolioData.contact.business.category}
                </p>
                <p>
                  <strong>Registered Address:</strong>{" "}
                  {portfolioData.contact.business.address}
                </p>
              </div>
            </div>

            {/* Get in Touch */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Mail className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-display font-bold text-brand-primary">
                  get in touch
                </h2>
              </div>
              <div className="space-y-3 ml-10">
                <p className="text-gray-700 mb-4">
                  We'd love to hear from you! Here's how you can reach us:
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-blue-500">💬</span>
                  <p>
                    <strong>General Inquiries:</strong>{" "}
                    {portfolioData.contact.general}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-orange-500">🛠️</span>
                  <p>
                    <strong>Support & Issues:</strong>{" "}
                    {portfolioData.contact.support}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-red-500">📹</span>
                  <p>
                    <strong>YouTube:</strong>{" "}
                    {portfolioData.contact.social.youtube}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">🐦</span>
                  <p>
                    <strong>Twitter:</strong>{" "}
                    {portfolioData.contact.social.twitter}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-pink-500">📸</span>
                  <p>
                    <strong>Instagram:</strong>{" "}
                    {portfolioData.contact.social.instagram}
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-brand-primary" size={24} />
                <h2 className="text-2xl font-display font-bold text-brand-primary">
                  response time
                </h2>
              </div>
              <p className="text-gray-700 ml-10">
                {portfolioData.contact.responseTime}
              </p>
            </div>

            {/* Before Contacting */}
            <div className="bg-brand-background p-6 rounded-xl">
              <h3 className="text-xl font-display font-bold text-brand-primary mb-4 flex items-center gap-2">
                <span>📋</span> before contacting us
              </h3>
              <p className="text-gray-700 mb-3">
                For faster resolution, please include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Your order/claim ID (if applicable)</li>
                <li>Email used for purchase</li>
                <li>Clear description of your question or issue</li>
              </ul>
            </div>

            {/* Business Inquiries */}
            <div className="mt-8 p-6 bg-brand-accent/10 rounded-xl border-2 border-brand-accent">
              <h3 className="text-xl font-display font-bold text-brand-primary mb-2 flex items-center gap-2">
                <span>🤝</span> business inquiries
              </h3>
              <p className="text-gray-700">
                For collaborations, sponsorships, or business inquiries, please
                reach out to:
                <br />
                <strong>{portfolioData.contact.general}</strong>
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
