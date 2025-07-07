import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Dumbbell, 
  Utensils,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Users,
  Phone,
  Mail,
  Globe,
  Share,
  Heart
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const HotelDetail = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Mock hotel data - in real app, this would come from an API
  const hotel = {
    id: id,
    name: "Grand Ocean Resort",
    location: "Miami Beach, Florida",
    address: "1234 Ocean Drive, Miami Beach, FL 33139",
    rating: 4.8,
    reviews: 342,
    price: 299,
    originalPrice: 399,
    images: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
    ],
    amenities: [
      { name: "Free WiFi", icon: Wifi },
      { name: "Swimming Pool", icon: Waves },
      { name: "Restaurant", icon: Utensils },
      { name: "Free Parking", icon: Car },
      { name: "Fitness Center", icon: Dumbbell },
      { name: "Room Service", icon: Coffee },
    ],
    description: "Experience luxury at its finest at Grand Ocean Resort. Our oceanfront property offers stunning views, world-class amenities, and exceptional service. Whether you're here for business or pleasure, our elegant rooms and suites provide the perfect retreat. Enjoy our pristine private beach, multiple dining options, and state-of-the-art spa facilities.",
    features: [
      "Oceanfront location with private beach access",
      "24/7 concierge service",
      "Multiple dining options including rooftop restaurant",
      "Full-service spa and wellness center",
      "Business center and meeting facilities",
      "Pet-friendly accommodations available"
    ],
    contact: {
      phone: "+1 (305) 555-0123",
      email: "info@grandoceanresort.com",
      website: "www.grandoceanresort.com"
    }
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      comment: "Absolutely stunning hotel! The ocean views were breathtaking and the staff was incredibly helpful. Will definitely return!",
      avatar: "photo-1494790108755-2616b612b1bc"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 4,
      date: "2024-01-10",
      comment: "Great location and beautiful facilities. The pool area was fantastic. Only minor issue was the WiFi speed in some areas.",
      avatar: "photo-1472099645785-5658abf4ff4e"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      rating: 5,
      date: "2024-01-05",
      comment: "Perfect for our anniversary! The room was luxurious and the sunset from our balcony was unforgettable. Highly recommend!",
      avatar: "photo-1438761681033-6461ffad8d80"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotel.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotel.images.length) % hotel.images.length);
  };

  const handleBookNow = () => {
    setIsBookingModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/hotels" className="hover:text-primary">Hotels</Link>
            <span>/</span>
            <span className="text-gray-900">{hotel.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hotel Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{hotel.address}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
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
                      <span className="ml-2 font-medium">{hotel.rating}</span>
                    </div>
                    <span className="text-gray-600">({hotel.reviews} reviews)</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-video rounded-lg overflow-hidden">
                <img
                  src={hotel.images[currentImageIndex]}
                  alt={`${hotel.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                
                {/* Navigation Buttons */}
                <Button
                  onClick={prevImage}
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  onClick={nextImage}
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {hotel.images.length}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {hotel.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About this hotel</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6">{hotel.description}</p>
                <div>
                  <h4 className="font-semibold mb-3">Hotel Features:</h4>
                  <ul className="space-y-2">
                    {hotel.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <amenity.icon className="w-5 h-5 text-primary" />
                      <span className="text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Guest Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start space-x-4">
                        <img
                          src={`https://images.unsplash.com/${review.avatar}?auto=format&fit=crop&w=100&q=80`}
                          alt={review.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-gray-900">{review.name}</h4>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-6">
                  <Button variant="outline">View All Reviews</Button>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium">{hotel.contact.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium">{hotel.contact.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm text-gray-600">Website</p>
                      <p className="font-medium">{hotel.contact.website}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-2">
                        {hotel.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ${hotel.originalPrice}
                          </span>
                        )}
                        <span className="text-3xl font-bold text-primary">
                          ${hotel.price}
                        </span>
                        <span className="text-gray-600">/night</span>
                      </div>
                      {hotel.originalPrice && (
                        <Badge className="gradient-accent text-white mt-1">
                          Save ${hotel.originalPrice - hotel.price}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Check-in Date */}
                  <div className="space-y-2">
                    <Label>Check-in Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkIn && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkIn ? format(checkIn, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkIn}
                          onSelect={setCheckIn}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Check-out Date */}
                  <div className="space-y-2">
                    <Label>Check-out Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !checkOut && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {checkOut ? format(checkOut, "MMM dd, yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={checkOut}
                          onSelect={setCheckOut}
                          disabled={(date) => date < new Date() || (checkIn && date <= checkIn)}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <Label>Guests</Label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  {checkIn && checkOut && (
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Base price (2 nights)</span>
                        <span>${hotel.price * 2}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Taxes & fees</span>
                        <span>$89</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${hotel.price * 2 + 89}</span>
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full gradient-primary text-white hover:opacity-90 h-12 text-lg font-semibold"
                    onClick={handleBookNow}
                  >
                    Book Now
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-gray-600">Free cancellation • No prepayment needed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetail;
