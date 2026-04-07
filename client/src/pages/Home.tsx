import { lazy, Suspense, useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  Box,
  Briefcase,
  CheckCircle,
  CheckCircle2,
  ClipboardList,
  Clock,
  Factory,
  FileText,
  Globe,
  Handshake,
  Megaphone,
  Package,
  PackageOpen,
  Plane,
  ShoppingCart,
  Shield,
  ShieldCheck,
  Ship,
  Star,
  ThumbsUp,
  TrendingUp,
  Truck,
  Users,
  Boxes,
  X,
} from "lucide-react";
import heroImage from "@/assets/hero-shipping.jpg";
import video from "../../public/hero-video.mp4";
import oceanFreightImg from "@/assets/ocean-freight.jpg";
import airFreightImg from "@/assets/air-freight.jpg";
import groundTransportImg from "@/assets/ground-transport.jpg";
import customsComplianceImg from "@/assets/customs-compliance.jpg";
import globalReachImg from "@/assets/global-reach.jpg";
import trackingDashboardImg from "@/assets/tracking-dashboard.jpg";
import costOptimizationImg from "@/assets/cost-optimization.jpg";
import riskManagementImg from "@/assets/risk-management.jpg";
import medicalDevicesImg from "@/assets/medical-devices.jpg";
import agricultureImg from "@/assets/agriculture.jpg";
import itHardwareImg from "@/assets/it-hardware.jpg";
import packagedFoodImg from "@/assets/packaged-food.jpg";
import { Button } from "../components/ui/button";
import { SectorCard } from "../components/SectorCard";
import ResponsiveImage from "../components/ResponsiveImage";
import SEO from "../SEO/SEO";

