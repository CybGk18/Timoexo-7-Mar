import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
// import BackgroundEffects from "../components/BackgroundEffects";
import SEO from "../SEO/SEO";

const ContactSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, email } = location.state || {};

  // Redirect to contact page if accessed directly without form submission
  useEffect(() => {
    if (!location.state) {
      navigate("/contact");
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null; // Will redirect before rendering
  }

  return (
    <>
      <SEO page="contact-success" />

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50 pt-28 pb-16 relative">
        {/* <BackgroundEffects /> */}

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <i className="fas fa-check-circle text-5xl text-green-500"></i>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="font-display font-bold text-4xl sm:text-5xl text-gray-900 mb-6"
            >
              Thank You, {name || "Valued Customer"}!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-gray-700 mb-8 leading-relaxed"
            >
              Your message has been successfully sent. We've received your
              inquiry and will respond within 24 hours.
            </motion.p>

            {email && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left"
              >
                <h3 className="font-bold text-blue-800 mb-2 flex items-center">
                  <i className="fas fa-envelope mr-2"></i> Confirmation Sent
                </h3>
                <p className="text-blue-700">
                  A confirmation email has been sent to{" "}
                  <span className="font-semibold">{email}</span>. Please check
                  your inbox (and spam folder) for our response.
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            >
              <button
                onClick={() => navigate("/")}
                className="px-8 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all"
              >
                <i className="fas fa-home mr-2"></i> Back to Home
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-4 bg-white border-2 border-[#1E3A8A] text-[#1E3A8A] font-semibold rounded-xl shadow-lg hover:bg-[#1E3A8A] hover:text-white transition-all"
              >
                <i className="fas fa-paper-plane mr-2"></i> Send Another Message
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-16 pt-8 border-t border-gray-200"
            >
              <h3 className="font-bold text-gray-900 mb-4">
                What happens next?
              </h3>
              <div className="grid sm:grid-cols-3 gap-6 text-left">
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center text-white mb-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Review</h4>
                  <p className="text-gray-600 text-sm">
                    Our team reviews your submission and prepares a detailed
                    response.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-[#0D9488] rounded-full flex items-center justify-center text-white mb-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Response</h4>
                  <p className="text-gray-600 text-sm">
                    We contact you within 24 hours with solutions tailored to
                    your needs.
                  </p>
                </div>

                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-[#15803D] rounded-full flex items-center justify-center text-white mb-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">Solution</h4>
                  <p className="text-gray-600 text-sm">
                    We work together to implement the best import-export
                    solutions for your business.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ContactSuccess;
