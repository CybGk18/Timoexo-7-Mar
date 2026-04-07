import { Card } from "../components/ui/card";
import ResponsiveImage from "./ResponsiveImage";

interface SectorCardProps {
  image: string;
  title: string;
  description: string;
  badgeText?: string;
  badgeVariant?: "default" | "success" | "accent" | "info";
}

export const SectorCard = ({
  image,
  title,
  description,
}: SectorCardProps) => {
  return (
    <Card
      className="group flex flex-col w-full sm:w-[300px] md:w-[340px] lg:w-[240px] 
                 overflow-hidden rounded-2xl border border-gray-200 bg-white 
                 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >
      {/* Image Section */}
      <div className="relative h-48 sm:h-56 md:h-60 lg:h-52 overflow-hidden">
        <ResponsiveImage
          src={image}
          alt={title}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Text Section */}
      <div className="p-4 sm:p-6 flex flex-col flex-grow">
        <h3 className="mb-2 text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </Card>
  );
};
