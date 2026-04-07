import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";


const Footer = () => {
  const socialIcons = [
    {
      icon: "linkedin-in",
      gradient: "from-[#0A66C2] to-[#004182]",
      link: "https://www.linkedin.com/company/imoexo-international/"
    },
    {
      icon: "twitter",
      gradient: "from-[#1DA1F2] to-[#0D8ED9]",
      link: "https://x.com/T_Imoexo"
    },
    {
      icon: "facebook-f",
      gradient: "from-[#1877F2] to-[#0D4D9D]",
      link: "https://www.facebook.com/profile.php?id=61570610754043"
    },
    {
      icon: "instagram",
      gradient: "from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      link: "https://www.instagram.com/t_imoexo.international/"
    },
    {
      icon: "youtube",
      gradient: "from-[#FF0000] to-[#CC0000]",
      link: "https://www.youtube.com/@TImoexoInternational"
    }
  ];


  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        {/* Top Footer */}
        <div className="grid md:grid-cols-5 gap-12 mb-12">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center font-bold text-3xl shadow-lg text-gray-900"
              >
                T
              </motion.div>
              <div>
                <h3 className="text-xl font-bold text-white">IMOEXO</h3>
                <p className="text-xs text-gray-300 tracking-widest">
                  INTERNATIONAL
                </p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Empowering global trade with innovative solutions, data-driven
              insights, and seamless logistics since 2010.
            </p>
          </div>

          {/* Services */}
          <div>
            <HashLink smooth to="/#expertise">
              <h4 className="font-bold mb-4 text-white cursor-pointer hover:text-gray-300 transition-colors">
                Key Sectors
              </h4>
            </HashLink>

            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/#expertise" className="hover:text-white transition-colors">
                  Medical Devices
                </a>
              </li>
              <li>
                <a href="/#expertise" className="hover:text-white transition-colors">
                  Agriculture
                </a>
              </li>
              <li>
                <a href="/#expertise" className="hover:text-white transition-colors">
                  IT Hardware
                </a>
              </li>
              <li>
                <a href="/#expertise" className="hover:text-white transition-colors">
                  Packaged Food
                </a>
              </li>
            </ul>
          </div>


          {/* Company */}
          <div>
            <h4 className="font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">

              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/solutions" className="hover:text-white transition-colors">
                  Industries
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link to="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="font-bold mb-4 text-white">Contact</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>Pune, Maharashtra, India</span>
              </li>

              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <a href="mailto:info@imoexo.com" className="hover:text-white">
                  info@imoexo.com
                </a>
              </li>

              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <a href="tel:+918237439036" className="hover:text-white">
                  +91 82374 39036
                </a>
              </li>
            </ul>


            {/* Social Icons */}
            <div className="flex space-x-4 mt-6">
              {socialIcons.map((item) => (
                <motion.a
                  key={item.icon}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-18 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gradient-to-br ${item.gradient} transition-all`}
                  whileHover={{
                    scale: [1.15, 1.15, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <i className={`fab fa-${item.icon} text-white text-lg`} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-300 text-sm">
          <p className="text-white">
            © 2025 Imoexo International. All rights reserved.
          </p>
          <p className="mt-1 text-gray-400">
            Designed by{" "}
            <a
              href="https://cybaemtech.com/"
              target="_blank"
              className="text-blue-400 hover:underline"
            >
              Cybaem Tech
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
