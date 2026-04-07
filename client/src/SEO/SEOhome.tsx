import { Helmet } from "react-helmet";

interface SEOHomeProps {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
}

const SEOHome: React.FC<SEOHomeProps> = ({
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

            {/* Open Graph Tags */}
            <meta property="og:locale" content="en_IN" />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="T-Imoexo" />
            <meta
                property="og:title"
                content="Import & Export Services | Global Trade Partner – T-Imoexo"
            />
            <meta
                property="og:description"
                content="Complete import-export support including documentation, customs clearance, sourcing and global trade consulting from India to worldwide markets."
            />
            <meta property="og:url" content="https://t-imoexo.com/" />
            <meta
                property="og:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="Import & Export Services | Global Trade Partner – T-Imoexo"
            />
            <meta
                name="twitter:description"
                content="T-Imoexo offers end-to-end import & export documentation, customs clearance and global trade solutions."
            />
            <meta
                name="twitter:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* JSON-LD: Organization / ProfessionalService */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": ["Organization", "ProfessionalService"],
                    name: "T-Imoexo",
                    url: "https://t-imoexo.com/",
                    logo: "https://t-imoexo.com/img/logo/icon.jpg",
                    description:
                        "T-Imoexo provides complete import and export services including global trade consulting, documentation, customs clearance and sourcing.",
                    email: "info@imoexo.com",
                    telephone: "+91 8237439036",
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Pune",
                        addressRegion: "Maharashtra",
                        addressCountry: "IN",
                    },
                    areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                    sameAs: ["https://t-imoexo.com/"],
                })}
            </script>

            {/* JSON-LD: WebSite Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    name: "T-Imoexo",
                    url: "https://t-imoexo.com/",
                    inLanguage: "en-IN",
                    potentialAction: {
                        "@type": "ContactAction",
                        target: "https://t-imoexo.com/contact",
                        name: "Contact T-Imoexo for Import & Export Services",
                    },
                })}
            </script>

            {/* JSON-LD: FAQPage */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: "What services does T-Imoexo provide for import and export?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo provides end-to-end import and export services including documentation, HS code support, customs clearance, global sourcing, freight coordination and trade consulting.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "Can T-Imoexo help with import and export documentation?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "Yes. T-Imoexo prepares and verifies import and export documentation such as commercial invoices, packing lists, shipping bills, HS code classification and compliance-related paperwork required by customs and authorities.",
                            },
                        },
                        {
                            "@type": "Question",
                            name:
                                "Does T-Imoexo support global trade from India to multiple countries?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo supports exporters and importers in India to trade with multiple countries including GCC, Europe, North America and Asia by handling documentation, compliance, logistics coordination and trade advisory.",
                            },
                        },
                    ],
                })}
            </script>

            {/* JSON-LD: BreadcrumbList (Home) */}
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
                    ],
                })}
            </script>
        </Helmet>
    );
};

export default SEOHome;
