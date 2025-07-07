
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users, Calendar, Shield, Award } from "lucide-react";

const Index = () => {
  const featuredHotels = [
    {
      id: "1",
      name: "Grand Ocean Resort",
      location: "Miami Beach, Florida",
      rating: 4.8,
      reviews: 342,
      price: 299,
      originalPrice: 399,
      image: "photo-1564501049412-61c2a3083791",
      amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Free Parking"],
      featured: true,
    },
    {
      id: "2",
      name: "Mountain View Lodge",
      location: "Aspen, Colorado", 
      rating: 4.6,
      reviews: 128,
      price: 189,
      image: "photo-1551882547-ff40c63fe5fa",
      amenities: ["Free WiFi", "Restaurant", "Free Parking"],
    },
    {
      id: "3",
      name: "City Central Hotel",
      location: "New York, NY",
      rating: 4.7,
      reviews: 567,
      price: 249,
      originalPrice: 329,
      image: "photo-1566073771259-6a8506099945",
      amenities: ["Free WiFi", "Restaurant", "Swimming Pool"],
      featured: true,
    },
  ];

  const stats = [
    { icon: Users, value: "2M+", label: "Happy Guests" },
    { icon: MapPin, value: "50K+", label: "Hotels Worldwide" },
    { icon: Calendar, value: "10M+", label: "Bookings Made" },
    { icon: Award, value: "4.9", label: "Average Rating" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Best Price Guarantee",
      description: "Find a lower price and we'll match it, plus give you an extra 10% off."
    },
    {
      icon: Calendar,
      title: "Free Cancellation",
      description: "Plans change. That's why we offer free cancellation on most bookings."
    },
    {
      icon: Star,
      title: "Verified Reviews",
      description: "Read real reviews from real guests to make informed decisions."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="relative container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 gradient-accent text-white">
              🏨 World's Leading Hotel Booking Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Find Your Perfect
              <span className="block gradient-primary bg-clip-text text-transparent">
                Hotel Experience
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover amazing hotels worldwide with the best prices, verified reviews, 
              and instant booking confirmation.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <SearchBar size="large" className="animate-fade-in" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg gradient-primary text-white mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Hotels
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium hotels offering exceptional 
              experiences and unmatched luxury.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredHotels.map((hotel) => (
              <div key={hotel.id} className="animate-fade-in">
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              size="lg" 
              className="gradient-primary text-white hover:opacity-90 px-8"
              onClick={() => window.location.href = '/hotels'}
            >
              View All Hotels
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose HotelLux?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best hotel booking experience possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-2xl hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full gradient-primary text-white mb-6">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join millions of travelers who trust HotelLux for their perfect getaway.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-primary hover:bg-gray-100 px-8"
              onClick={() => window.location.href = '/register'}
            >
              Sign Up Free
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary px-8"
              onClick={() => window.location.href = '/hotels'}
            >
              Browse Hotels
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg gradient-primary flex items-center justify-center">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <span className="text-xl font-bold">HotelLux</span>
              </div>
              <p className="text-gray-400">
                Your trusted partner for finding the perfect hotel experience worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">Safety</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 HotelLux. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
