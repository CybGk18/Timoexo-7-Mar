import { Helmet } from "react-helmet";

interface SEOServicesProps {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
}

const SEOServices: React.FC<SEOServicesProps> = ({
    title,
    description,
    keywords,
    canonical,
}) => {
    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            <meta
                name="robots"
                content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />

            {/* Canonical & Hreflang */}
            <link rel="canonical" href={canonical} />
            <link rel="alternate" href={canonical} hrefLang="en-in" />
            <link rel="alternate" href={canonical} hrefLang="x-default" />

            {/* GEO Tags */}
            <meta name="geo.region" content="IN-MH" />
            <meta name="geo.placename" content="Pune" />
            <meta name="geo.position" content="18.5204;73.8567" />
            <meta name="ICBM" content="18.5204, 73.8567" />

            {/* Open Graph */}
            <meta property="og:locale" content="en_IN" />
            <meta property="og:type" content="article" />
            <meta property="og:site_name" content="T-Imoexo" />
            <meta
                property="og:title"
                content="Import & Export Services | Documentation & Customs Support – T-Imoexo"
            />
            <meta
                property="og:description"
                content="T-Imoexo provides complete import-export documentation, customs clearance, HS code classification, global sourcing and freight coordination services."
            />
            <meta property="og:url" content="https://t-imoexo.com/services" />
            <meta
                property="og:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="Import & Export Services | Documentation & Customs – T-Imoexo"
            />
            <meta
                name="twitter:description"
                content="Full import-export service suite including documentation, HS codes, customs clearance and trade advisory."
            />
            <meta
                name="twitter:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* JSON-LD: ProfessionalService Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ProfessionalService",
                    name: "T-Imoexo - Import & Export Services",
                    url: "https://t-imoexo.com/services",
                    logo: "https://t-imoexo.com/img/logo/icon.jpg",
                    description:
                        "T-Imoexo provides comprehensive import-export services including documentation, HS code support, customs clearance, global sourcing and freight coordination.",
                    serviceType: [
                        "Import Documentation",
                        "Export Documentation",
                        "Customs Clearance Support",
                        "HS Code Classification",
                        "Freight Coordination",
                        "Global Sourcing",
                        "Trade Compliance Consulting",
                        "Export Licensing Support",
                        "Import Advisory",
                        "International Trade Services",
                    ],
                    areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                    telephone: "+91 8237439036",
                    email: "info@imoexo.com",
                })}
            </script>

            {/* JSON-LD: FAQPage Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: "What import services does T-Imoexo provide?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo provides import documentation, HS code identification, customs clearance support, sourcing, freight coordination, trade compliance review and advisory for smooth import operations.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "What export services does T-Imoexo offer?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo assists exporters with complete export documentation, HS code classification, licensing, global buyer sourcing, logistics support, customs liaison and international compliance.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "Can T-Imoexo help in customs clearance?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "Yes. T-Imoexo supports businesses with customs documentation verification, HS code accuracy, valuation guidelines, regulatory compliance and coordination with customs agents.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "Do you provide global sourcing services?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo offers global sourcing from verified manufacturers and suppliers, ensuring quality documentation, shipping coordination and end-to-end support.",
                            },
                        },
                    ],
                })}
            </script>

            {/* JSON-LD: Breadcrumb List */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Home",
                            item: "https://t-imoexo.com/",
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Services",
                            item: "https://t-imoexo.com/services",
                        },
                    ],
                })}
            </script>

            {/* JSON-LD: WebPage Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "Import & Export Services",
                    url: "https://t-imoexo.com/services",
                    inLanguage: "en-IN",
                    description:
                        "Complete range of import-export services including documentation, customs clearance, HS code support and global sourcing.",
                    isPartOf: {
                        "@type": "WebSite",
                        url: "https://t-imoexo.com/",
                    },
                })}
            </script>
        </Helmet>
    );
};

export default SEOServices;
