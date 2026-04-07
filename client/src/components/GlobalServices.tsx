import { Button } from "@/components/ui/button";
import React from "react";
import ResponsiveImage from "./ResponsiveImage";
import textilesImg from "../assets/textiles.jpg";
import automotiveImg from "../assets/automotive.jpg";
import electronicsImg from "../assets/electronics.jpg";
import consumerGoodsImg from "../assets/consumer-goods.jpg";
import agricultureImg from "../assets/agriculturee.jpg";
import pharmaImg from "../assets/pharma.jpg";

interface ServiceData {
  title: string;
  description: string;
  image: string;
  features: string[];
}

const services: ServiceData[] = [
  {
    title: "Textiles & Apparel",
    description:
      "Transform your textile business into a global brand. We provide comprehensive solutions from sourcing premium fabrics to delivering finished products worldwide. Our end-to-end services include quality audits, export-ready packaging, and compliance certifications tailored for Indian textile manufacturers.",
    image: textilesImg,
    features: [
      "Quality Control",
      "Global Distribution",
      "Packaging Solutions",
      "Export Compliance",
    ],
  },
  {
    title: "Automotive & Manufacturing",
    description:
      "Navigate the complex automotive export landscape with confidence. We specialize in auto parts, components, and machinery exports with complete compliance certification. Our experienced team manages technical documentation, quality standards, and international market access for manufacturers.",
    image: automotiveImg,
    features: [
      "Parts & Components",
      "Compliance Certification",
      "Supply Chain Management",
      "Technical Documentation",
    ],
  },
  {
    title: "Electronics & IT Hardware",
    description:
      "Break into global tech markets with our specialized electronics export services. From market research to buyer authentication, we handle technical certifications, testing protocols, and compliance requirements. Perfect for Indian tech manufacturers looking to scale internationally.",
    image: electronicsImg,
    features: [
      "Technical Certifications",
      "Market Research",
      "Buyer Authentication",
      "Testing & Compliance",
    ],
  },
  {
    title: "Consumer Goods & Retail",
    description:
      "Expand your FMCG and consumer products globally or establish international brands in India. We provide comprehensive packaging, branding, and digital marketing support along with complete logistics management. Our team specializes in helping international sellers penetrate the Indian market.",
    image: consumerGoodsImg,
    features: [
      "FMCG Solutions",
      "Branding & Packaging",
      "Digital Marketing",
      "Market Entry Strategy",
    ],
  },
  {
    title: "Food Processing & Agriculture",
    description:
      "Export agricultural products, spices, and processed foods with confidence. We manage quality certifications, cold chain logistics, and regulatory compliance for food exports. Our specialized team ensures your products meet international food safety standards and reach global markets fresh.",
    image: agricultureImg,
    features: [
      "Quality Certifications",
      "Cold Chain Logistics",
      "Food Safety Compliance",
      "Regulatory Support",
    ],
  },
  {
    title: "Pharmaceutical & Healthcare",
    description:
      "Navigate the stringent pharmaceutical export regulations with our expert guidance. We handle WHO-GMP certifications, regulatory compliance, and documentation for pharmaceutical exports. Our team ensures your healthcare products meet international quality standards and regulatory requirements.",
    image: pharmaImg,
    features: [
      "WHO-GMP Certification",
      "Regulatory Compliance",
      "Quality Assurance",
      "Export Documentation",
    ],
  },
];

const ServiceRow: React.FC<{ service: ServiceData; index: number }> = ({
  service,
  index,
}) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 ${index % 2 === 1 ? "md:flex-row-reverse" : ""
        }`}
    >
      <div className="flex-shrink-0 w-full md:w-[400px] h-[300px] relative group">
        <ResponsiveImage
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover rounded-3xl relative z-10"
          loading="lazy"
          decoding="async"
          style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
        />
      </div>

      <div className="flex-1">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground relative inline-block group">
          {service.title}
          {/* <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-teal-500 to-blue-800 group-hover:w-full transition-all duration-500"></span> */}
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          {service.description}
        </p>
        <div className="flex flex-wrap gap-3">
          {service.features.map((feature, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm border border-border hover:bg-primary/10 hover:border-primary"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const GlobalServices: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-20 px-6 md:px-12">
        {services.map((service, index) => (
          <div key={index}>
            <ServiceRow service={service} index={index} />
            {index < services.length - 1 && (
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-12"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalServices;
