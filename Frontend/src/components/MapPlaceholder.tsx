import { MapPin, Navigation } from "lucide-react";

interface MapPlaceholderProps {
  nearMeEnabled?: boolean;
}

export function MapPlaceholder({ nearMeEnabled }: MapPlaceholderProps) {
  return (
    <div className="relative w-full h-64 rounded-2xl bg-card border border-border overflow-hidden shadow-soft">
      {/* Decorative map background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 400 200" fill="none">
          <path d="M0 100 Q100 50 200 100 T400 100" stroke="currentColor" strokeWidth="1" className="text-muted" />
          <path d="M0 120 Q100 70 200 120 T400 120" stroke="currentColor" strokeWidth="1" className="text-muted" />
          <path d="M0 140 Q100 90 200 140 T400 140" stroke="currentColor" strokeWidth="1" className="text-muted" />
          <circle cx="100" cy="80" r="3" fill="currentColor" className="text-primary" />
          <circle cx="200" cy="100" r="3" fill="currentColor" className="text-secondary" />
          <circle cx="300" cy="90" r="3" fill="currentColor" className="text-destructive" />
          <circle cx="150" cy="130" r="3" fill="currentColor" className="text-primary" />
          <circle cx="250" cy="120" r="3" fill="currentColor" className="text-secondary" />
        </svg>
      </div>

      {/* Map content */}
      <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">Indore City Map</h3>
        <p className="text-sm text-muted-foreground mb-4">
          {nearMeEnabled
            ? "Showing nearby attractions and services"
            : "Explore attractions, food spots & emergency services"}
        </p>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
          <Navigation className="w-4 h-4" />
          Open Full Map
        </button>
      </div>

      {/* Location pins overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
        <div className="w-2 h-2 rounded-full bg-primary"></div>
        <span className="text-xs text-muted-foreground">Attractions</span>
        <div className="w-2 h-2 rounded-full bg-secondary ml-2"></div>
        <span className="text-xs text-muted-foreground">Food</span>
        <div className="w-2 h-2 rounded-full bg-destructive ml-2"></div>
        <span className="text-xs text-muted-foreground">Emergency</span>
      </div>
    </div>
  );
}
