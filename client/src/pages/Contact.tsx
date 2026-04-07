import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlitchText from "../components/GlitchText";
import FAQ from "../components/FAQ";
import SEO from "../SEO/SEO";

const Contact = () => {
  const navigate = useNavigate();
  const faqs = [
    {
      question: "How can I contact T-ImoExo for business enquiries?",
      answer:
        "You can reach us via the contact form, call +91 82374 39036, or WhatsApp directly from the website for faster response.",
    },
    {
      question: "Where is your office located in India?",
      answer:
        "Our main office is in Pune, Maharashtra, serving clients across India and international trade partners.",
    },
    {
      question: "What are your working hours for export consultation?",
      answer:
        "We are available Monday to Saturday, 9 AM – 6 PM IST for consultation and shipment support.",
    },
    {
      question: "How soon does T-ImoExo respond to export queries?",
      answer:
        "We usually reply within 24 hours on working days and provide detailed documentation or quotation within 2–3 business days.",
    },
    {
      question: "Can I schedule a virtual consultation with T-ImoExo?",
      answer:
        "Yes. We offer free 15-minute consultations via Google Meet or WhatsApp Video for businesses across India and abroad.",
    },
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    country: "",
    category: "",
    requirement: "",
    captcha: "",
  });

  const [submitStatus, setSubmitStatus] = useState("");
  const [captchaText, setCaptchaText] = useState("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    country?: string;
    requirement?: string;
    captcha?: string;
  }>({});
  const canvasRef = useRef(null);

  // Generate random CAPTCHA
  const generateCaptchaText = () => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789";
    return Array.from({ length: 6 }, () =>
      chars.charAt(Math.floor(Math.random() * chars.length))
    ).join("");
  };

  // Draw CAPTCHA
  const drawCaptcha = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#f8fafc";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(100, 100, 100, ${Math.random() * 0.3})`;
      ctx.fillRect(
        Math.random() * width,
        Math.random() * height,
        Math.random() * 3,
        Math.random() * 3
      );
    }

    ctx.font = "bold 28px Arial";
    ctx.fillStyle = "#1e293b";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(captchaText, width / 2, height / 2);

    ctx.strokeStyle = "rgba(100, 100, 100, 0.3)";
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * width, Math.random() * height);
      ctx.lineTo(Math.random() * width, Math.random() * height);
      ctx.stroke();
    }
  };

  useEffect(() => {
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
  }, []);

  useEffect(() => {
    if (captchaText) drawCaptcha();
  }, [captchaText]);

  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      country?: string;
      requirement?: string;
      captcha?: string;
    } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid";
    }

    // Phone validation (10 digits)
    if (formData.phone && formData.phone.trim() !== "") {
      const cleanPhone = formData.phone.replace(/\D/g, "");
      if (cleanPhone.length !== 10) {
        newErrors.phone = "Phone number must be exactly 10 digits";
      }
    }

    // Requirement validation
    if (!formData.requirement.trim()) {
      newErrors.requirement = "Requirement description is required";
    }

    // CAPTCHA validation
    if (!formData.captcha.trim()) {
      newErrors.captcha = "CAPTCHA is required";
    } else if (
      formData.captcha.trim().toLowerCase() !== captchaText.toLowerCase()
    ) {
      newErrors.captcha = "Incorrect CAPTCHA";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const refreshCaptcha = () => {
    const newCaptcha = generateCaptchaText();
    setCaptchaText(newCaptcha);
    setFormData({ ...formData, captcha: "" });

    // Clear CAPTCHA error
    if (errors.captcha) {
      setErrors({ ...errors, captcha: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSubmitStatus("sending");
    try {
      const sourcePage = window.location.pathname;

      const submitData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        country: formData.country,
        requirement: `${formData.category ? `Category: ${formData.category}\n` : ""
          }${formData.company ? `Company: ${formData.company}\n` : ""}${formData.requirement
          }`,
        sourcePage,
      };

      // Updated endpoint to use the PHP backend
      // Use environment variable or fallback to production URL
      const apiUrl = import.meta.env.VITE_API_URL || "https://www.t-imoexo.com";
      const response = await fetch(`${apiUrl}/send_email.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      let result;
      try {
        result = await response.json();
      } catch (jsonError) {
        // If JSON parsing fails, create a generic error response
        result = {
          success: false,
          error: `Server error: ${response.status} ${response.statusText}`
        };
      }

      if (response.ok && result.success) {
        // Navigate to success page
        navigate("/contact-success", {
          state: {
            name: formData.name,
            email: formData.email,
          },
        });
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(""), 3000);
    }
  };

  const contactInfo = [
    {
      icon: "fa-map-marker-alt",
      title: "Office",
      info: "Pune, Maharashtra, India",
    },
    { icon: "fa-phone", title: "Phone", info: "+91 8237439036" },
    { icon: "fa-envelope", title: "Email", info: "info@imoexo.com" },
    { icon: "fa-globe", title: "Website", info: "www.t-imoexo.com" },
  ];

  return (
    <>
      <SEO page="contact" />

      <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50 pt-28 pb-16 relative">
        {/* <BackgroundEffects /> */}

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-6 px-6 py-2 bg-gradient-to-r from-[#1E3A8A]/10 to-[#0D9488]/10 border border-[#1E3A8A]/20 rounded-full text-[#1E3A8A] font-medium shadow-md"
            >
              Let's Connect
            </motion.div>

            <GlitchText>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-gray-900 mb-5">
                Get in{" "}
                <motion.span
                  animate={{ color: ["#1E3A8A", "#0D9488", "#1E3A8A"] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Touch
                </motion.span>
              </h1>
            </GlitchText>

            <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Let's build your global trade success — we're ready to support
              your{" "}
              <motion.span
                animate={{
                  color: ["#1E3A8A", "#0D9488", "#15803D", "#1E3A8A"],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                import-export requirements
              </motion.span>{" "}
              with customized, data-driven solutions.
            </p>
          </motion.div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((item, i) => {
              // Determine the link based on the title
              let href = '';
              if (item.title === 'Phone') {
                href = `tel:${item.info.replace(/\s/g, '')}`;
              } else if (item.title === 'Email') {
                href = `mailto:${item.info}`;
              } else if (item.title === 'Website') {
                href = `https://${item.info}`;
              } else if (item.title === 'Office') {
                href = 'https://www.google.com/maps/search/Pune,+Maharashtra,+India';
              }

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 text-center"
                >
                  <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-[#1E3A8A] to-[#0D9488] rounded-xl flex items-center justify-center text-white">
                    <i className={`fas ${item.icon} text-xl`}></i>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {item.title}
                  </h3>
                  <a
                    href={href}
                    target={item.title === 'Website' || item.title === 'Office' ? '_blank' : undefined}
                    rel={item.title === 'Website' || item.title === 'Office' ? 'noopener noreferrer' : undefined}
                    className="text-gray-700 mt-2 inline-block hover:text-[#0D9488] transition-colors cursor-pointer underline-offset-2 hover:underline"
                  >
                    {item.info}
                  </a>
                </motion.div>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-[#1E3A8A] via-[#0D9488] to-[#1E3A8A] bg-clip-text text-transparent">
                Send Us a
              </span>{" "}
              <span className="text-[#0D9488]">Requirement</span>
            </h2>

            {submitStatus === "error" && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-center">
                ❌ Something went wrong. Please try again.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <InputField
                  label="Name *"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  placeholder="Your Name"
                />
                <InputField
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  error={errors.country}
                  placeholder="Your Country"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <InputField
                  label="Email *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="you@email.com"
                />
                <InputField
                  label="Phone (10 digits)"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Brief Description of Requirement *
                </label>
                <textarea
                  name="requirement"
                  value={formData.requirement}
                  onChange={handleChange}
                  placeholder="Tell us about your requirements..."
                  className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 outline-none transition-all resize-none ${errors.requirement
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]/30"
                    }`}
                  rows={5}
                />
                {errors.requirement && (
                  <p className="mt-1 text-red-500 text-sm">
                    {errors.requirement}
                  </p>
                )}
              </div>

              {/* CAPTCHA */}
              <div className="flex flex-col items-center w-full px-4 sm:px-6 mt-6">
                <div
                  className="relative w-full max-w-md sm:max-w-lg text-center p-5 sm:p-6 
                  rounded-2xl bg-gradient-to-br from-[#E0F2FE]/70 via-white/60 to-[#D1FAE5]/70 
                  border border-teal-100 shadow-lg backdrop-blur-md"
                >
                  {/* Subtle glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#0D9488]/10 via-[#1E3A8A]/10 to-[#0D9488]/10 blur-xl -z-10"></div>

                  {/* Label */}
                  <label className="block text-[#0F172A] font-semibold mb-4 text-sm flex flex-col sm:flex-row justify-center items-center gap-1 sm:gap-2">
                    <i className="fas fa-shield-alt text-[#0D9488] text-sm"></i>
                    <span>Security Check:</span>
                    <span className="text-gray-500 text-sm">
                      Enter the text shown below
                    </span>
                  </label>

                  {/* CAPTCHA + Input Row */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                    {/* Canvas + Refresh */}
                    <div className="flex items-center gap-3">
                      <canvas
                        ref={canvasRef}
                        width={160}
                        height={50}
                        className="border border-gray-300 rounded-lg bg-white shadow-inner max-w-[60vw]"
                      />
                      <motion.button
                        type="button"
                        onClick={refreshCaptcha}
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 sm:p-3 bg-gradient-to-r from-[#0D9488] to-[#1E3A8A] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
                        title="Refresh CAPTCHA"
                      >
                        <i className="fas fa-redo"></i>
                      </motion.button>
                    </div>

                    {/* Input Field */}
                    <div className="w-full sm:w-auto">
                      <input
                        type="text"
                        name="captcha"
                        value={formData.captcha}
                        onChange={handleChange}
                        placeholder="Enter CAPTCHA"
                        className={`w-full sm:w-[220px] px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 outline-none font-mono tracking-widest shadow-sm text-center ${errors.captcha
                          ? "border-red-500 focus:ring-red-200"
                          : "border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]/30"
                          }`}
                        style={{ textTransform: "none" }}
                        maxLength={6}
                        autoComplete="off"
                      />
                      {errors.captcha && (
                        <p className="mt-1 text-red-500 text-sm text-center">
                          {errors.captcha}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitStatus === "sending"}
                className="w-full px-8 py-4 bg-gradient-to-r from-[#1E3A8A] to-[#0D9488] text-white font-semibold rounded-xl shadow-lg hover:opacity-90 transition-all disabled:opacity-50 mt-4"
              >
                {submitStatus === "sending" ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                  </>
                ) : (
                  <>
                    Send Requirement <i className="fas fa-paper-plane ml-2"></i>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          <div className="py-16">
            <FAQ faqs={faqs} />
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable InputField
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  error?: string | undefined;
}) => (
  <div>
    <label className="block text-gray-700 font-medium mb-2">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-900 placeholder-gray-400 focus:ring-2 outline-none transition-all ${error
        ? "border-red-500 focus:ring-red-200"
        : "border-gray-200 focus:border-[#0D9488] focus:ring-[#0D9488]/30"
        }`}
    />
    {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
  </div>
);

export default Contact;
