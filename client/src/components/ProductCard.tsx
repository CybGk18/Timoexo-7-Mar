import { ArrowUpRight, MessageSquare, Sparkles } from "lucide-react";
import type { Product } from "@/data/products";
import { Link } from "react-router-dom";
import ResponsiveImage from "./ResponsiveImage";

interface ProductCardProps {
  product: Product;
  companyName: string;
  companyColor: string;
  delay?: number;
  onImageClick?: (imageSrc: string, imageAlt: string) => void;
}

const withAlpha = (color: string, alpha: number) => {
  if (color.startsWith("hsl(") && color.endsWith(")")) {
    return color.replace(")", ` / ${alpha})`);
  }
  return color;
};

const ProductCard = ({ product, companyName, companyColor, delay = 0, onImageClick }: ProductCardProps) => {
  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;
  const accentSoft = withAlpha(companyColor, 0.12);
  const accentBorder = withAlpha(companyColor, 0.35);

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.65rem] border border-slate-200 bg-white shadow-[0_18px_40px_-30px_rgba(15,23,42,0.6)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_24px_50px_-26px_rgba(15,23,42,0.45)]"
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 14% 12%, ${accentSoft} 0%, transparent 56%)`,
        }}
      />

      <div className="relative aspect-[16/11] overflow-hidden bg-slate-200">
        <button
          type="button"
          onClick={() => onImageClick?.(product.image, product.name)}
          className={`h-full w-full text-left ${onImageClick ? "cursor-zoom-in" : "cursor-default"}`}
          aria-label={`Preview ${product.name} image from ${companyName}`}
        >
          <ResponsiveImage
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            decoding="async"
          />
        </button>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-900/15 to-transparent" />

        {hasVariants && (
          <div className="pointer-events-none absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/25 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            {product.variants!.length} variants
          </div>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex items-center">
          <span
            className="rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.14em]"
            style={{
              backgroundColor: accentSoft,
              border: `1px solid ${accentBorder}`,
              color: companyColor,
            }}
          >
            {product.category}
          </span>
        </div>
        <h3 className="font-display text-lg font-black leading-tight text-slate-900">
          {product.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
          {product.description}
        </p>

        {hasVariants && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {product.variants!.slice(0, 3).map((variant) => (
              <span
                key={variant}
                className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-600"
              >
                {variant}
              </span>
            ))}
            {product.variants!.length > 3 && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                +{product.variants!.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-6">
          <Link
            to={`/contact?product=${encodeURIComponent(product.name)}`}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-slate-800 active:scale-[0.98]"
          >
            <MessageSquare className="h-4 w-4" />
            Request Quote
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-100"
            aria-label={`Contact about ${product.name}`}
          >
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
