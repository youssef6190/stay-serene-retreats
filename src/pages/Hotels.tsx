import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import FilterSidebar from "@/components/FilterSidebar";
import HotelCard from "@/components/HotelCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Grid, List } from "lucide-react";

const Hotels = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    stars: [],
    amenities: [],
  });
  const [showFilters, setShowFilters] = useState(false);

  const destination = searchParams.get("destination") || "All Destinations";
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  // Mock hotel data
  const allHotels = [
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
    {
      id: "4",
      name: "Sunset Beach Villa",
      location: "Malibu, California",
      rating: 4.9,
      reviews: 89,
      price: 459,
      image: "photo-1571896349842-33c89424de2d",
      amenities: ["Free WiFi", "Swimming Pool", "Restaurant"],
    },
    {
      id: "5",
      name: "Downtown Business Hotel",
      location: "Chicago, Illinois",
      rating: 4.4,
      reviews: 234,
      price: 179,
      image: "photo-1555854877-bab0e564b8d5",
      amenities: ["Free WiFi", "Restaurant", "Free Parking"],
    },
    {
      id: "6",
      name: "Lakeside Resort",
      location: "Lake Tahoe, Nevada",
      rating: 4.5,
      reviews: 156,
      price: 329,
      image: "photo-1582719478250-c89cae4dc85b",
      amenities: ["Free WiFi", "Swimming Pool", "Free Parking"],
    },
  ];

  const [filteredHotels, setFilteredHotels] = useState(allHotels);

  // Filter and sort hotels based on current filters and sort option
  useEffect(() => {
    let filtered = [...allHotels];

    // Apply price filter
    filtered = filtered.filter(hotel => 
      hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1]
    );

    // Apply star rating filter
    if (filters.stars.length > 0) {
      filtered = filtered.filter(hotel => 
        filters.stars.includes(Math.floor(hotel.rating))
      );
    }

    // Apply amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.amenities.some(amenity => hotel.amenities.includes(amenity))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredHotels(filtered);
  }, [filters, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Search Section */}
      <section className="bg-white border-b py-6">
        <div className="container mx-auto px-4">
          <SearchBar className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Results Header */}
      <section className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Hotels in {destination}
              </h1>
              <p className="text-gray-600">
                {filteredHotels.length} properties found
                {checkIn && checkOut && (
                  <span className="ml-2">
                    • {checkIn} to {checkOut}
                    {guests && ` • ${guests} guests`}
                  </span>
                )}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="hidden md:flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden"
              >
                <Filter className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-4">
              <FilterSidebar onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Hotels Grid/List */}
          <div className="flex-1">
            {filteredHotels.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏨</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No hotels found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {filteredHotels.map((hotel) => (
                  <div key={hotel.id} className="animate-fade-in">
                    <HotelCard hotel={hotel} />
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button */}
            {filteredHotels.length >= 6 && (
              <div className="text-center mt-12">
                <Button size="lg" variant="outline">
                  Load More Hotels
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
