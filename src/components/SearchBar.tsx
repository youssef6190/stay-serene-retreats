
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  className?: string;
  size?: "default" | "large";
}

const SearchBar = ({ className, size = "default" }: SearchBarProps) => {
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const navigate = useNavigate();

  const handleSearch = () => {
    const searchParams = new URLSearchParams({
      destination: destination || "all",
      checkIn: checkIn ? format(checkIn, "yyyy-MM-dd") : "",
      checkOut: checkOut ? format(checkOut, "yyyy-MM-dd") : "",
      guests: guests,
    });
    navigate(`/hotels?${searchParams.toString()}`);
  };

  const isLarge = size === "large";

  return (
    <div className={cn(
      "bg-white rounded-2xl shadow-luxury border border-gray-100 p-6",
      isLarge && "p-8",
      className
    )}>
      <div className={cn(
        "grid gap-4",
        isLarge ? "grid-cols-1 md:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      )}>
        <div className="space-y-2">
          <Label htmlFor="destination" className="text-sm font-medium text-gray-700">
            Where are you going?
          </Label>
          <Input
            id="destination"
            placeholder="Enter destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className={cn("border-gray-200 focus:border-primary", isLarge && "h-12")}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Check-in</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-200",
                  !checkIn && "text-muted-foreground",
                  isLarge && "h-12"
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

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Check-out</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal border-gray-200",
                  !checkOut && "text-muted-foreground",
                  isLarge && "h-12"
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

        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Guests</Label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className={cn("border-gray-200", isLarge && "h-12")}>
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
      </div>

      <Button
        onClick={handleSearch}
        className={cn(
          "w-full mt-6 gradient-primary text-white hover:opacity-90 transition-all duration-200",
          isLarge ? "h-14 text-lg font-semibold" : "h-12"
        )}
      >
        Search Hotels
      </Button>
    </div>
  );
};

export default SearchBar;
