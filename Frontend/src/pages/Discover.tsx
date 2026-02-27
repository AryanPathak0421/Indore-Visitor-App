import { useState } from "react";
import { Search, MapPin, Star, Filter, Clock, Navigation } from "lucide-react";
import rajwadaImg from "@/assets/rajwada.jpg";
import sarafaImg from "@/assets/sarafa.jpg";
import lalbaghImg from "@/assets/lalbagh.jpg";
import khajranaImg from "@/assets/khajrana.jpg";
import museumImg from "@/assets/museum.jpg";
import patalpaniImg from "@/assets/patalpani.jpg";
import { FilterPills } from "@/components/FilterPills";
import BookingModal from "@/components/BookingModal";
import { Button } from "@/components/ui/button";

const allPlaces = [
  { id: 1, name: "Rajwada Palace", image: rajwadaImg, distance: "2.5 km", category: "Heritage", rating: 4.7, timing: "10 AM - 6 PM", description: "Historic seven-story structure showcasing Holkar dynasty architecture" },
  { id: 2, name: "Sarafa Bazaar", image: sarafaImg, distance: "1.8 km", category: "Food", rating: 4.9, timing: "8 PM - 2 AM", description: "Famous night street food market with authentic Indori flavors" },
  { id: 3, name: "Lal Bagh Palace", image: lalbaghImg, distance: "4.2 km", category: "Heritage", rating: 4.6, timing: "10 AM - 5 PM", description: "Elegant Holkar-era palace with European architecture" },
  { id: 4, name: "Khajrana Temple", image: khajranaImg, distance: "6.1 km", category: "Temple", rating: 4.8, timing: "5 AM - 10 PM", description: "Sacred Ganesh temple known for wish fulfillment" },
  { id: 5, name: "Central Museum", image: museumImg, distance: "3.0 km", category: "Heritage", rating: 4.4, timing: "10 AM - 5 PM", description: "Rich collection of sculptures and historical artifacts" },
  { id: 6, name: "Patalpani Waterfall", image: patalpaniImg, distance: "35 km", category: "Nature", rating: 4.5, timing: "8 AM - 6 PM", description: "Scenic waterfall surrounded by lush greenery" },
];

const categories = ["All", "Heritage", "Food", "Temple", "Nature", "Markets"];

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredPlaces = allPlaces.filter((place) => {
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || place.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Discover Indore</h1>
        <p className="text-muted-foreground">Explore the best places, experiences and hidden gems</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search places, activities..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border
                     text-foreground placeholder:text-muted-foreground
                     focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                     transition-all duration-200 shadow-soft"
          />
        </div>

        <FilterPills
          filters={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Results */}
      <div className="space-y-4">
        {filteredPlaces.map((place, index) => (
          <div
            key={place.id}
            className="bg-card rounded-2xl border border-border shadow-soft overflow-hidden
                     hover:shadow-card transition-all duration-300 cursor-pointer group
                     animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 h-48 md:h-auto overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 p-6">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                      {place.category}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{place.name}</h3>
                  </div>
                  <div className="flex items-center gap-1 bg-card rounded-full px-2 py-1 border border-border">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="text-sm font-medium">{place.rating}</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{place.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{place.distance}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{place.timing}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <BookingModal attraction={place}>
                    <Button className="flex-1 bg-green-600 hover:bg-green-700">
                      Book Now
                    </Button>
                  </BookingModal>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors">
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredPlaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No places found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
