// SEO Configuration for T-Imoexo
// Auto-generated from SEO component files

export interface HrefLang {
    hrefLang: string;
    href: string;
}

export interface AdditionalTag {
    name?: string;
    property?: string;
    content: string;
}

export interface SEOConfig {
    title: string;
    description: string;
    keywords: string;
    canonical: string;
    ogImage: string;
    hrefLangs: HrefLang[];
    additionalTags: AdditionalTag[];
    schema: any[];
}

export const seoConfig: Record<string, SEOConfig> = {
    "/": {
        title: "Import & Export Services | Global Trade Partner – T-Imoexo",
        description: "Complete import-export support including documentation, customs clearance, sourcing and global trade consulting from India to worldwide markets.",
        keywords: "import export services, global trade partner, customs clearance, documentation, sourcing, trade consulting, India",
        canonical: "https://t-imoexo.com/",
        ogImage: "https://t-imoexo.com/img/logo/icon.jpg",
        hrefLangs: [
            { hrefLang: "en-in", href: "https://t-imoexo.com/" },
            { hrefLang: "x-default", href: "https://t-imoexo.com/" }
        ],
        additionalTags: [
            { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
            { name: "geo.region", content: "IN-MH" },
            { name: "geo.placename", content: "Pune" },
            { name: "geo.position", content: "18.5204;73.8567" },
            { name: "ICBM", content: "18.5204, 73.8567" },
            { property: "og:locale", content: "en_IN" },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "T-Imoexo" },
            { property: "og:title", content: "Import & Export Services | Global Trade Partner – T-Imoexo" },
            { property: "og:description", content: "Complete import-export support including documentation, customs clearance, sourcing and global trade consulting from India to worldwide markets." },
            { property: "og:url", content: "https://t-imoexo.com/" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Import & Export Services | Global Trade Partner – T-Imoexo" },
            { name: "twitter:description", content: "T-Imoexo offers end-to-end import & export documentation, customs clearance and global trade solutions." }
        ],
        schema: [
            {
                "@context": "https://schema.org",
                "@type": ["Organization", "ProfessionalService"],
                name: "T-Imoexo",
                url: "https://t-imoexo.com/",
                logo: "https://t-imoexo.com/img/logo/icon.jpg",
                description: "T-Imoexo provides complete import and export services including global trade consulting, documentation, customs clearance and sourcing.",
                email: "info@imoexo.com",
                telephone: "+91 8237439036",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Pune",
                    addressRegion: "Maharashtra",
                    addressCountry: "IN"
                },
                areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                sameAs: ["https://t-imoexo.com/"]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "T-Imoexo",
                url: "https://t-imoexo.com/",
                inLanguage: "en-IN",
                potentialAction: {
                    "@type": "ContactAction",
                    target: "https://t-imoexo.com/contact",
                    name: "Contact T-Imoexo for Import & Export Services"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What services does T-Imoexo provide for import and export?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo provides end-to-end import and export services including documentation, HS code support, customs clearance, global sourcing, freight coordination and trade consulting."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Can T-Imoexo help with import and export documentation?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes. T-Imoexo prepares and verifies import and export documentation such as commercial invoices, packing lists, shipping bills, HS code classification and compliance-related paperwork required by customs and authorities."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Does T-Imoexo support global trade from India to multiple countries?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo supports exporters and importers in India to trade with multiple countries including GCC, Europe, North America and Asia by handling documentation, compliance, logistics coordination and trade advisory."
                        }
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement: [
                    {
                        "@type": "ListItem",
                        position: 1,
                        name: "Home",
                        item: "https://t-imoexo.com/"
                    }
                ]
            }
        ]
    },

    "/about": {
        title: "About T-Imoexo | Your Global Import & Export Partner",
        description: "Learn about T-Imoexo – an India-based import-export company helping businesses with global trade, documentation, customs, sourcing and export-import strategy.",
        keywords: "about T-Imoexo, import export company India, global trade partner, documentation, customs, sourcing",
        canonical: "https://t-imoexo.com/about",
        ogImage: "https://t-imoexo.com/img/logo/icon.jpg",
        hrefLangs: [
            { hrefLang: "en-in", href: "https://t-imoexo.com/about" },
            { hrefLang: "x-default", href: "https://t-imoexo.com/about" }
        ],
        additionalTags: [
            { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
            { name: "geo.region", content: "IN-MH" },
            { name: "geo.placename", content: "Pune" },
            { name: "geo.position", content: "18.5204;73.8567" },
            { name: "ICBM", content: "18.5204, 73.8567" },
            { property: "og:locale", content: "en_IN" },
            { property: "og:type", content: "profile" },
            { property: "og:site_name", content: "T-Imoexo" },
            { property: "og:title", content: "About T-Imoexo | Your Global Import & Export Partner" },
            { property: "og:description", content: "Learn about T-Imoexo – an India-based import-export company helping businesses with global trade, documentation, customs, sourcing and export-import strategy." },
            { property: "og:url", content: "https://t-imoexo.com/about" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "About T-Imoexo | Import & Export Company in India" },
            { name: "twitter:description", content: "T-Imoexo supports businesses with global trade, documentation, customs clearance, sourcing and export-import consulting." }
        ],
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "T-Imoexo",
                url: "https://t-imoexo.com/",
                logo: "https://t-imoexo.com/img/logo/icon.jpg",
                description: "T-Imoexo is an import-export company based in India, helping businesses with global trade operations, documentation, customs clearance, sourcing and trade advisory.",
                email: "info@imoexo.com",
                telephone: "+91 8237439036",
                address: {
                    "@type": "PostalAddress",
                    addressLocality: "Pune",
                    addressRegion: "Maharashtra",
                    postalCode: "411057",
                    addressCountry: "IN"
                },
                foundingLocation: "India",
                foundingDate: "2024",
                areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                sameAs: ["https://t-imoexo.com/"]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "About T-Imoexo",
                url: "https://t-imoexo.com/about",
                inLanguage: "en-IN",
                description: "About T-Imoexo – an Indian import-export company focused on global trade, documentation, customs support and sourcing.",
                isPartOf: {
                    "@type": "WebSite",
                    name: "T-Imoexo",
                    url: "https://t-imoexo.com/"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "Who is T-Imoexo?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo is an India-based import-export company that helps businesses with global trade operations including documentation, customs clearance, sourcing and export-import consulting."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "What is the role of T-Imoexo in global trade?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo acts as a trade partner for businesses, helping them manage import and export documentation, comply with customs regulations, identify HS codes, coordinate freight and build a smooth international trade process."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Which countries does T-Imoexo support for import and export?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo primarily supports trade from India to global markets including GCC countries, Europe, North America and Asia by handling documentation, compliance and logistics coordination."
                        }
                    }
                ]
            },
            {
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
                        name: "About",
                        item: "https://t-imoexo.com/about"
                    }
                ]
            }
        ]
    },

    "/contact": {
        title: "Contact T-Imoexo | Import & Export Support",
        description: "Reach out to T-Imoexo for import-export documentation, customs clearance, HS code and global trade support.",
        keywords: "contact T-Imoexo, import export support, documentation, customs clearance, HS code, global trade",
        canonical: "https://t-imoexo.com/contact",
        ogImage: "https://t-imoexo.com/img/logo/icon.jpg",
        hrefLangs: [
            { hrefLang: "en-in", href: "https://t-imoexo.com/contact" },
            { hrefLang: "x-default", href: "https://t-imoexo.com/contact" }
        ],
        additionalTags: [
            { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
            { name: "geo.region", content: "IN-MH" },
            { name: "geo.placename", content: "Pune" },
            { name: "geo.position", content: "18.5204;73.8567" },
            { name: "ICBM", content: "18.5204, 73.8567" },
            { property: "og:locale", content: "en_IN" },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "T-Imoexo" },
            { property: "og:title", content: "Contact T-Imoexo | Import & Export Support" },
            { property: "og:description", content: "Reach out to T-Imoexo for import-export documentation, customs clearance, HS code and global trade support." },
            { property: "og:url", content: "https://t-imoexo.com/contact" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Contact T-Imoexo | Import & Export Experts" },
            { name: "twitter:description", content: "Get expert help for import-export documentation, customs and trade compliance from T-Imoexo." }
        ],
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "ContactPage",
                name: "Contact T-Imoexo",
                url: "https://t-imoexo.com/contact",
                description: "Contact page for T-Imoexo, an import-export service provider offering documentation, customs clearance and global trade support."
            },
            {
                "@context": "https://schema.org",
                "@type": "LocalBusiness",
                name: "T-Imoexo",
                url: "https://t-imoexo.com/",
                logo: "https://t-imoexo.com/img/logo/icon.jpg",
                description: "T-Imoexo provides import-export services including documentation, customs clearance, HS code support, sourcing and trade advisory.",
                telephone: "+91 8237439036",
                email: "info@imoexo.com",
                address: {
                    "@type": "PostalAddress",
                    streetAddress: "Hinjewadi",
                    addressLocality: "Pune",
                    addressRegion: "Maharashtra",
                    postalCode: "411057",
                    addressCountry: "IN"
                },
                areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                openingHoursSpecification: [
                    {
                        "@type": "OpeningHoursSpecification",
                        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        opens: "09:00",
                        closes: "18:00"
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "How can I contact T-Imoexo for import-export services?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "You can contact T-Imoexo by submitting the enquiry form on this page, emailing info@imoexo.com or calling +91 8237439036 for import-export documentation, customs and global trade support."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "What details should I share when contacting T-Imoexo?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "To get faster support, share your product details, HS code if available, target countries, whether it is an import or export requirement and your contact information."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Does T-Imoexo provide consultation for new import-export businesses?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes. T-Imoexo provides consultation for new and existing businesses, helping them understand documentation, compliance, customs clearance and global trade processes."
                        }
                    }
                ]
            },
            {
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
                        name: "Contact",
                        item: "https://t-imoexo.com/contact"
                    }
                ]
            }
        ]
    },

    "/resources": {
        title: "Import & Export Resources | Trade Guides & Blogs – T-Imoexo",
        description: "Browse import-export blogs, documentation step-by-step guides, customs procedures, HS codes, INCOTERMS and trade knowledge resources.",
        keywords: "import export resources, trade guides, blogs, documentation guides, customs procedures, HS codes, INCOTERMS",
        canonical: "https://t-imoexo.com/resources",
        ogImage: "https://t-imoexo.com/img/logo/icon.jpg",
        hrefLangs: [
            { hrefLang: "en-in", href: "https://t-imoexo.com/resources" },
            { hrefLang: "x-default", href: "https://t-imoexo.com/resources" }
        ],
        additionalTags: [
            { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
            { name: "geo.region", content: "IN-MH" },
            { name: "geo.placename", content: "Pune" },
            { name: "geo.position", content: "18.5204;73.8567" },
            { name: "ICBM", content: "18.5204, 73.8567" },
            { property: "og:locale", content: "en_IN" },
            { property: "og:type", content: "website" },
            { property: "og:site_name", content: "T-Imoexo" },
            { property: "og:title", content: "Import & Export Resources | Trade Guides & Blogs – T-Imoexo" },
            { property: "og:description", content: "Browse import-export blogs, documentation step-by-step guides, customs procedures, HS codes, INCOTERMS and trade knowledge resources." },
            { property: "og:url", content: "https://t-imoexo.com/resources" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Import & Export Blogs & Resources – T-Imoexo" },
            { name: "twitter:description", content: "Documentation guides, HS codes, customs process, export-import tutorials and global trade knowledge blogs." }
        ],
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: "Import & Export Resources",
                url: "https://t-imoexo.com/resources",
                inLanguage: "en-IN",
                about: "Import and export documentation, global trade knowledge, HS codes, customs process guides and INCOTERMS.",
                description: "T-Imoexo's library of import-export resources, documentation guides, customs procedures, HS codes and trade knowledge blogs.",
                isPartOf: {
                    "@type": "WebSite",
                    name: "T-Imoexo",
                    url: "https://t-imoexo.com/"
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "Blog",
                name: "T-Imoexo Trade Knowledge Base",
                url: "https://t-imoexo.com/resources",
                description: "Import-export blogs covering documentation, customs procedures, HS codes, INCOTERMS and global trade tutorials for beginners and businesses.",
                publisher: {
                    "@type": "Organization",
                    name: "T-Imoexo",
                    url: "https://t-imoexo.com/",
                    logo: {
                        "@type": "ImageObject",
                        url: "https://t-imoexo.com/img/logo/icon.jpg"
                    }
                }
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What import-export topics are covered in T-Imoexo resources?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "The T-Imoexo resources section covers import-export documentation, HS code classification, customs procedures, INCOTERMS, trade compliance, sourcing, logistics and global trade strategies."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Who can benefit from T-Imoexo's import-export guides?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Entrepreneurs, exporters, importers, students, beginners and global trade professionals can benefit from step-by-step documentation guides and trade knowledge articles on T-Imoexo."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Are these import-export guides beginner friendly?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes. All resources are beginner-friendly, explaining each step of documentation, customs, HS codes and global trade procedures in simple and practical language."
                        }
                    }
                ]
            },
            {
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
            }
        ]
    },

    "/services": {
        title: "Import & Export Services | Documentation & Customs Support – T-Imoexo",
        description: "T-Imoexo provides complete import-export documentation, customs clearance, HS code classification, global sourcing and freight coordination services.",
        keywords: "import export services, documentation, customs support, HS code classification, global sourcing, freight coordination",
        canonical: "https://t-imoexo.com/services",
        ogImage: "https://t-imoexo.com/img/logo/icon.jpg",
        hrefLangs: [
            { hrefLang: "en-in", href: "https://t-imoexo.com/services" },
            { hrefLang: "x-default", href: "https://t-imoexo.com/services" }
        ],
        additionalTags: [
            { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
            { name: "geo.region", content: "IN-MH" },
            { name: "geo.placename", content: "Pune" },
            { name: "geo.position", content: "18.5204;73.8567" },
            { name: "ICBM", content: "18.5204, 73.8567" },
            { property: "og:locale", content: "en_IN" },
            { property: "og:type", content: "article" },
            { property: "og:site_name", content: "T-Imoexo" },
            { property: "og:title", content: "Import & Export Services | Documentation & Customs Support – T-Imoexo" },
            { property: "og:description", content: "T-Imoexo provides complete import-export documentation, customs clearance, HS code classification, global sourcing and freight coordination services." },
            { property: "og:url", content: "https://t-imoexo.com/services" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Import & Export Services | Documentation & Customs – T-Imoexo" },
            { name: "twitter:description", content: "Full import-export service suite including documentation, HS codes, customs clearance and trade advisory." }
        ],
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "T-Imoexo - Import & Export Services",
                url: "https://t-imoexo.com/services",
                logo: "https://t-imoexo.com/img/logo/icon.jpg",
                description: "T-Imoexo provides comprehensive import-export services including documentation, HS code support, customs clearance, global sourcing and freight coordination.",
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
                    "International Trade Services"
                ],
                areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                telephone: "+91 8237439036",
                email: "info@imoexo.com"
            },
            {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                    {
                        "@type": "Question",
                        name: "What import services does T-Imoexo provide?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo provides import documentation, HS code identification, customs clearance support, sourcing, freight coordination, trade compliance review and advisory for smooth import operations."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "What export services does T-Imoexo offer?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo assists exporters with complete export documentation, HS code classification, licensing, global buyer sourcing, logistics support, customs liaison and international compliance."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Can T-Imoexo help in customs clearance?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "Yes. T-Imoexo supports businesses with customs documentation verification, HS code accuracy, valuation guidelines, regulatory compliance and coordination with customs agents."
                        }
                    },
                    {
                        "@type": "Question",
                        name: "Do you provide global sourcing services?",
                        acceptedAnswer: {
                            "@type": "Answer",
                            text: "T-Imoexo offers global sourcing from verified manufacturers and suppliers, ensuring quality documentation, shipping coordination and end-to-end support."
                        }
                    }
                ]
            },
            {
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
                        name: "Services",
                        item: "https://t-imoexo.com/services"
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Import & Export Services",
                url: "https://t-imoexo.com/services",
                inLanguage: "en-IN",
                description: "Complete range of import-export services including documentation, customs clearance, HS code support and global sourcing.",
                isPartOf: {
                    "@type": "WebSite",
                    url: "https://t-imoexo.com/"
                }
            }
        ]
    },

    "/solutions": {
        title: "Trade Solutions & Export Strategy | T-ImoExo Pune",
        description: "Get tailored trade solutions with T-ImoExo Pune — export strategy, supplier verification, logistics planning, and compliance support across India.",
        keywords: "Export Solutions India, Trade Consultancy Pune, Market Research Export, Supplier Verification, Export Planning, Business Expansion India",
        canonical: "https://t-imoexo.com/solutions",
        ogImage: "https://t-imoexo.com/img/logo/icon.jpg",
        hrefLangs: [
            { hrefLang: "en-in", href: "https://t-imoexo.com/solutions" },
            { hrefLang: "x-default", href: "https://t-imoexo.com/solutions" }
        ],
        additionalTags: [
            { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
            { name: "geo.region", content: "IN-MH" },
            { name: "geo.placename", content: "Pune" },
            { name: "geo.position", content: "18.5204;73.8567" },
            { name: "ICBM", content: "18.5204, 73.8567" },
            { property: "og:locale", content: "en_IN" },
            { property: "og:type", content: "article" },
            { property: "og:site_name", content: "T-Imoexo" },
            { property: "og:title", content: "Trade Solutions & Export Strategy | T-ImoExo Pune" },
            { property: "og:description", content: "Get tailored trade solutions with T-ImoExo Pune — export strategy, supplier verification, logistics planning, and compliance support across India." },
            { property: "og:url", content: "https://t-imoexo.com/solutions" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Trade Solutions & Export Strategy | T-ImoExo Pune" },
            { name: "twitter:description", content: "Tailored trade solutions including export strategy, supplier verification and compliance support." }
        ],
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "ProfessionalService",
                name: "T-Imoexo - Trade Solutions & Export Strategy",
                url: "https://t-imoexo.com/solutions",
                logo: "https://t-imoexo.com/img/logo/icon.jpg",
                description: "Tailored trade solutions with export strategy, supplier verification, logistics planning, and compliance support.",
                serviceType: [
                    "Export Strategy",
                    "Supplier Verification",
                    "Market Research Export",
                    "Export Planning",
                    "Business Expansion",
                    "Trade Consultancy"
                ],
                areaServed: ["IN", "AE", "SA", "QA", "CN", "US", "GB", "EU"],
                telephone: "+91 8237439036",
                email: "info@imoexo.com"
            },
            {
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
                        name: "Solutions",
                        item: "https://t-imoexo.com/solutions"
                    }
                ]
            },
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Trade Solutions & Export Strategy",
                url: "https://t-imoexo.com/solutions",
                inLanguage: "en-IN",
                description: "Tailored trade solutions with export strategy, supplier verification, logistics planning, and compliance support.",
                isPartOf: {
                    "@type": "WebSite",
                    url: "https://t-imoexo.com/"
                }
            }
        ]
    },

    "/contact-success": {
        title: "Contact Success | T-ImoExo",
        description: "Your contact form submission was successful. We'll get back to you soon.",
        keywords: "contact success, form submitted, T-ImoExo contact",
        canonical: "https://t-imoexo.com/contact-success",
        ogImage: "https://t-imoexo.com/img/logo/icon.jpg",
        hrefLangs: [
            { hrefLang: "en-in", href: "https://t-imoexo.com/contact-success" },
            { hrefLang: "x-default", href: "https://t-imoexo.com/contact-success" }
        ],
        additionalTags: [
            { name: "robots", content: "noindex, nofollow" },
            { property: "og:locale", content: "en_IN" },
            { property: "og:type", content: "article" },
            { property: "og:site_name", content: "T-Imoexo" },
            { property: "og:title", content: "Contact Success | T-ImoExo" },
            { property: "og:description", content: "Your contact form submission was successful. We'll get back to you soon." },
            { property: "og:url", content: "https://t-imoexo.com/contact-success" },
            { name: "twitter:card", content: "summary_large_image" },
            { name: "twitter:title", content: "Contact Success | T-ImoExo" },
            { name: "twitter:description", content: "Your contact form submission was successful." }
        ],
        schema: [
            {
                "@context": "https://schema.org",
                "@type": "WebPage",
                name: "Contact Success",
                url: "https://t-imoexo.com/contact-success",
                inLanguage: "en-IN",
                description: "Contact form submission success page.",
                isPartOf: {
                    "@type": "WebSite",
                    url: "https://t-imoexo.com/"
                }
            }
        ]
    }
};
