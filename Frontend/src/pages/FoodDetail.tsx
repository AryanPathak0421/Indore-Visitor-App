import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, MapPin, Clock, Flame, Coffee, IceCream, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import pohaImg from "@/assets/poha.jpg";
import dalBaflaImg from "@/assets/dal-bafla.jpg";
import garaduImg from "@/assets/garadu.jpg";
import bhutteKeesImg from "@/assets/bhutte-kees.jpg";
import shikanjiImg from "@/assets/shikanji.jpg";
import malpuaImg from "@/assets/malpua.jpg";

// Food items data (same as in Food.tsx)
const foodItems = [
  { 
    id: 1, 
    name: "Poha Jalebi", 
    location: "Sarafa Bazaar", 
    rating: 4.9, 
    timing: "7 AM - 11 AM", 
    category: "Breakfast", 
    description: "Indore's iconic breakfast combo", 
    spicy: false, 
    image: pohaImg,
    history: "Poha Jalebi is the quintessential Indore breakfast that has been enjoyed for generations. This fluffy flattened rice dish served with crispy jalebi represents the perfect blend of sweet and savory that Indore is famous for. Originally a simple breakfast, it has evolved into a cultural symbol of the city's culinary heritage.",
    whyFamous: "Poha Jalebi is famous in Indore because it represents the city's unique breakfast culture. The combination of light, flavorful poha with sweet, crispy jalebi creates a perfect balance that's uniquely Indori. Sarafa Bazaar becomes a paradise for poha lovers every morning.",
    nutritionalInfo: {
      calories: "320 kcal",
      protein: "8g",
      carbs: "45g",
      fat: "12g"
    },
    bestTime: "Early morning (7-9 AM)",
    price: "₹40-60"
  },
  { 
    id: 2, 
    name: "Dal Bafla", 
    location: "Chhappan Dukan", 
    rating: 4.7, 
    timing: "11 AM - 10 PM", 
    category: "Main Course", 
    description: "Traditional MP specialty with ghee", 
    spicy: false, 
    image: dalBaflaImg,
    history: "Dal Bafla is a traditional dish from Madhya Pradesh that has found a special home in Indore's culinary scene. The combination of dal (lentils) and bafla (wheat rolls) cooked in pure ghee represents the authentic flavors of the region. This dish is especially popular during festivals and family gatherings.",
    whyFamous: "Dal Bafla is famous in Indore because it showcases the authentic culinary traditions of Madhya Pradesh. The use of pure ghee and traditional cooking methods makes it a favorite among locals who appreciate authentic flavors. Chhappan Dukan serves some of the best dal bafla in the city.",
    nutritionalInfo: {
      calories: "380 kcal",
      protein: "12g",
      carbs: "42g",
      fat: "18g"
    },
    bestTime: "Lunch and Dinner",
    price: "₹80-120"
  },
  { 
    id: 3, 
    name: "Garadu", 
    location: "Sarafa Bazaar", 
    rating: 4.8, 
    timing: "8 PM - 2 AM", 
    category: "Street Food", 
    description: "Spiced yam fries, winter specialty", 
    spicy: true, 
    image: garaduImg,
    history: "Garadu is a winter specialty that Indore eagerly awaits every year. Made from yam (garadu) that's spiced and deep-fried, this dish becomes available during the winter months when the vegetable is in season. The crispy exterior and soft interior make it irresistible.",
    whyFamous: "Garadu is famous in Indore because it's a seasonal delicacy that marks the arrival of winter in the city. People line up at Sarafa Bazaar to get their share of this crispy, spicy treat. It's more than just food; it's a winter tradition that brings the community together.",
    nutritionalInfo: {
      calories: "220 kcal",
      protein: "3g",
      carbs: "28g",
      fat: "12g"
    },
    bestTime: "Winter evenings (8 PM - 12 AM)",
    price: "₹50-80"
  },
  { 
    id: 4, 
    name: "Bhutte Ka Kees", 
    location: "Chhappan Dukan", 
    rating: 4.6, 
    timing: "6 PM - 11 PM", 
    category: "Street Food", 
    description: "Grated corn cooked in milk & spices", 
    spicy: true, 
    image: bhutteKeesImg,
    history: "Bhutte Ka Kees is a unique Indore specialty that showcases the city's innovative approach to traditional ingredients. Fresh corn grated and cooked with milk, spices, and sometimes cream, creates a dish that's both comforting and flavorful. It's a testament to Indore's culinary creativity.",
    whyFamous: "Bhutte Ka Kees is famous in Indore because it represents the city's ability to transform simple ingredients into extraordinary dishes. This street food innovation has gained popularity across India and put Indore on the culinary map for its unique corn preparations.",
    nutritionalInfo: {
      calories: "180 kcal",
      protein: "5g",
      carbs: "22g",
      fat: "8g"
    },
    bestTime: "Monsoon and Winter evenings",
    price: "₹40-60"
  },
  { 
    id: 5, 
    name: "Shikanji", 
    location: "Sarafa Bazaar", 
    rating: 4.8, 
    timing: "8 PM - 2 AM", 
    category: "Beverages", 
    description: "Famous Indori lemonade with masala", 
    spicy: false, 
    image: shikanjiImg,
    history: "Shikanji is Indore's answer to summer thirst. This refreshing lemonade, infused with special masala and sometimes served with kulhad (malpuas), is the perfect coolant during hot Indore summers. The unique blend of sweet, sour, and spicy flavors makes it unforgettable.",
    whyFamous: "Shikanji is famous in Indore because it's the city's signature summer drink that has been perfected over generations. The special masala blend and serving style make it uniquely Indori. During summer, no evening in Indore is complete without glasses of shikanji.",
    nutritionalInfo: {
      calories: "120 kcal",
      protein: "0g",
      carbs: "28g",
      fat: "0g"
    },
    bestTime: "Summer evenings (6 PM - 12 AM)",
    price: "₹20-40"
  },
  { 
    id: 6, 
    name: "Malpua Rabdi", 
    location: "Khau Gali", 
    rating: 4.9, 
    timing: "9 PM - 1 AM", 
    category: "Desserts", 
    description: "Sweet pancakes with condensed milk", 
    spicy: false, 
    image: malpuaImg,
    history: "Malpua Rabdi is the crown jewel of Indore's sweet offerings. These fluffy pancakes soaked in sugar syrup and served with thick rabdi represent the pinnacle of traditional Indian desserts. The combination of soft malpuas with rich rabdi creates a divine dessert experience.",
    whyFamous: "Malpua Rabdi is famous in Indore because it represents the city's rich dessert tradition and expertise in sweet making. Khau Gali becomes a sweet paradise during festivals and special occasions, with malpua rabdi being the star attraction that draws food lovers from all over.",
    nutritionalInfo: {
      calories: "280 kcal",
      protein: "4g",
      carbs: "38g",
      fat: "10g"
    },
    bestTime: "After dinner (9 PM - 1 AM)",
    price: "₹60-100"
  }
];

