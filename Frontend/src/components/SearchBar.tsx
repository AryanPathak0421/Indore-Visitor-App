import { Search, MapPin, UtensilsCrossed, Calendar } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  { id: "places", label: "Places", icon: MapPin },
  { id: "food", label: "Food", icon: UtensilsCrossed },
  { id: "events", label: "Events", icon: Calendar },
];

interface SearchBarProps {
  onSearch?: (query: string, category: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("places");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query, activeCategory);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search places, food, events..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     transition-all duration-200 shadow-soft"
          />
        </div>
      </form>

      {/* Category Pills */}
      <div className="flex gap-2 mt-4 justify-center">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card text-muted-foreground hover:bg-accent border border-border"
              )}
            >
              <Icon className="w-4 h-4" />
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
