import React from "react";
import { Link } from "react-router-dom";

const footerSections = [
  {
    title: "Shop",
    links: [
      { label: "New Arrivals", path: "/new-arrivals" },
      { label: "Men's Fashion", path: "/men" },
      { label: "Women's Fashion", path: "/women" },
      { label: "Footwear", path: "/footwear" },
      { label: "Accessories", path: "/accessories" },
      { label: "All Collections", path: "/collections" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { label: "Contact Us", path: "/contact" },
      { label: "Track Your Order", path: "/account/orders" },
      { label: "Returns & Exchanges", path: "/returns" },
      { label: "Shipping Info", path: "/shipping" },
      { label: "FAQs", path: "/contact" },
    ],
  },
  {
    title: "My Account",
    links: [
      { label: "My Profile", path: "/account" },
      { label: "My Orders", path: "/account/orders" },
      { label: "Wishlist", path: "/wishlist" },
      { label: "Saved Addresses", path: "/account/addresses" },
      { label: "Payment Methods", path: "/account/payments" },
    ],
  },
  
];

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Main footer */}
      <div className="max-w-350 mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-secondary">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-sm text-white/60 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-secondary font-bold text-xl" style={{ fontFamily: 'Sora, sans-serif' }}>
              baz<span className="text-white">ario</span>
            </span>
            <span className="text-white/30 text-sm">India's Shopping Destination</span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-white/40">
            <span>🔒 Secure Payments</span>
            <span>🚚 Free Delivery ₹499+</span>
            <span>↩ 30-Day Returns</span>
            <span>⭐ 1M+ Happy Customers</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Follow us on Instagram" className="text-white/40 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-lg">photo_camera</span>
            </a>
            <a href="#" aria-label="Follow us on Facebook" className="text-white/40 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-lg">facebook</span>
            </a>
            <a href="#" aria-label="Follow us on Twitter" className="text-white/40 hover:text-secondary transition-colors">
              <span className="material-symbols-outlined text-lg">brand_awareness</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-primary-fixed-dim py-3 px-4">
        <div className="max-w-350 mx-auto flex flex-wrap gap-4 justify-between items-center text-xs text-white/30">
          <span>© {new Date().getFullYear()} Bazario. All rights reserved.</span>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-white/60 transition-colors">Privacy Policy</Link>
            <Link to="/about" className="hover:text-white/60 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
