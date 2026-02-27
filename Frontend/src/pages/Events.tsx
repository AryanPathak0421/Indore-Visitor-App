import { useState } from "react";
import { Calendar as CalendarIcon, MapPin, Clock, Users, Search, Filter } from "lucide-react";
import { FilterPills } from "@/components/FilterPills";
import { useNavigate } from "react-router-dom";

const events = [
  {
    id: 1,
    name: "Rangoli Utsav",
    date: "Jan 15, 2025",
    time: "9:00 AM",
    location: "Rajwada Palace",
    category: "Cultural",
    attendees: 1500,
    description: "Annual rangoli competition showcasing artistic talent",
  },
  {
    id: 2,
    name: "Food Festival",
    date: "Feb 5-7, 2025",
    time: "5:00 PM",
    location: "Chhappan Dukan",
    category: "Food",
    attendees: 5000,
    description: "Celebrate Indore's street food culture",
  },
  {
    id: 3,
    name: "Classical Music Night",
    date: "Jan 26, 2025",
    time: "7:00 PM",
    location: "Devi Ahilya Utsav Ground",
    category: "Music",
    attendees: 800,
    description: "Evening of classical ragas and performances",
  },
  {
    id: 4,
    name: "Heritage Walk",
    date: "Every Sunday",
    time: "6:30 AM",
    location: "Starting from Rajwada",
    category: "Tourism",
    attendees: 50,
    description: "Guided walking tour through historic Indore",
  },
  {
    id: 5,
    name: "Craft Fair",
    date: "Mar 1-3, 2025",
    time: "10:00 AM",
    location: "Lal Bagh Palace",
    category: "Art",
    attendees: 2000,
    description: "Traditional handicrafts and artisan showcase",
  },
];

const categories = ["All", "Cultural", "Food", "Music", "Tourism", "Art"];

export default function Events() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === "All" || event.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Events in Indore</h1>
        <p className="text-muted-foreground">Discover festivals, exhibitions and local gatherings</p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events..."
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

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((event, index) => (
          <div
            key={event.id}
            className="bg-card rounded-2xl border border-border shadow-soft p-6
                     hover:shadow-card transition-all duration-300 cursor-pointer
                     animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              {/* Date Badge */}
              <div className="flex-shrink-0 w-20 h-20 bg-primary/10 rounded-2xl flex flex-col items-center justify-center">
                <CalendarIcon className="w-6 h-6 text-primary mb-1" />
                <span className="text-xs text-primary font-medium text-center px-2">{event.date.split(",")[0]}</span>
              </div>

              {/* Event Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-secondary/20 text-secondary mb-2">
                      {event.category}
                    </span>
                    <h3 className="text-xl font-semibold text-foreground">{event.name}</h3>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{event.description}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{event.attendees}+ attending</span>
                  </div>
                </div>
              </div>

              {/* Action */}
              <button 
                onClick={() => navigate(`/events/register/${event.id}`)}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
