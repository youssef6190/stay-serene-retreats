import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Star, Wifi, Car, Coffee, Waves, Dumbbell, Utensils } from "lucide-react";

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
  className?: string;
}

const FilterSidebar = ({ onFiltersChange, className }: FilterSidebarProps) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedStars, setSelectedStars] = useState<number[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const starRatings = [5, 4, 3, 2, 1];
  const amenities = [
    { id: "wifi", label: "Free WiFi", icon: Wifi },
    { id: "parking", label: "Free Parking", icon: Car },
    { id: "restaurant", label: "Restaurant", icon: Utensils },
    { id: "pool", label: "Swimming Pool", icon: Waves },
    { id: "gym", label: "Fitness Center", icon: Dumbbell },
    { id: "breakfast", label: "Breakfast Included", icon: Coffee },
  ];

  const handleStarChange = (star: number, checked: boolean) => {
    const newStars = checked 
      ? [...selectedStars, star]
      : selectedStars.filter(s => s !== star);
    setSelectedStars(newStars);
    updateFilters({ stars: newStars });
  };

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    const newAmenities = checked
      ? [...selectedAmenities, amenityId]
      : selectedAmenities.filter(a => a !== amenityId);
    setSelectedAmenities(newAmenities);
    updateFilters({ amenities: newAmenities });
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    updateFilters({ priceRange: value });
  };

  const updateFilters = (newFilters: any) => {
    onFiltersChange({
      priceRange,
      stars: selectedStars,
      amenities: selectedAmenities,
      ...newFilters,
    });
  };

  const clearFilters = () => {
    setPriceRange([0, 500]);
    setSelectedStars([]);
    setSelectedAmenities([]);
    onFiltersChange({
      priceRange: [0, 500],
      stars: [],
      amenities: [],
    });
  };

  const activeFiltersCount = selectedStars.length + selectedAmenities.length + 
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  return (
    <div className={`bg-white rounded-lg shadow-sm border p-6 space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        {activeFiltersCount > 0 && (
          <div className="flex items-center space-x-2">
            <Badge variant="secondary">{activeFiltersCount}</Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-primary hover:text-primary/80"
            >
              Clear All
            </Button>
          </div>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-900">Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={handlePriceChange}
            max={500}
            min={0}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Star Rating */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-900">Star Rating</Label>
        <div className="space-y-3">
          {starRatings.map((star) => (
            <div key={star} className="flex items-center space-x-3">
              <Checkbox
                id={`star-${star}`}
                checked={selectedStars.includes(star)}
                onCheckedChange={(checked) => handleStarChange(star, checked as boolean)}
              />
              <Label
                htmlFor={`star-${star}`}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <div className="flex">
                  {[...Array(star)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  {[...Array(5 - star)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gray-300" />
                  ))}
                </div>
                <span className="text-sm text-gray-700">{star} Stars</span>
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Amenities */}
      <div className="space-y-4">
        <Label className="text-sm font-medium text-gray-900">Amenities</Label>
        <div className="space-y-3">
          {amenities.map((amenity) => (
            <div key={amenity.id} className="flex items-center space-x-3">
              <Checkbox
                id={amenity.id}
                checked={selectedAmenities.includes(amenity.id)}
                onCheckedChange={(checked) => handleAmenityChange(amenity.id, checked as boolean)}
              />
              <Label
                htmlFor={amenity.id}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <amenity.icon className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-700">{amenity.label}</span>
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
