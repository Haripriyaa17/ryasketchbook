import { Mail, MapPin } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const Footer = () => {
  return (
    <footer className="bg-brand-background-dark border-t-2 border-brand-primary/20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-3xl font-display font-bold text-brand-primary mb-6">
              get in touch.
            </h3>
            <div className="space-y-4">
              <a
                href={`mailto:${portfolioData.contact.general}`}
                className="flex items-center gap-3 text-gray-700 hover:text-brand-primary transition-colors group"
              >
                <Mail className="group-hover:scale-110 transition-transform" />
                <span className="text-lg">{portfolioData.contact.general}</span>
              </a>
              <div className="flex items-center gap-3 text-gray-700">
                <MapPin />
                <span className="text-lg">
                  {portfolioData.contact.location}
                </span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-3xl font-display font-bold text-brand-primary mb-6">
              connect.
            </h3>
            <div className="space-y-3">
              <a
                href={`https://instagram.com/${portfolioData.contact.social.instagram.replace(
                  "@",
                  "",
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-lg text-gray-700 hover:text-brand-primary transition-colors capitalize"
              >
                instagram: {portfolioData.contact.social.instagram}
              </a>
              <a
                href={`mailto:${portfolioData.contact.social.email}`}
                className="block text-lg text-gray-700 hover:text-brand-primary transition-colors"
              >
                email: {portfolioData.contact.social.email}
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-brand-primary/20 text-center">
          <p className="text-gray-600">
            © {new Date().getFullYear()}{" "}
            {portfolioData.contact.business.tradeName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