const BuyerInquiryForm = lazy(() => import("@/components/BuyerInquiryForm"));
const ManufacturerInquiryForm = lazy(() => import("@/components/ManufacturerInquiryForm"));
const StatsCounter = lazy(() => import("../components/StatsCounter"));
const VideoSection = lazy(() => import("../components/VideoSection"));
const FAQ = lazy(() => import("@/components/FAQ"));
const PartnershipCollage = lazy(() => import("@/components/PartnershipCollage"));

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [activeProcessTab, setActiveProcessTab] = useState<"manufacturers" | "buyers">("manufacturers");
  const [showBuyerForm, setShowBuyerForm] = useState(false);
  const [showManufacturerForm, setShowManufacturerForm] = useState(false);
  const [showHeroVideo, setShowHeroVideo] = useState(false);

  const services2 = [
    {
      icon: <Globe className="w-10 h-10 text-blue-600" />,
      title: "Export Facilitation",
      description: "Guide your products to global markets with expert matching and compliance.",
    },
    {
      icon: <Box className="w-10 h-10 text-blue-600" />,
      title: "Import Facilitation",
      description: "Streamline sourcing from India with vetted suppliers and end-to-end support.",
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-blue-600" />,
      title: "Product Sourcing",
      description: "Curate high-quality matches across Medical, Agriculture, IT Hardware, and Packaged Food.",
    },
    {
      icon: <FileText className="w-10 h-10 text-blue-600" />,
      title: "Documentation & Customs",
      description: "10+ years handling paperwork, tariffs, and regulations for hassle-free trade.",
    },
  ];

  const faqs = [
    {
      question: "What is T-ImoExo and what services do you provide?",
      answer:
        "T-ImoExo is a Pune-based Import-Export and Trade Solutions company in India. We help businesses with global sourcing, export documentation, logistics, compliance, and market expansion through our trusted international trade networks.",
    },
    {
      question: "Which countries does T-ImoExo operate with?",
      answer:
        "We operate across key global trade corridors - India, the Middle East, Europe, and Southeast Asia - facilitating smooth exports and imports from major Indian ports like Nhava Sheva, Mumbai, and Chennai.",
    },
    {
      question: "Why choose a Pune-based import-export partner like T-ImoExo?",
      answer:
        "Partnering with a Pune-based firm ensures faster communication, easy document handling, and direct coordination with customs and port authorities - offering strong on-ground support across India.",
    },
    {
      question: "What products can T-ImoExo help export or import?",
      answer:
        "We specialize in exporting agricultural products (onions, grains, spices), industrial materials, and FMCG goods. Our services cover sourcing, packaging, documentation, and international logistics.",
    },
    {
      question: "How can I start an export business with T-ImoExo?",
      answer:
        "You can start by filling out our online enquiry form or contacting us on WhatsApp. Our consultants will guide you through product selection, documentation, port handling, and compliance within 3 business days.",
    },
  ];

  const stats = [
    { value: 10, suffix: "+", label: "Global Businesses", icon: Globe, color: "from-blue-600 to-cyan-500" },
    { value: 2, suffix: "+", label: "Continents", icon: TrendingUp, color: "from-cyan-500 to-teal-500" },
    { value: 50, suffix: "+", label: "Shipments Completed", icon: Package, color: "from-teal-500 to-emerald-500" },
    { value: 99, suffix: "%", label: "Satisfaction Rate", icon: ThumbsUp, color: "from-emerald-500 to-green-600" },
  ];

  const services = [
    {
      icon: <Ship className="w-8 h-8" />,
      title: "Ocean Freight",
      description: "Cost-effective sea freight with full container and LCL options. Real-time tracking from port to port.",
      features: ["FCL & LCL Shipping", "Port-to-Port Service", "Customs Clearance"],
      image: oceanFreightImg,
    },
    {
      icon: <Plane className="w-8 h-8" />,
      title: "Air Freight",
      description: "Fast, secure international air cargo for time-sensitive shipments. Express and standard options available.",
      features: ["Express Delivery", "Temperature Control", "Dangerous Goods"],
      image: airFreightImg,
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: "Ground Transport",
      description: "Reliable inland transport with full tracking. First-mile, last-mile, and cross-border trucking.",
      features: ["Door-to-Door", "Cross-Border", "Real-Time GPS"],
      image: groundTransportImg,
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Customs & Compliance",
      description: "Expert customs brokerage and documentation. Navigate complex regulations with confidence.",
      features: ["Import/Export Docs", "Duty Optimization", "Trade Compliance"],
      image: customsComplianceImg,
    },
  ];

  const platformFeatures = [
    {
      icon: <Globe className="w-12 h-12" />,
      title: "Global Reach, Local Expertise",
      description: "Connected to major trade corridors across India, Middle East, Europe, and Southeast Asia with on-ground support.",
      image: globalReachImg,
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Real-Time Visibility",
      description: "Track every shipment from factory floor to customer door with live updates and predictive ETAs.",
      image: trackingDashboardImg,
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Cost Optimization",
      description: "Smart routing algorithms and consolidated shipping reduce costs by up to 30% without compromising speed.",
      image: costOptimizationImg,
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Risk Management",
      description: "Comprehensive cargo insurance, compliance monitoring, and proactive issue resolution to protect your shipments.",
      image: riskManagementImg,
    },
  ];

  const tradeSteps = [
    { Icon: Globe, title: "Indian Manufacturers" },
    { Icon: ClipboardList, title: "Product Registration" },
    { Icon: ShieldCheck, title: "Quality Check" },
    { Icon: Package, title: "Packaging" },
    { Icon: Ship, title: "Logistics" },
    { Icon: Globe, title: "International Buyers" },
    { Icon: Briefcase, title: "Market Entry" },
    { Icon: Megaphone, title: "Digital Marketing" },
    { Icon: Handshake, title: "Partnership" },
    { Icon: TrendingUp, title: "Growth" },
    { Icon: Star, title: "Success" },
  ];

  const allSteps = [...tradeSteps, ...tradeSteps];

  const sectors = [
    {
      image: medicalDevicesImg,
      title: "Medical Devices",
      description: "Compliant sourcing for global healthcare needs.",
      badgeText: "ISO Certified Suppliers",
      badgeVariant: "default" as const,
    },
    {
      image: agricultureImg,
      title: "Agriculture",
      description: "Sustainable Indian farm-to-table solutions.",
      badgeText: "Fresh & Organic",
      badgeVariant: "success" as const,
    },
    {
      image: itHardwareImg,
      title: "IT Hardware",
      description: "Reliable supply chains for cutting-edge devices.",
      badgeText: "Tech Excellence",
      badgeVariant: "info" as const,
    },
    {
      image: packagedFoodImg,
      title: "Packaged Food",
      description: "Quality-assured exports meeting international standards.",
      badgeText: "FSSAI Certified",
      badgeVariant: "accent" as const,
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Sharma",
      company: "Agri Export Corp",
      text: "T-ImoExo transformed our export operations. Their end-to-end solution helped us scale from regional to international markets in just 6 months.",
      rating: 5,
    },
    {
      name: "Sarah Al-Mahmoud",
      company: "Gulf Trading LLC",
      text: "The visibility and control we get through T-ImoExo is unmatched. We always know where our shipments are and when they'll arrive.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      company: "Pacific Manufacturing",
      text: "Outstanding customs support. They navigated complex regulations seamlessly, saving us time and reducing our compliance risks significantly.",
      rating: 5,
    },
  ];

  const manufacturersProcess = [
    {
      number: "1",
      icon: <PackageOpen className="w-8 h-8" />,
      title: "Share Product Details",
      description: "Tell us about your products, capacity, and export goals.",
    },
    {
      number: "2",
      icon: <Users className="w-8 h-8" />,
      title: "We Match with Buyers",
      description: "Our network connects you with verified international buyers.",
    },
    {
      number: "3",
      icon: <FileText className="w-8 h-8" />,
      title: "Handle Docs & Logistics",
      description: "We manage all paperwork, customs, and shipping arrangements.",
    },
    {
      number: "4",
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Close the Deal & Follow Up",
      description: "Complete the transaction with ongoing support and follow-up.",
    },
  ];

  const buyersProcess = [
    {
      number: "1",
      icon: <ShoppingCart className="w-8 h-8" />,
      title: "Define Sourcing Needs",
      description: "Share your product requirements, quantities, and quality standards.",
    },
    {
      number: "2",
      icon: <Boxes className="w-8 h-8" />,
      title: "We Curate Indian Suppliers",
      description: "Access our vetted network of reliable Indian manufacturers.",
    },
    {
      number: "3",
      icon: <Ship className="w-8 h-8" />,
      title: "Ensure Compliance & Shipping",
      description: "We handle all compliance, quality checks, and logistics.",
    },
    {
      number: "4",
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "Secure Delivery & Support",
      description: "Track your shipment and receive ongoing support.",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const connection = (navigator as any).connection;
    const allowVideo = !prefersReducedMotion && isDesktop && (!connection || (connection.effectiveType !== "2g" && !connection.saveData));

    if (!allowVideo) return;

    const idle = (window as any).requestIdleCallback || ((cb: () => void) => setTimeout(cb, 2000));
    idle(() => setShowHeroVideo(true));
  }, []);

  return (
    <div className="min-h-screen pt-16 bg-white text-gray-900 overflow-hidden">
      <SEO page="home" />

      <section className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden">
        <ResponsiveImage
          src={heroImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
          fetchPriority="high"
          ariaHidden
        />
        {showHeroVideo && (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
            poster={heroImage}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-900/55 to-slate-950/80" />

        <div className="max-w-7xl w-full relative z-10">
          <div className="text-center mb-12">
            <h1
              className="text-5xl md:text-6xl lg:text-7xl text-white font-semibold mb-4 px-4 py-2 rounded-lg"

            >
              Global Trade Made Simple
            </h1>
            <p 
              className="text-3xl md:text-3xl lg:text-4xl font-extrabold mb-4 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] bg-clip-text text-transparent transition-all duration-300"
            
            >
              Connecting Indian Manufacturers with the World
            </p>
            <p className="text-lg md:text-2xl text-white mb-10 px-4 py-2 rounded-lg">
              Your End-to-End International Trading Partner
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => setShowBuyerForm(true)}
                className="text-lg px-8 py-6 bg-gradient-to-r from-[hsl(var(--brand-blue))] to-[hsl(var(--brand-green))] hover:opacity-90 transition-all duration-300 text-white shadow-lg hover:shadow-xl"
              >
                <ShoppingCart className="mr-2" size={20} />
                Buyer Inquiry
                <ArrowRight className="ml-2" size={20} />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => setShowManufacturerForm(true)}
                className="text-lg px-8 py-6 bg-white text-[hsl(var(--brand-blue))] border-2 border-[hsl(var(--brand-white))] hover:bg-gradient-to-r hover:from-[hsl(var(--brand-blue))] hover:to-[hsl(var(--brand-green))] hover:text-white hover:border-transparent transition-all duration-300"
              >
                <Factory className="mr-2" size={20} />
                Manufacturer Inquiry
              </Button>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
            <h3 className="text-center text-2xl font-bold text-[hsl(var(--brand-blue))] mb-6">Your Trade Journey</h3>
            <div className="overflow-hidden relative">
              <div className="flex gap-4 animate-scroll">
                {allSteps.map((step, index) => (
                  <div key={index} className="flex items-center gap-4 flex-shrink-0">
                    <div className="min-w-[160px] flex flex-col items-center justify-center p-4 text-center hover:scale-105 transition-all duration-300 cursor-pointer">
                      <step.Icon size={42} className="text-[hsl(var(--brand-blue))] mb-3 drop-shadow-lg" strokeWidth={2} />
                      <div className="text-sm font-semibold text-[hsl(var(--brand-blue))] leading-tight">{step.title}</div>
                    </div>
                    {index < allSteps.length - 1 && (
                      <div className="text-[hsl(var(--brand-green))] text-2xl flex-shrink-0 opacity-60 font-bold">-&gt;</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-10">
              {["Export Process", "Import Solutions", "Global Network"].map((text, idx) => (
                <div
                  key={idx}
                  className="px-6 py-3 bg-blue-50 rounded-full text-blue-600 text-sm font-medium border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {showBuyerForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white shadow-2xl w-full max-w-2xl relative max-h-[85vh] mt-[30px] overflow-y-auto">
              <button
                onClick={() => setShowBuyerForm(false)}
                className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
              <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading buyer form...</div>}>
                <BuyerInquiryForm />
              </Suspense>
            </div>
          </div>
        )}

        {showManufacturerForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white shadow-2xl w-full max-w-2xl relative max-h-[85vh] mt-[30px] overflow-y-auto">
              <button
                onClick={() => setShowManufacturerForm(false)}
                className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md"
              >
                <X className="w-5 h-5" />
              </button>
              <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading manufacturer form...</div>}>
                <ManufacturerInquiryForm />
              </Suspense>
            </div>
          </div>
        )}
      </section>

      <Suspense fallback={<section className="py-20 px-4 bg-gray-50"><div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-10 text-center text-gray-500 shadow-sm">Loading company overview...</div></section>}>
        <VideoSection />
      </Suspense>

      <main id="expertise" className="bg-gray-50">
        <section className="container mx-auto px-4 sm:px-6 py-16 md:py-24">
          <header className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-slate-900 px-4">
              Expertise Across <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Key Sectors</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 md:text-xl max-w-3xl mx-auto px-4">
              Specialized solutions tailored to your industry
            </p>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 justify-items-center max-w-7xl mx-auto">
            {sectors.map((sector, index) => (
              <SectorCard key={index} {...sector} />
            ))}
          </div>
        </section>
      </main>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">
            Our Core <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-gray-600 mb-12 text-lg">From Sourcing to Seamless Delivery</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services2.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-left transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl hover:border-blue-200 hover:bg-gradient-to-b hover:from-blue-50 hover:to-white"
              >
                <div className="flex items-center justify-center w-14 h-14 bg-blue-50 rounded-xl mb-5">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Complete <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Freight Solutions</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              One platform for all your shipping needs. Ocean, air, and ground freight with full visibility.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200 group hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <ResponsiveImage
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, j) => (
                      <li key={j} className="flex items-center space-x-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Simple <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Process</span>
            </h2>
            <p className="text-xl text-gray-600">Tailored for Your Role</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-12">
            <button
              onClick={() => setActiveProcessTab("manufacturers")}
              className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all ${
                activeProcessTab === "manufacturers"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              For Manufacturers
            </button>
            <button
              onClick={() => setActiveProcessTab("buyers")}
              className={`flex-1 py-4 px-8 rounded-xl font-semibold text-lg transition-all ${
                activeProcessTab === "buyers"
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              For Buyers
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(activeProcessTab === "manufacturers" ? manufacturersProcess : buyersProcess).map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-200 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md">
                    {step.number}
                  </div>
                </div>

                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mb-4">
                  {step.icon}
                </div>

                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<section className="py-10 bg-gradient-to-br from-gray-50 via-white to-cyan-50"><div className="container mx-auto px-4 text-center text-gray-500">Loading partnerships gallery...</div></section>}>
        <PartnershipCollage />
      </Suspense>

      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-50" />

        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Why Choose <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">T-ImoExo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern logistics technology meets decades of trade expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {platformFeatures.map((feature, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-200 hover:-translate-y-1"
              >
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative h-64 md:h-auto overflow-hidden">
                    <ResponsiveImage
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent" />
                  </div>

                  <div className="p-8 flex flex-col justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0891b2_1px,transparent_1px),linear-gradient(to_bottom,#0891b2_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="relative container mx-auto px-6 text-center">
          <div className="mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-slate-900">
              Powered by <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">Reliability</span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Trusted for a Decade of Global Trade
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="group relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />

                  <div className="relative p-8 bg-white backdrop-blur-xl rounded-2xl border border-slate-200 shadow-lg transition-all duration-500 group-hover:border-cyan-400/50 group-hover:shadow-cyan-500/20">
                    <div className="mb-6 inline-flex p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200">
                      <Icon className="w-8 h-8 text-cyan-600" />
                    </div>

                    <div className={`text-5xl md:text-6xl font-extrabold mb-3 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                      <Suspense fallback={<span>{stat.value}{stat.suffix}</span>}>
                        <StatsCounter end={stat.value} suffix={stat.suffix} />
                      </Suspense>
                    </div>

                    <p className="text-slate-700 font-medium text-lg tracking-wide">{stat.label}</p>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-slate-50 to-transparent" />
      </section>

      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Trusted by <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Global Businesses</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-12 border border-gray-200">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Award key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
                  <div className="text-sm text-gray-600">{testimonials[currentTestimonial].company}</div>
                </div>
              </div>
            </div>

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${i === currentTestimonial ? "bg-blue-600 w-8" : "bg-gray-400"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="container mx-auto px-4 py-20 relative z-10 text-center text-gray-500">Loading FAQ...</div>}>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <FAQ faqs={faqs} />
        </div>
      </Suspense>

      <section className="py-24 bg-white relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: "rgb(249 247 247 / 73%)",
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'40\' height=\'40\' viewBox=\'0 0 40 40\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\'%3E%3Cpath d=\'M22 20h-2v-2h-2v2h-2v2h2v2h2v-2h2z\'/%3E%3C/g%3E%3C/svg%3E")',
            backgroundRepeat: "repeat",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-gray-900">Ready to Connect Globally?</h2>
            <p className="text-xl mb-10 text-gray-600">Let's Start Your Trade Journey Today</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-5">
              <button
                onClick={() => setShowBuyerForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-all"
              >
                <ClipboardList className="w-5 h-5" />
                <span>Buyer Inquiry</span>
              </button>

              <button
                onClick={() => setShowManufacturerForm(true)}
                className="px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
              >
                <ArrowRight className="w-5 h-5" />
                <span>Manufacturer Inquiry</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {showBuyerForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl w-full max-w-2xl relative max-h-[85vh] mt-[30px] overflow-y-auto">
            <button
              onClick={() => setShowBuyerForm(false)}
              className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
            <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading buyer form...</div>}>
              <BuyerInquiryForm />
            </Suspense>
          </div>
        </div>
      )}

      {showManufacturerForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white shadow-2xl w-full max-w-2xl relative max-h-[85vh] mt-[30px] overflow-y-auto">
            <button
              onClick={() => setShowManufacturerForm(false)}
              className="sticky top-4 right-4 float-right text-gray-400 hover:text-gray-600 z-10 bg-white rounded-full p-1.5 hover:bg-gray-100 transition-colors shadow-md"
            >
              <X className="w-5 h-5" />
            </button>
            <Suspense fallback={<div className="p-8 text-center text-gray-500">Loading manufacturer form...</div>}>
              <ManufacturerInquiryForm />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