export default function FoodDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  console.log('FoodDetail ID:', id); // Debug log
  const food = foodItems.find(item => item.id === parseInt(id));
  
  console.log('Found food:', food); // Debug log

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Food Item Not Found</h1>
          <Button onClick={() => navigate('/food')} className="mb-4">
            Back to Food
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/food')}
              className="mb-3 sm:mb-0"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Food
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{food.name}</h1>
              <p className="text-gray-600 text-sm sm:text-base">{food.category}</p>
            </div>
            <Button variant="outline" size="sm" className="hidden sm:block">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Main Image */}
          <div className="xl:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 sm:h-80 md:h-96">
                  <img 
                    src={food.image} 
                    alt={food.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4">
                    <Badge className="bg-white/90 text-black text-xs sm:text-sm">
                      {food.category}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div className="space-y-4 sm:space-y-6">
            {/* Quick Info */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-sm sm:text-base lg:text-lg">{food.rating}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="text-xs sm:text-sm">{food.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="text-xs sm:text-sm">{food.timing}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className={`h-4 w-4 sm:h-5 sm:w-5 ${food.spicy ? "text-red-500" : "text-gray-400"}`} />
                    <span className="text-xs sm:text-sm">{food.spicy ? "Spicy" : "Mild"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coffee className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    <span className="text-xs sm:text-sm">{food.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3">About {food.name}</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{food.description}</p>
              </CardContent>
            </Card>

            {/* History */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3">History & Heritage</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{food.history}</p>
              </CardContent>
            </Card>

            {/* Why Famous */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Why It's Famous in Indore</h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{food.whyFamous}</p>
              </CardContent>
            </Card>

            {/* Nutritional Info */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Nutritional Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Calories</p>
                    <p className="font-semibold text-sm sm:text-base">{food.nutritionalInfo.calories}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Protein</p>
                    <p className="font-semibold text-sm sm:text-base">{food.nutritionalInfo.protein}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Carbs</p>
                    <p className="font-semibold text-sm sm:text-base">{food.nutritionalInfo.carbs}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Fat</p>
                    <p className="font-semibold text-sm sm:text-base">{food.nutritionalInfo.fat}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Best Time to Visit */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold mb-3">Best Time to Enjoy</h3>
                <p className="text-gray-700 text-sm sm:text-base">{food.bestTime}</p>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button className="flex-1 bg-primary hover:bg-primary/90 text-sm sm:text-base">
                <Heart className="h-4 w-4 mr-2" />
                Add to Favorites
              </Button>
              <Button variant="outline" className="flex-1 text-sm sm:text-base">
                <MapPin className="h-4 w-4 mr-2" />
                Get Directions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
