import { MapPin, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface AttractionCardProps {
  name: string;
  image: string;
  distance: string;
  category: string;
  rating?: number;
  onClick?: () => void;
}

const categoryColors: Record<string, string> = {
  Heritage: "bg-secondary text-secondary-foreground",
  Food: "bg-primary text-primary-foreground",
  Market: "bg-muted text-foreground",
  Temple: "bg-secondary text-secondary-foreground",
  Trending: "bg-destructive/80 text-destructive-foreground",
};

export function AttractionCard({
  name,
  image,
  distance,
  category,
  rating,
  onClick,
}: AttractionCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft 
                 hover:shadow-card transition-all duration-300 cursor-pointer
                 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium",
              categoryColors[category] || "bg-muted text-foreground"
            )}
          >
            {category}
          </span>
        </div>
        {rating && (
          <div className="absolute top-3 right-3 flex items-center gap-1 bg-card/90 backdrop-blur-sm px-2 py-1 rounded-full">
            <Star className="w-3 h-3 fill-secondary text-secondary" />
            <span className="text-xs font-medium text-foreground">{rating}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground truncate">{name}</h3>
        <div className="flex items-center gap-1 mt-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span className="text-sm">{distance}</span>
        </div>
      </div>
    </div>
  );
}
