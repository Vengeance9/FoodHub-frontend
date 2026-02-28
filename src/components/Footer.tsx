import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Heart,
} from "lucide-react";


export default async function Footer() {
  const currentYear = new Date().getFullYear();

  

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">
              Food<span className="text-yellow-400">Hub</span>
            </h2>
            <p className="text-sm leading-relaxed">
              Delivering delicious meals from the best restaurants straight to
              your doorstep. Fresh, fast, and always satisfying.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-gray-900 transition-colors"
                aria-label="Youtube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full"></span>
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: "About Us", href: "#" },
                { name: "Menu", href: "#" },
                { name: "Restaurants", href: "#" },
                { name: "Offers", href: "#" },
                { name: "Contact", href: "#" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-yellow-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full"></span>
              Support
            </h3>
            <ul className="space-y-2">
              {[
                { name: "FAQ", href: "/faq" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Refund Policy", href: "/refund" },
                { name: "Help Center", href: "/help" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-yellow-400 transition-colors flex items-center gap-1 group"
                  >
                    <ChevronRight className="h-3 w-3 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-yellow-400 rounded-full"></span>
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin className="h-5 w-5 text-yellow-400 shrink-0 mt-0.5" />
                <span>123 Food Street, Culinary District, Dhaka 1200</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="h-5 w-5 text-yellow-400 shrink-0" />
                <a
                  href="tel:+8801234567890"
                  className="hover:text-yellow-400 transition-colors"
                >
                  +880 1234-567890
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="h-5 w-5 text-yellow-400 shrink-0" />
                <a
                  href="mailto:support@foodhub.com"
                  className="hover:text-yellow-400 transition-colors"
                >
                  support@foodhub.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5 text-yellow-400 shrink-0" />
                <span>Mon-Sun: 10:00 AM - 11:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold mb-1">
                Subscribe to our newsletter
              </h3>
              <p className="text-sm text-gray-400">
                Get the latest offers and updates
              </p>
            </div>

            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent text-white"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-400 text-gray-900 rounded-r-lg font-medium hover:bg-yellow-500 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <p className="text-gray-400">
              © {currentYear} FoodHub. All rights reserved.
            </p>

            <p className="text-gray-400 flex items-center gap-1">
              Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" />{" "}
              in Bangladesh
            </p>

            <div className="flex items-center gap-4">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Privacy
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Terms
              </Link>
              <span className="text-gray-600">•</span>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-yellow-400 transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
