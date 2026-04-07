import { Helmet } from "react-helmet";

interface SEOResourcesProps {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
}

const SEOResources: React.FC<SEOResourcesProps> = ({
    title,
    description,
    keywords,
    canonical
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
                content="Import & Export Resources | Trade Guides & Blogs – T-Imoexo"
            />
            <meta
                property="og:description"
                content="Browse import-export blogs, documentation step-by-step guides, customs procedures, HS codes, INCOTERMS and trade knowledge resources."
            />
            <meta property="og:url" content="https://t-imoexo.com/resources" />
            <meta
                property="og:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta
                name="twitter:title"
                content="Import & Export Blogs & Resources – T-Imoexo"
            />
            <meta
                name="twitter:description"
                content="Documentation guides, HS codes, customs process, export-import tutorials and global trade knowledge blogs."
            />
            <meta
                name="twitter:image"
                content="https://t-imoexo.com/img/logo/icon.jpg"
            />

            {/* JSON-LD: CollectionPage */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "CollectionPage",
                    name: "Import & Export Resources",
                    url: "https://t-imoexo.com/resources",
                    inLanguage: "en-IN",
                    about:
                        "Import and export documentation, global trade knowledge, HS codes, customs process guides and INCOTERMS.",
                    description:
                        "T-Imoexo’s library of import-export resources, documentation guides, customs procedures, HS codes and trade knowledge blogs.",
                    isPartOf: {
                        "@type": "WebSite",
                        name: "T-Imoexo",
                        url: "https://t-imoexo.com/"
                    }
                })}
            </script>

            {/* JSON-LD: Blog / Knowledge Base Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Blog",
                    name: "T-Imoexo Trade Knowledge Base",
                    url: "https://t-imoexo.com/resources",
                    description:
                        "Import-export blogs covering documentation, customs procedures, HS codes, INCOTERMS and global trade tutorials for beginners and businesses.",
                    publisher: {
                        "@type": "Organization",
                        name: "T-Imoexo",
                        url: "https://t-imoexo.com/",
                        logo: {
                            "@type": "ImageObject",
                            url: "https://t-imoexo.com/img/logo/icon.jpg"
                        }
                    }
                })}
            </script>

            {/* JSON-LD: FAQ Schema for Resources Page */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: [
                        {
                            "@type": "Question",
                            name:
                                "What import-export topics are covered in T-Imoexo resources?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "The T-Imoexo resources section covers import-export documentation, HS code classification, customs procedures, INCOTERMS, trade compliance, sourcing, logistics and global trade strategies."
                            }
                        },
                        {
                            "@type": "Question",
                            name:
                                "Who can benefit from T-Imoexo’s import-export guides?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "Entrepreneurs, exporters, importers, students, beginners and global trade professionals can benefit from step-by-step documentation guides and trade knowledge articles on T-Imoexo."
                            }
                        },
                        {
                            "@type": "Question",
                            name:
                                "Are these import-export guides beginner friendly?",
                            acceptedAnswer: {
                                "@type": "Answer",
                                text:
                                    "Yes. All resources are beginner-friendly, explaining each step of documentation, customs, HS codes and global trade procedures in simple and practical language."
                            }
                        }
                    ]
                })}
            </script>

            {/* JSON-LD: Breadcrumb Schema */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BreadcrumbList",
                    itemListElement: [
                        {
                            "@type": "ListItem",
                            position: 1,
                            name: "Home",
                            item: "https://t-imoexo.com/"
                        },
                        {
                            "@type": "ListItem",
                            position: 2,
                            name: "Resources",
                            item: "https://t-imoexo.com/resources"
                        }
                    ]
                })}
            </script>
        </Helmet>
    );
};

export default SEOResources;
