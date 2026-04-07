import { Helmet } from "react-helmet";

interface SEOContactProps {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
}

const SEOContact: React.FC<SEOContactProps> = ({
    title,
    description,
    keywords,
    canonical,
}) => {
    return (
        <Helmet>
            {/* Basic SEO */}
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />

            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
            
            {/* Canonical */}
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
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content="T-Imoexo" />
            <meta property="og:title" content="Contact T-Imoexo | Import & Export Support" />
            <meta property="og:description" content="Reach out to T-Imoexo for import-export documentation, customs clearance, HS code and global trade support." />
            <meta property="og:url" content="https://t-imoexo.com/contact" />
            <meta property="og:image" content="https://t-imoexo.com/img/logo/icon.jpg" />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Contact T-Imoexo | Import & Export Experts" />
            <meta name="twitter:description" content="Get expert help for import-export documentation, customs and trade compliance from T-Imoexo." />
            <meta name="twitter:image" content="https://t-imoexo.com/img/logo/icon.jpg" />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "ContactPage",
                    name: "Contact T-Imoexo",
                    url: "https://t-imoexo.com/contact",
                    description:
                        "Contact page for T-Imoexo, an import-export service provider offering documentation, customs clearance and global trade support.",
                })}
            </script>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "LocalBusiness",
                    name: "T-Imoexo",
                    url: "https://t-imoexo.com/",
                    logo: "https://t-imoexo.com/img/logo/icon.jpg",
                    description:
                        "T-Imoexo provides import-export services including documentation, customs clearance, HS code support, sourcing and trade advisory.",
                    telephone: "+91 8237439036",
                    email: "info@imoexo.com",
                    address: {
                        "@type": "PostalAddress",
                        streetAddress: "Hinjewadi",
                        addressLocality: "Pune",
                        addressRegion: "Maharashtra",
                        postalCode: "411057",
                        addressCountry: "IN",
                    },
                    areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                    openingHoursSpecification: [
                        {
                            "@type": "OpeningHoursSpecification",
                            dayOfWeek: [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                            ],
                            opens: "09:00",
                            closes: "18:00",
                        },
                    ],
                })}
            </script>

            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name: "How can I contact T-Imoexo for import-export services?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "You can contact T-Imoexo by submitting the enquiry form on this page, emailing info@imoexo.com or calling +91 8237439036 for import-export documentation, customs and global trade support.",
                            },
                        },
                        {
                            "@type": "Question",
                            name: "What details should I share when contacting T-Imoexo?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "To get faster support, share your product details, HS code if available, target countries, whether it is an import or export requirement and your contact information.",
                            },
                        },
                        {
                            "@type": "Question",
                            name:
                                "Does T-Imoexo provide consultation for new import-export businesses?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "Yes. T-Imoexo provides consultation for new and existing businesses, helping them understand documentation, compliance, customs clearance and global trade processes.",
                            },
                        },
                    ],
                })}
            </script>

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
                            name: "Contact",
                            item: "https://t-imoexo.com/contact",
                        },
                    ],
                })}
            </script>
        </Helmet>
    );
};

export default SEOContact;
