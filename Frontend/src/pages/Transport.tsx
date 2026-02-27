import { useState } from "react"
import { Car, Bus, Bike, Clock, IndianRupee, MapPin, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import BookingModal from "@/components/BookingModal"

interface TransportOption {
  id: string;
  name: string;
  type: string;
  description: string;
  price: string;
  availability: string;
  icon: React.ComponentType<any>;
  features?: string[];
  duration?: string;
}

const transportData: TransportOption[] = [
  {
    id: "t1",
    name: "City Bus",
    type: "Bus",
    description: "Indore public transport buses with AC and non-AC options covering all major routes in the city. Daily passes and monthly cards available.",
    price: "₹10 - ₹30",
    availability: "5 AM - 11 PM",
    icon: Bus,
    features: ["AC Buses", "WiFi", "Daily Passes", "All City Routes"],
    duration: "30-60 min"
  },
  {
    id: "t2",
    name: "Auto Rickshaw",
    type: "Auto",
    description: "Traditional three-wheeler auto rickshaws for quick short distance travel. Best for navigating through narrow streets and last-mile connectivity.",
    price: "₹30+",
    availability: "24x7",
    icon: Car,
    features: ["Metered Fare", "Short Distance", "Available Everywhere", "Negotiable"],
    duration: "5-20 min"
  },
  {
    id: "t3",
    name: "Uber / Ola",
    type: "Cab",
    description: "App-based cab services with AC vehicles, GPS tracking, and multiple payment options. Premium and economy rides available.",
    price: "₹12/km",
    availability: "24x7",
    icon: Car,
    features: ["GPS Tracking", "AC Cabs", "App Booking", "Multiple Payment"],
    duration: "10-30 min"
  },
  {
    id: "t4",
    name: "Bike Rentals",
    type: "Bike",
    description: "Motorbike and scooter rentals for exploring the city at your own pace. Daily, weekly, and monthly rental packages available.",
    price: "₹300/day",
    availability: "8 AM - 10 PM",
    icon: Bike,
    features: ["Helmet Included", "Self Drive", "City Exploration", "Flexible Plans"],
    duration: "Full Day"
  },
  {
    id: "t5",
    name: "Car Rentals",
    type: "Car",
    description: "Self-drive and chauffeur-driven car rentals with comprehensive insurance coverage. All vehicle categories from economy to luxury available.",
    price: "₹1500/day",
    availability: "8 AM - 10 PM",
    icon: Car,
    features: ["Insurance Included", "GPS Navigation", "24/7 Support", "Multiple Models"],
    duration: "Full Day"
  }
];

export default function Transport() {
  const [filter, setFilter] = useState("All")

  const filtered = transportData.filter(t =>
    filter === "All" || t.type === filter
  )

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transport in Indore</h1>
        <p className="text-muted-foreground">Choose how you want to move around the city</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {["All", "Bus", "Auto", "Cab", "Bike", "Car"].map(item => (
          <Button
            key={item}
            variant={filter === item ? "default" : "outline"}
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(t => (
          <Card key={t.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <t.icon size={24} className="text-primary" />
                  <div>
                    <CardTitle className="text-lg">{t.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">{t.price}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-700 leading-relaxed">{t.description}</p>
              
              {t.features && (
                <div>
                  <h4 className="font-semibold mb-2">Features:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {t.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Available: {t.availability}</span>
                </div>
                {t.duration && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>Duration: {t.duration}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <BookingModal attraction={{
                  id: parseInt(t.id),
                  name: t.name,
                  distance: "City-wide",
                  category: t.type,
                  rating: 4.5,
                  timing: t.availability,
                  description: t.description
                }}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                    Book Now
                  </Button>
                </BookingModal>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
