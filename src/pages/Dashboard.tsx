
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Calendar, 
  MapPin, 
  Star, 
  CreditCard, 
  Settings, 
  User, 
  Heart,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Download
} from "lucide-react";
import { format } from "date-fns";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");
  const [userProfile, setUserProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "photo-1472099645785-5658abf4ff4e"
  });

  const bookings = [
    {
      id: "1",
      hotelName: "Grand Ocean Resort",
      location: "Miami Beach, Florida",
      checkIn: "2024-07-15",
      checkOut: "2024-07-18",
      guests: 2,
      totalPrice: 897,
      status: "confirmed",
      image: "photo-1564501049412-61c2a3083791",
      bookingDate: "2024-01-15"
    },
    {
      id: "2",
      hotelName: "Mountain View Lodge",
      location: "Aspen, Colorado",
      checkIn: "2024-08-10",
      checkOut: "2024-08-12",
      guests: 4,
      totalPrice: 378,
      status: "pending",
      image: "photo-1551882547-ff40c63fe5fa",
      bookingDate: "2024-01-20"
    },
    {
      id: "3",
      hotelName: "City Central Hotel",
      location: "New York, NY",
      checkIn: "2024-06-05",
      checkOut: "2024-06-08",
      guests: 2,
      totalPrice: 747,
      status: "completed",
      image: "photo-1566073771259-6a8506099945",
      bookingDate: "2023-12-28"
    }
  ];

  const favoriteHotels = [
    {
      id: "1",
      name: "Grand Ocean Resort",
      location: "Miami Beach, Florida",
      rating: 4.8,
      price: 299,
      image: "photo-1564501049412-61c2a3083791"
    },
    {
      id: "2",
      name: "Sunset Beach Villa",
      location: "Malibu, California",
      rating: 4.9,
      price: 459,
      image: "photo-1571896349842-33c89424de2d"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="w-3 h-3 mr-1" />Confirmed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="w-3 h-3 mr-1" />Pending</Badge>;
      case "completed":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100"><CheckCircle className="w-3 h-3 mr-1" />Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100"><XCircle className="w-3 h-3 mr-1" />Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage 
                src={`https://images.unsplash.com/${userProfile.avatar}?auto=format&fit=crop&w=100&q=80`} 
                alt={`${userProfile.firstName} ${userProfile.lastName}`} 
              />
              <AvatarFallback>{userProfile.firstName[0]}{userProfile.lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {userProfile.firstName}!
              </h1>
              <p className="text-gray-600">Manage your bookings and preferences</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-primary" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Favorite Hotels</p>
                  <p className="text-2xl font-bold text-gray-900">{favoriteHotels.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Star className="h-8 w-8 text-yellow-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Reviews Written</p>
                  <p className="text-2xl font-bold text-gray-900">8</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CreditCard className="h-8 w-8 text-green-500" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">$2,022</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 mb-8">
            <TabsTrigger value="bookings" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>My Bookings</span>
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center space-x-2">
              <Heart className="h-4 w-4" />
              <span>Favorites</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
              <Button className="gradient-primary text-white">
                <Calendar className="h-4 w-4 mr-2" />
                New Booking
              </Button>
            </div>
            
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 md:h-auto">
                        <img
                          src={`https://images.unsplash.com/${booking.image}?auto=format&fit=crop&w=400&q=80`}
                          alt={booking.hotelName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {booking.hotelName}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-2">
                              <MapPin className="w-4 h-4 mr-1" />
                              <span>{booking.location}</span>
                            </div>
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-gray-600">Check-in</p>
                            <p className="font-semibold">{format(new Date(booking.checkIn), "MMM dd, yyyy")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Check-out</p>
                            <p className="font-semibold">{format(new Date(booking.checkOut), "MMM dd, yyyy")}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Guests</p>
                            <p className="font-semibold">{booking.guests} guests</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-2xl font-bold text-primary">${booking.totalPrice}</p>
                            <p className="text-sm text-gray-600">Total amount</p>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Download className="h-4 w-4 mr-2" />
                              Invoice
                            </Button>
                            {booking.status === "confirmed" && (
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-2" />
                                Modify
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Favorite Hotels</h2>
              <p className="text-gray-600">{favoriteHotels.length} saved hotels</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteHotels.map((hotel) => (
                <Card key={hotel.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/${hotel.image}?auto=format&fit=crop&w=400&q=80`}
                      alt={hotel.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">{hotel.name}</h3>
                    <div className="flex items-center text-gray-600 mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-sm">{hotel.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="font-medium">{hotel.rating}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">${hotel.price}</p>
                        <p className="text-sm text-gray-600">per night</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="flex items-center space-x-6 mb-6">
                    <Avatar className="h-24 w-24">
                      <AvatarImage 
                        src={`https://images.unsplash.com/${userProfile.avatar}?auto=format&fit=crop&w=200&q=80`} 
                        alt={`${userProfile.firstName} ${userProfile.lastName}`} 
                      />
                      <AvatarFallback className="text-xl">
                        {userProfile.firstName[0]}{userProfile.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline">Change Photo</Button>
                      <p className="text-sm text-gray-600 mt-2">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={userProfile.firstName}
                        onChange={(e) => setUserProfile({...userProfile, firstName: e.target.value})}
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={userProfile.lastName}
                        onChange={(e) => setUserProfile({...userProfile, lastName: e.target.value})}
                        className="h-12"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={userProfile.phone}
                      onChange={(e) => setUserProfile({...userProfile, phone: e.target.value})}
                      className="h-12"
                    />
                  </div>
                  
                  <Button type="submit" className="gradient-primary text-white">
                    Save Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>
                    Manage your notification preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email notifications</p>
                      <p className="text-sm text-gray-600">Receive booking confirmations via email</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS notifications</p>
                      <p className="text-sm text-gray-600">Receive booking updates via SMS</p>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Marketing emails</p>
                      <p className="text-sm text-gray-600">Receive special offers and promotions</p>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Privacy & Security</CardTitle>
                  <CardDescription>
                    Manage your account security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline">
                    Change Password
                  </Button>
                  <Button className="w-full" variant="outline">
                    Two-Factor Authentication
                  </Button>
                  <Button className="w-full" variant="outline">
                    Download My Data
                  </Button>
                  <Button className="w-full" variant="destructive">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
