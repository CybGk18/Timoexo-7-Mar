import { Globe, Layers3, Mail, Package, Phone, Search } from "lucide-react";
import { useMemo, useState } from "react";
import CompanySection from "@/components/CompanySection";
import CartDrawer from "@/components/CartDrawer";
import { companies } from "@/data/products";

const Products = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const sectors = useMemo(() => [...new Set(companies.map((company) => company.sector))], []);

  const sectorProductCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    for (const company of companies) {
      counts[company.sector] = (counts[company.sector] ?? 0) + company.products.length;
    }

    return counts;
  }, []);

  const filteredCompanies = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return companies.filter((company) => {
      if (activeFilter && company.sector !== activeFilter) {
        return false;
      }

      if (!query) {
        return true;
      }

      return (
        company.name.toLowerCase().includes(query) ||
        company.products.some((product) => {
          const variantHit =
            Array.isArray(product.variants) &&
            product.variants.some((variant) => variant.toLowerCase().includes(query));

          return (
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            variantHit
          );
        })
      );
    });
  }, [activeFilter, searchQuery]);

  const totalProducts = companies.reduce((count, company) => count + company.products.length, 0);
  const visibleProducts = filteredCompanies.reduce((count, company) => count + company.products.length, 0);
  const hasFilterApplied = Boolean(searchQuery.trim() || activeFilter);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#edf2f7_38%,#f8fafc_100%)]">
      <header className="relative overflow-hidden border-b border-[#0D9488]/30 bg-[linear-gradient(152deg,#0F1C3F_0%,#1E3A8A_50%,#0D9488_100%)] px-4 pb-14 pt-30">
        <div className="absolute inset-0">
          {/* Brand-colored glow blobs */}
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#0D9488]/25 blur-[130px]" />
          <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-[#1E3A8A]/35 blur-[130px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-[#0D9488]/10 blur-[160px]" />
          {/* Subtle grid/mesh overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_30%,rgba(255,255,255,0.09),transparent_40%),radial-gradient(circle_at_85%_75%,rgba(13,148,136,0.15),transparent_40%)]" />
        </div>

        <div className="container relative mx-auto max-w-[1600px] px-2 md:px-15">
          <div className="grid items-start gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <div>
              {/* Brand badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm mb-6">
                <span className="h-2 w-2 rounded-full bg-[#0D9488] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-white/80">Product Catalog</span>
              </div>

              <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-white md:text-6xl">
                Curated{" "}
                  Product
                <br />
                  Universe
              </h1>

              <p className="mt-6 max-w-2xl text-base font-medium leading-relaxed text-white/70 sm:text-lg">
                Sourcing and manufacturing excellence across medical, industrial, food, and sports sectors. Global quality, local trust.
              </p>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-semibold text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0D9488]/40 bg-[#0D9488]/15 px-4 py-2 backdrop-blur-sm hover:bg-[#0D9488]/25 transition-colors">
                  <Globe className="h-4 w-4 text-teal-300" />
                  Global Export
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0D9488]/40 bg-[#0D9488]/15 px-4 py-2 backdrop-blur-sm hover:bg-[#0D9488]/25 transition-colors">
                  <Phone className="h-4 w-4 text-teal-300" />
                  24/7 Support
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#0D9488]/40 bg-[#0D9488]/15 px-4 py-2 backdrop-blur-sm hover:bg-[#0D9488]/25 transition-colors">
                  <Mail className="h-4 w-4 text-teal-300" />
                  Quick Quote
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] mt-8 border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl sm:p-6 ring-1 ring-[#0D9488]/20">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">Catalog Radar</p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[#0D9488]/25 bg-[#0F1C3F]/40 p-4">
                  <p className="font-display text-4xl font-black text-white">{companies.length}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-teal-300/70">Partners</p>
                </div>
                <div className="rounded-2xl border border-[#0D9488]/25 bg-[#0F1C3F]/40 p-4">
                  <p className="font-display text-4xl font-black text-white">{visibleProducts}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-teal-300/70">Showing</p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-[#0D9488]/25 bg-[#0F1C3F]/30 p-4">
                <p className="text-xs font-semibold text-white/60">
                  {hasFilterApplied
                    ? "Filtered view active. Refine search or switch sector tabs."
                    : "Browse all partner portfolios or search by product keywords."}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-[1.75rem] border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-xl sm:p-2 ring-1 ring-[#0D9488]/20">
            <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
                  <Search className="h-[18px] w-[18px] text-teal-300/70" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search by company, product, category, or variant..."
                  className="h-10 w-full rounded-3xl border border-white/20 bg-[#0F1C3F]/40 pl-14 pr-2 text-sm font-medium text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/60"
                />
              </div>

              <div className="flex items-center p-2 rounded-2xl border border-[#0D9488]/30 bg-[#0D9488]/15 px-4">
                <p className="text-sm font-bold tracking-wide text-white">
                  {visibleProducts} / {totalProducts} products
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/85 backdrop-blur-xl">
        <div className="container mx-auto max-w-[1600px] flex flex-wrap items-center gap-3 overflow-x-auto px-4 py-4 md:px-8">
          <button
            onClick={() => setActiveFilter(null)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-all ${
              activeFilter === null
                ? "bg-slate-900 text-white shadow-lg"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Layers3 className="h-3.5 w-3.5" />
            All Sectors
            <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px]">{totalProducts}</span>
          </button>

          {sectors.map((sector) => (
            <button
              key={sector}
              onClick={() => setActiveFilter(activeFilter === sector ? null : sector)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wide transition-all ${
                activeFilter === sector
                  ? "bg-slate-900 text-white shadow-lg"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {sector}
              <span className="rounded-md bg-white/20 px-1.5 py-0.5 text-[10px]">{sectorProductCounts[sector]}</span>
            </button>
          ))}
        </div>
      </div>

      <main className="w-full max-w-[1200px] mx-auto px-5 py-16 sm:py-20">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            {!hasFilterApplied ? "Full catalog view" : "Smart filtered view"}
          </p>
          <p className="text-sm font-semibold text-slate-600">
            {filteredCompanies.length} partners | {visibleProducts} products visible
          </p>
        </div>

        <div className="space-y-12 sm:space-y-16">
          {filteredCompanies.map((company, index) => (
            <div key={company.id} className="scroll-mt-32">
              <CompanySection company={company} index={index} />
            </div>
          ))}
        </div>

        {filteredCompanies.length === 0 && (
          <div className="mt-4 flex flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white p-12 text-center shadow-sm">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100">
              <Package className="h-9 w-9 text-slate-400" />
            </div>
            <h3 className="font-display text-2xl font-black text-slate-900">No matching products</h3>
            <p className="mt-2 max-w-md text-sm font-medium text-slate-500 sm:text-base">
              No products matched your current search or sector filter. Reset and explore the full partner catalog.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveFilter(null);
              }}
              className="mt-8 rounded-xl bg-slate-900 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-slate-800"
            >
              Reset all filters
            </button>
          </div>
        )}
      </main>

    

      <CartDrawer />
    </div>
  );
};

export default Products;
