import { useState, useEffect } from "react"
import { MapPin, Star, IndianRupee } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BookingModal from "@/components/BookingModal"
import sayajiImg from "@/assets/sayaji.jpg"
import radissonImg from "@/assets/radisson.jpg"
import apnaPalaceImg from "@/assets/Hotel-Apna-Palace.jpg"
import marriottImg from "@/assets/marriott.jpg"
import homestayImg from "@/assets/Home-stay.jpg"

interface Hotel {
  _id: string;
  name: string;
  type: string;
  location: string;
  price: number;
  rating: number;
  description: string;
  amenities?: string[];
  image?: string;
}

export default function Hotels() {
  const [search, setSearch] = useState("")
  const [filter, setFilter] = useState("All")
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/hotels')
        const data = await response.json()
        
        // Add default images to hotels if they don't have images
        let hotelsWithImages = data.hotels.map((hotel: Hotel) => ({
          ...hotel,
          image: hotel.image || (
            hotel.name.toLowerCase().includes('radisson') ? radissonImg :
            hotel.name.toLowerCase().includes('marriott') ? marriottImg :
            hotel.name.toLowerCase().includes('apna') ? apnaPalaceImg :
            sayajiImg
          )
        }));
        
        // Add additional Marriott and Radisson hotels if they don't exist
        const existingNames = hotelsWithImages.map((h: Hotel) => h.name.toLowerCase());
        
        if (!existingNames.includes('marriott hotel indore')) {
          hotelsWithImages.push({
            _id: 'marriott-indore',
            name: 'Marriott Hotel Indore',
            type: 'Luxury',
            location: 'Vijay Nagar, Indore',
            price: 8500,
            rating: 4.8,
            description: 'Experience world-class hospitality at Marriott Hotel Indore with premium amenities and exceptional service.',
            amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'],
            image: marriottImg
          });
        }
        
        if (!existingNames.includes('radisson blu indore')) {
          hotelsWithImages.push({
            _id: 'radisson-indore',
            name: 'Radisson Blu Indore',
            type: 'Luxury',
            location: 'Rajendra Nagar, Indore',
            price: 7500,
            rating: 4.7,
            description: 'Modern luxury hotel with contemporary design and world-class facilities in the heart of Indore.',
            amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Conference Rooms', 'Restaurant'],
            image: radissonImg
          });
        }
        
        if (response.ok) {
          setHotels(hotelsWithImages)
        } else {
          console.error('Failed to fetch hotels')
        }
      } catch (error) {
        console.error('Error fetching hotels:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  useEffect(() => {
    const fetchFilteredHotels = async () => {
      try {
        const params = new URLSearchParams()
        if (search) params.append('search', search)
        if (filter !== 'All') params.append('type', filter)
        
        const response = await fetch(`http://localhost:5000/api/hotels?${params}`)
        const data = await response.json()
        
        // Add default images to hotels if they don't have images
        let hotelsWithImages = data.hotels.map((hotel: Hotel) => ({
          ...hotel,
          image: hotel.image || (
            hotel.name.toLowerCase().includes('radisson') ? radissonImg :
            hotel.name.toLowerCase().includes('marriott') ? marriottImg :
            hotel.name.toLowerCase().includes('apna') ? apnaPalaceImg :
            sayajiImg
          )
        }));
        
        // Add additional Marriott and Radisson hotels if they don't exist
        const existingNames = hotelsWithImages.map((h: Hotel) => h.name.toLowerCase());
        
        if (!existingNames.includes('marriott hotel indore')) {
          hotelsWithImages.push({
            _id: 'marriott-indore',
            name: 'Marriott Hotel Indore',
            type: 'Luxury',
            location: 'Vijay Nagar, Indore',
            price: 8500,
            rating: 4.8,
            description: 'Experience world-class hospitality at Marriott Hotel Indore with premium amenities and exceptional service.',
            amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Restaurant', 'Bar'],
            image: marriottImg
          });
        }
        
        if (!existingNames.includes('radisson blu indore')) {
          hotelsWithImages.push({
            _id: 'radisson-indore',
            name: 'Radisson Blu Indore',
            type: 'Luxury',
            location: 'Rajendra Nagar, Indore',
            price: 7500,
            rating: 4.7,
            description: 'Modern luxury hotel with contemporary design and world-class facilities in the heart of Indore.',
            amenities: ['WiFi', 'Pool', 'Spa', 'Gym', 'Conference Rooms', 'Restaurant'],
            image: radissonImg
          });
        }
        
        if (response.ok) {
          setHotels(hotelsWithImages)
        }
      } catch (error) {
        console.error('Error fetching filtered hotels:', error)
      }
    }

    fetchFilteredHotels()
  }, [search, filter])

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Hotels in Indore</h1>
        <p className="text-muted-foreground">Find the best places to stay</p>
      </div>

      <Input
        placeholder="Search hotels..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <div className="flex gap-2">
        {["All", "Luxury", "Budget", "Homestay"].map(item => (
          <Button
            key={item}
            variant={filter === item ? "default" : "outline"}
            onClick={() => setFilter(item)}
          >
            {item}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p>Loading hotels...</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {hotels.map(hotel => (
            <div key={hotel._id} className="border rounded-xl p-4 space-y-2 bg-background overflow-hidden">
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img 
                  src={hotel.image || sayajiImg} 
                  alt={hotel.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{hotel.name}</h3>
                  <Badge variant="secondary" className="mt-1">
                    {hotel.type}
                  </Badge>
                </div>
                {renderStars(hotel.rating)}
              </div>

              <p className="text-sm text-muted-foreground">{hotel.description}</p>

              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{hotel.location}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <div className="flex items-center gap-1 font-semibold text-green-600">
                  <IndianRupee className="w-4 h-4" />
                  {hotel.price}
                  <span className="text-sm text-muted-foreground font-normal">/night</span>
                </div>
                <BookingModal attraction={{
                  id: parseInt(hotel._id),
                  name: hotel.name,
                  distance: hotel.location,
                  category: hotel.type,
                  rating: hotel.rating,
                  timing: "24/7",
                  description: hotel.description
                }}>
                  <Button size="sm">Book Now</Button>
                </BookingModal>
              </div>
            </div>
          ))}
        </div>
      )}

      {hotels.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hotels found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}
