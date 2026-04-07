import type { CSSProperties, MouseEventHandler } from "react";

type ResponsiveImageProps = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "auto" | "sync";
  sizes?: string;
  style?: CSSProperties;
  ariaHidden?: boolean;
  onClick?: MouseEventHandler<HTMLImageElement>;
  enableModernFormats?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

const getSourceSet = (src: string, ext: string) => {
  const lower = src.toLowerCase();
  if (!lower.endsWith(ext)) return src;
  return src.slice(0, -ext.length);
};

const ResponsiveImage = ({
  src,
  alt,
  className,
  loading = "lazy",
  decoding = "async",
  sizes,
  style,
  ariaHidden,
  onClick,
  enableModernFormats,
  fetchPriority,
}: ResponsiveImageProps) => {
  const useModernFormats =
    enableModernFormats ?? import.meta.env.VITE_OPTIMIZED_IMAGES === "true";
  const lower = src.toLowerCase();
  const base =
    lower.endsWith(".avif")
      ? src.slice(0, -5)
      : lower.endsWith(".webp")
      ? src.slice(0, -5)
      : lower.endsWith(".jpeg")
      ? src.slice(0, -5)
      : lower.endsWith(".jpg")
      ? src.slice(0, -4)
      : lower.endsWith(".png")
      ? src.slice(0, -4)
      : getSourceSet(src, "");

  const avif = `${base}.avif`;
  const webp = `${base}.webp`;

  if (!useModernFormats) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        style={style}
        aria-hidden={ariaHidden ? "true" : undefined}
        onClick={onClick}
        fetchPriority={fetchPriority}
      />
    );
  }

  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        sizes={sizes}
        style={style}
        aria-hidden={ariaHidden ? "true" : undefined}
        onClick={onClick}
        fetchPriority={fetchPriority}
      />
    </picture>
  );
};

export default ResponsiveImage;
