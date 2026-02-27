import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Clock, Calendar, Users, ArrowLeft, Camera, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import BookingModal from '@/components/BookingModal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Attraction {
  id: number;
  name: string;
  image: string;
  distance: string;
  category: string;
  rating: number;
  timing: string;
  description: string;
  fullDescription?: string;
  highlights?: string[];
  bestTimeToVisit?: string;
  entryFee?: number;
  duration?: string;
}

const attractionsData: Record<number, Attraction> = {
  1: {
    id: 1,
    name: "Rajwada Palace",
    image: "/src/assets/rajwada.jpg",
    distance: "2.5 km",
    category: "Heritage",
    rating: 4.7,
    timing: "10 AM - 6 PM",
    description: "Historic seven-story structure showcasing Holkar dynasty architecture",
    fullDescription: "Rajwada Palace is a historic palace in Indore, built by the Holkars of the Maratha Confederacy. The seven-story structure is situated in the heart of the city and showcases a blend of Maratha, Mughal, and French architectural styles. The palace has been converted into a museum that houses various artifacts and exhibits from the Holkar era.",
    highlights: ["Holkar Dynasty Artifacts", "Architectural Marvel", "Light & Sound Show", "Museum Collection"],
    bestTimeToVisit: "October to March",
    entryFee: 50,
    duration: "2-3 hours"
  },
  2: {
    id: 2,
    name: "Sarafa Bazaar",
    image: "/src/assets/sarafa.jpg",
    distance: "1.8 km",
    category: "Food",
    rating: 4.9,
    timing: "8 PM - 2 AM",
    description: "Famous night street food market with authentic Indori flavors",
    fullDescription: "Sarafa Bazaar comes alive after sunset, transforming into one of India's most famous street food destinations. This bustling night market offers over 100 varieties of local delicacies, from the famous Indori poha and jalebi to unique chaats and sweets. The market is a cultural experience where food vendors have been perfecting their recipes for generations.",
    highlights: ["100+ Food Varieties", "Night Food Market", "Local Delicacies", "Cultural Experience"],
    bestTimeToVisit: "Evening (8 PM - 12 AM)",
    entryFee: 0,
    duration: "2-3 hours"
  },
  3: {
    id: 3,
    name: "Lal Bagh Palace",
    image: "/src/assets/lalbagh.jpg",
    distance: "4.2 km",
    category: "Heritage",
    rating: 4.6,
    timing: "10 AM - 5 PM",
    description: "Elegant Holkar-era palace with European architecture",
    fullDescription: "Lal Bagh Palace is one of the most elegant structures built by the Holkars. This magnificent palace showcases a perfect blend of Italian, Renaissance, and Corinthian architectural styles. The palace is surrounded by beautiful gardens and houses a collection of ancient artifacts, paintings, and sculptures that depict the grandeur of the Holkar era.",
    highlights: ["European Architecture", "Beautiful Gardens", "Art Collection", "Historical Artifacts"],
    bestTimeToVisit: "Winter months",
    entryFee: 100,
    duration: "2-3 hours"
  },
  4: {
    id: 4,
    name: "Khajrana Temple",
    image: "/src/assets/khajrana.jpg",
    distance: "6.1 km",
    category: "Temple",
    rating: 4.8,
    timing: "5 AM - 10 PM",
    description: "Sacred Ganesh temple known for wish fulfillment",
    fullDescription: "Khajrana Ganesh Temple is one of the most revered religious sites in Indore. Dedicated to Lord Ganesha, this temple is believed to fulfill the wishes of devotees who pray with a pure heart. The temple architecture follows traditional Indian temple design with intricate carvings and a peaceful atmosphere that attracts thousands of devotees daily.",
    highlights: ["Lord Ganesha Temple", "Wish Fulfillment", "Peaceful Atmosphere", "Daily Aarti"],
    bestTimeToVisit: "Early Morning or Evening",
    entryFee: 0,
    duration: "1-2 hours"
  },
  5: {
    id: 5,
    name: "Central Museum",
    image: "/src/assets/museum.jpg",
    distance: "3.0 km",
    category: "Heritage",
    rating: 4.4,
    timing: "10 AM - 5 PM",
    description: "Rich collection of sculptures and historical artifacts",
    fullDescription: "The Central Museum in Indore is a treasure trove of historical artifacts and cultural heritage. The museum houses an impressive collection of sculptures, coins, inscriptions, and paintings that date back to various periods of Indian history. It's a must-visit for history enthusiasts and those interested in understanding the rich cultural tapestry of Central India.",
    highlights: ["Historical Artifacts", "Sculpture Collection", "Ancient Coins", "Cultural Heritage"],
    bestTimeToVisit: "Morning hours",
    entryFee: 30,
    duration: "2-3 hours"
  },
  6: {
    id: 6,
    name: "Patalpani Waterfall",
    image: "/src/assets/patalpani.jpg",
    distance: "35 km",
    category: "Nature",
    rating: 4.5,
    timing: "8 AM - 6 PM",
    description: "Scenic waterfall surrounded by lush greenery",
    fullDescription: "Patalpani Waterfall is a breathtaking natural wonder located on the outskirts of Indore. This seasonal waterfall transforms into a magnificent sight during monsoon, with water cascading down from a height of about 300 feet. The surrounding area is covered with dense vegetation, making it a perfect spot for nature lovers and photographers.",
    highlights: ["300 ft Waterfall", "Monsoon Beauty", "Photography Spot", "Nature Trek"],
    bestTimeToVisit: "Monsoon Season (July-September)",
    entryFee: 20,
    duration: "4-5 hours"
  }
};

const AttractionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [attraction, setAttraction] = useState<Attraction | null>(null);

  React.useEffect(() => {
    const attractionId = parseInt(id || '1');
    const foundAttraction = attractionsData[attractionId];
    setAttraction(foundAttraction || null);
  }, [id]);

  if (!attraction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Attraction Not Found</h2>
          <Button onClick={() => navigate('/discover')}>
            Back to Discover
          </Button>
        </div>
      </div>
    );
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={attraction.image}
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Button
                variant="outline"
                onClick={() => navigate('/discover')}
                className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                {attraction.category}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              {attraction.name}
            </h1>
            <div className="flex items-center gap-4 text-white">
              {renderStars(attraction.rating)}
              <div className="flex items-center gap-1">
                <MapPin className="w-5 h-5" />
                <span>{attraction.distance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {attraction.fullDescription || attraction.description}
                </p>
              </CardContent>
            </Card>

            {/* Highlights */}
            <Card>
              <CardHeader>
                <CardTitle>Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {attraction.highlights?.map((highlight, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Timing</p>
                    <p className="font-medium">{attraction.timing}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Best Time</p>
                    <p className="font-medium">{attraction.bestTimeToVisit}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{attraction.duration}</p>
                  </div>
                </div>

                {attraction.entryFee !== undefined && (
                  <div className="pt-4 border-t">
                    <p className="text-sm text-gray-500 mb-1">Entry Fee</p>
                    <p className="text-2xl font-bold text-green-600">
                      {attraction.entryFee === 0 ? 'Free' : `₹${attraction.entryFee}`}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Booking Button */}
            <BookingModal attraction={attraction}>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-lg py-3">
                Book Your Visit
              </Button>
            </BookingModal>

            {/* Actions */}
            <div className="space-y-3">
              <Button variant="outline" className="w-full">
                <Navigation className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                View Photos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetail;
