import { cn } from "@/lib/utils";

interface FilterPillsProps {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterPills({ filters, activeFilter, onFilterChange }: FilterPillsProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
            activeFilter === filter
              ? "bg-primary text-primary-foreground shadow-soft"
              : "bg-card text-muted-foreground hover:bg-accent border border-border"
          )}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
