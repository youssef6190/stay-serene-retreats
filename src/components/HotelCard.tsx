
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Star, MapPin, Wifi, Car, Coffee, Swimming } from "lucide-react";

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice?: number;
  image: string;
  amenities: string[];
  featured?: boolean;
}

interface HotelCardProps {
  hotel: Hotel;
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  const amenityIcons: { [key: string]: any } = {
    'Free WiFi': Wifi,
    'Free Parking': Car,
    'Restaurant': Coffee,
    'Swimming Pool': Swimming,
  };

  return (
    <Card className="overflow-hidden hover:shadow-luxury transition-all duration-300 transform hover:-translate-y-1 group">
      <div className="relative">
        <img
          src={`https://images.unsplash.com/${hotel.image}?auto=format&fit=crop&w=600&q=80`}
          alt={hotel.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {hotel.featured && (
          <Badge className="absolute top-3 left-3 gradient-accent text-white">
            Featured
          </Badge>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{hotel.rating}</span>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-primary transition-colors">
            {hotel.name}
          </h3>
        </div>
        
        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{hotel.location}</span>
        </div>

        <div className="flex items-center mb-3">
          <div className="flex items-center mr-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(hotel.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            ({hotel.reviews} reviews)
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {hotel.amenities.slice(0, 3).map((amenity) => {
            const IconComponent = amenityIcons[amenity];
            return (
              <div key={amenity} className="flex items-center text-xs text-gray-600 bg-gray-100 rounded-full px-2 py-1">
                {IconComponent && <IconComponent className="w-3 h-3 mr-1" />}
                {amenity}
              </div>
            );
          })}
          {hotel.amenities.length > 3 && (
            <span className="text-xs text-gray-500">+{hotel.amenities.length - 3} more</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-baseline space-x-2">
          {hotel.originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${hotel.originalPrice}
            </span>
          )}
          <span className="text-2xl font-bold text-primary">
            ${hotel.price}
          </span>
          <span className="text-sm text-gray-600">/night</span>
        </div>
        
        <Link to={`/hotel/${hotel.id}`}>
          <Button className="gradient-primary text-white hover:opacity-90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default HotelCard;
