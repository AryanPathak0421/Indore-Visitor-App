import { MapPin, Navigation, Layers, ZoomIn, ZoomOut, Locate } from "lucide-react";
import { useState } from "react";
import { NearMeToggle } from "@/components/NearMeToggle";

const mapLayers = [
  { id: "attractions", label: "Attractions", color: "bg-primary" },
  { id: "food", label: "Food Spots", color: "bg-secondary" },
  { id: "emergency", label: "Emergency", color: "bg-destructive" },
  { id: "transport", label: "Transport", color: "bg-muted-foreground" },
];

export default function Maps() {
  const [nearMeEnabled, setNearMeEnabled] = useState(false);
  const [activeLayers, setActiveLayers] = useState(["attractions", "food", "emergency"]);

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId) ? prev.filter((id) => id !== layerId) : [...prev, layerId]
    );
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Indore City Map</h1>
        <p className="text-muted-foreground">Navigate attractions, food spots & emergency services</p>
      </div>

      {/* Map Container */}
      <div className="relative rounded-2xl overflow-hidden border border-border shadow-soft bg-card h-[60vh] mb-6">
        {/* Decorative Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 800 600" fill="none">
            {/* Grid lines */}
            {[...Array(20)].map((_, i) => (
              <path
                key={`h-${i}`}
                d={`M0 ${i * 30} H800`}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-muted"
              />
            ))}
            {[...Array(27)].map((_, i) => (
              <path
                key={`v-${i}`}
                d={`M${i * 30} 0 V600`}
                stroke="currentColor"
                strokeWidth="0.5"
                className="text-muted"
              />
            ))}
            {/* Roads */}
            <path d="M0 300 Q200 280 400 300 T800 300" stroke="currentColor" strokeWidth="3" className="text-muted" />
            <path d="M400 0 Q420 150 400 300 T380 600" stroke="currentColor" strokeWidth="3" className="text-muted" />
            <path d="M100 100 L300 200 L500 150 L700 250" stroke="currentColor" strokeWidth="2" className="text-muted" />
            
            {/* Location markers */}
            {activeLayers.includes("attractions") && (
              <>
                <circle cx="200" cy="200" r="8" className="fill-primary" />
                <circle cx="400" cy="280" r="8" className="fill-primary" />
                <circle cx="600" cy="180" r="8" className="fill-primary" />
              </>
            )}
            {activeLayers.includes("food") && (
              <>
                <circle cx="300" cy="320" r="8" className="fill-secondary" />
                <circle cx="500" cy="350" r="8" className="fill-secondary" />
                <circle cx="180" cy="400" r="8" className="fill-secondary" />
              </>
            )}
            {activeLayers.includes("emergency") && (
              <>
                <circle cx="450" cy="150" r="8" className="fill-destructive" />
                <circle cx="250" cy="450" r="8" className="fill-destructive" />
              </>
            )}
          </svg>
        </div>

        {/* Map Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8 bg-card/80 backdrop-blur-sm rounded-2xl border border-border">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Interactive Map</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              {nearMeEnabled
                ? "Showing places near your location"
                : "Explore Indore's points of interest"}
            </p>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors mx-auto">
              <Navigation className="w-4 h-4" />
              Open Full Screen
            </button>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button className="w-10 h-10 bg-card rounded-xl border border-border shadow-soft flex items-center justify-center hover:bg-accent transition-colors">
            <ZoomIn className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 bg-card rounded-xl border border-border shadow-soft flex items-center justify-center hover:bg-accent transition-colors">
            <ZoomOut className="w-5 h-5 text-foreground" />
          </button>
          <button className="w-10 h-10 bg-card rounded-xl border border-border shadow-soft flex items-center justify-center hover:bg-accent transition-colors">
            <Locate className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-xl border border-border p-3">
          <div className="flex items-center gap-4">
            {mapLayers.slice(0, 3).map((layer) => (
              <div key={layer.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${layer.color}`} />
                <span className="text-xs text-muted-foreground">{layer.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <NearMeToggle enabled={nearMeEnabled} onToggle={setNearMeEnabled} />
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-soft p-4">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-primary" />
            <h3 className="font-medium text-foreground">Map Layers</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {mapLayers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeLayers.includes(layer.id)
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-muted-foreground hover:bg-muted"
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${layer.color}`} />
                {layer.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
