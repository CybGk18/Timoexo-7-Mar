
import { Helmet } from "react-helmet";

interface SEOAboutProps {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
}

const SEOAbout: React.FC<SEOAboutProps> = ({
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
            <meta property="og:type" content="profile" />
            <meta property="og:site_name" content="T-Imoexo" />
            <meta
                property="og:title"
                content="About T-Imoexo | Your Global Import & Export Partner"
            />
            <meta
                property="og:description"
                content="Learn about T-Imoexo – an India-based import-export company helping businesses with global trade, documentation, customs, sourcing and export-import strategy."
            />
            <meta property="og:url" content="https://t-imoexo.com/about" />
            <meta
                property="og:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="About T-Imoexo | Import & Export Company in India"
            />
            <meta
                name="twitter:description"
                content="T-Imoexo supports businesses with global trade, documentation, customs clearance, sourcing and export-import consulting."
            />
            <meta
                name="twitter:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* JSON-LD: Organization Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Organization",
                    name: "T-Imoexo",
                    url: "https://t-imoexo.com/",
                    logo: "https://t-imoexo.com/img/logo/icon.jpg",
                    description:
                        "T-Imoexo is an import-export company based in India, helping businesses with global trade operations, documentation, customs clearance, sourcing and trade advisory.",
                    email: "info@imoexo.com",
                    telephone: "+91 8237439036",
                    address: {
                        "@type": "PostalAddress",
                        addressLocality: "Pune",
                        addressRegion: "Maharashtra",
                        postalCode: "411057",
                        addressCountry: "IN",
                    },
                    foundingLocation: "India",
                    foundingDate: "2024",
                    areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                    sameAs: ["https://t-imoexo.com/"],
                })}
            </script>

            {/* JSON-LD: WebPage Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    name: "About T-Imoexo",
                    url: "https://t-imoexo.com/about",
                    inLanguage: "en-IN",
                    description:
                        "About T-Imoexo – an Indian import-export company focused on global trade, documentation, customs support and sourcing.",
                    isPartOf: {
                        "@type": "WebSite",
                        name: "T-Imoexo",
                        url: "https://t-imoexo.com/",
                    },
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
                            name: "Who is T-Imoexo?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo is an India-based import-export company that helps businesses with global trade operations including documentation, customs clearance, sourcing and export-import consulting.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "What is the role of T-Imoexo in global trade?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo acts as a trade partner for businesses, helping them manage import and export documentation, comply with customs regulations, identify HS codes, coordinate freight and build a smooth international trade process.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "Which countries does T-Imoexo support for import and export?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "T-Imoexo primarily supports trade from India to global markets including GCC countries, Europe, North America and Asia by handling documentation, compliance and logistics coordination.",
                            },
                        },
                    ],
                })}
            </script>

            {/* JSON-LD: BreadcrumbList */}
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
                            name: "About",
                            item: "https://t-imoexo.com/about",
                        },
                    ],
                })}
            </script>
        </Helmet>
    );
};

export default SEOAbout;
