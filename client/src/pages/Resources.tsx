import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import SEO from "../SEO/SEO";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
import ResourcesHero from "@/components/ResourcesHero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock, ExternalLink, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import FAQ from "@/components/FAQ";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [resourcesRef, resourcesInView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/public-blogs.php`);
        const data = await response.json();

        if (data.success && data.data) {
          const transformed = data.data.map((post: any) => ({
            id: post.id.toString(),
            title: post.title || "Untitled",
            slug: post.slug || post.title?.toLowerCase().replace(/\s+/g, '-') || 'untitled',
            type: post.type || post.category || "General",
            excerpt: post.excerpt || "",
            content: post.content || "",
            author: post.author || "T-IMOEXO Team",
            date: new Date(post.created_at || post.published_date || Date.now()).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            }),
            readTime:
              Math.ceil((post.content?.split(" ").length || 100) / 200) + " min read",
            image: post.featured_image || post.image_url || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
            category: post.type || post.category || "General",
            tags: post.tags ? post.tags.split(',').map((t: string) => t.trim()) : [],
          }));
          setBlogPosts(transformed);
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);
  const faqs = [
    {
      question: "What services does T-Imoexo provide for import and export businesses?",
      answer:
        "T-Imoexo offers complete end-to-end import and export support, including documentation, customs clearance, HS code assistance, supplier verification, logistics coordination, buyer–seller matching, shipment tracking, and trade consultancy. We help manufacturers, buyers, and traders streamline the entire international trade process with accuracy and compliance."
    },
    {
      question: "How does T-Imoexo help with import–export documentation and compliance?",
      answer:
        "Our team prepares and manages all essential documents such as IEC, commercial invoices, packing lists, shipping bills, bills of lading, COO, insurance papers, DGFT filings, and compliance certificates. We ensure every document meets international trade regulations so your shipments move without delays or penalties."
    },
    {
      question: "Can T-Imoexo connect me with global suppliers and buyers?",
      answer:
        "Yes, T-Imoexo specializes in B2B matchmaking. We connect verified manufacturers, exporters, distributors, and importers across countries like China, UAE, Gulf nations, Africa, Europe, and India. Our network ensures safe, trusted, and profitable trade partnerships."
    },
    {
      question: "What industries does T-Imoexo support for international trade?",
      answer:
        "T-Imoexo works across multiple industries including FMCG, electronics, textiles, agriculture, heavy machinery, chemicals, pharmaceuticals, automotive parts, and consumer products. Whether you are a startup exporter or an established importer, we support all categories with customized trade solutions."
    },
    {
      question: "How can I get started with T-Imoexo for import or export requirements?",
      answer:
        "Simply contact us through the website form or reach out via email or phone. Share your product details, target country, and requirement type (import or export). Our team analyzes your needs and provides the best trade route, documentation guidance, pricing, and supplier/buyer options to get your process started smoothly."
    }
  ];

  const filteredResources = useMemo(() => {
    return blogPosts.filter((r) => {
      const matchSearch =
        (r.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchType = selectedType === "All" || r.category === selectedType;
      return matchSearch && matchType;
    });
  }, [searchTerm, selectedType, blogPosts]);

  return (
    <>
      <SEO page="resources" />

      <div className="min-h-screen bg-white text-[#0a0a1a] overflow-hidden">

        {/* <Header /> */}

        {/* Hero Section */}
        <section className="relative text-center  bg-gradient-to-b from-white via-[#f8fbff] to-[#eef6ff]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#00bcd420,_transparent_60%)] blur-2xl" />
          <div className="relative z-10">
            {/* <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-[#00bcd4] via-[#0055ff] to-[#00bcd4] text-transparent bg-clip-text mb-6">
            Explore Our Insights
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto mb-10">
            Discover thought leadership articles, in-depth case studies, and expert ePapers from Cybaem Tech.
          </p> */}
            <ResourcesHero
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          </div>
        </section>

        {/* Resources Section */}
        <section
          ref={resourcesRef}
          className={`py-16 md:py-24 transition-all duration-1000 ${resourcesInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
        >
          <div className="container mx-auto px-6 max-w-7xl">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <Loader2 className="w-12 h-12 text-[#00bcd4] animate-spin" />
              </div>
            ) : filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredResources.map((r, i) => (
                  <Card
                    key={r.id}
                    className="group bg-white border border-gray-200 hover:border-[#00bcd4]/50 shadow-md hover:shadow-[0_0_25px_rgba(0,188,212,0.2)] rounded-2xl overflow-hidden transition-all duration-500"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={r.image}
                        alt={r.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 text-[#00bcd4]" />
                        {r.date}
                        <Clock className="w-4 h-4 ml-4 text-[#0055ff]" />
                        {r.readTime}
                      </div>
                      <h3 className="text-xl font-semibold text-[#0a0a1a] mb-2 group-hover:text-[#0055ff] transition-colors">
                        {r.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {r.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {r.tags.slice(0, 3).map((t: string, j: number) => (
                          <span
                            key={j}
                            className="px-2 py-1 text-xs bg-[#eef6ff] text-[#0055ff] rounded-full"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-[#00bcd4] to-[#0055ff] hover:from-[#0055ff] hover:to-[#00bcd4] text-white font-semibold rounded-full transition-all"
                      >
                        <Link
                          to={`/${r.type?.toLowerCase().replace(/\s+/g, "-") || "blog"}/${r.slug}`}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Read More
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 text-[#00bcd4]" />
                <p>No matching results found</p>
              </div>
            )}
          </div>
        </section>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <FAQ faqs={faqs} />
        </div>
        {/* CTA Section */}
        <section className="relative py-20 bg-gradient-to-r from-[#00bcd4]/10 via-[#0055ff]/10 to-[#00bcd4]/10">
          <div className="container mx-auto px-6 text-center">
            <h3 className="text-4xl font-bold bg-gradient-to-r from-[#00bcd4] to-[#0055ff] bg-clip-text text-transparent mb-4">
              Need Expert Guidance?
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Let’s discuss how our tailored digital solutions can empower your business transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-[#00bcd4] to-[#0055ff] hover:from-[#0055ff] hover:to-[#00bcd4] text-white font-semibold rounded-full shadow-lg"
              >
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border border-[#00bcd4] text-[#0055ff] hover:bg-[#eef6ff] font-semibold rounded-full"
              >
                <Link to="/about">Learn About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Resources;
