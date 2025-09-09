"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Search, MapPin, Clock, Star, Filter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock restaurant data
const restaurants = [
  {
    id: "1",
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    address: "123 Main St, Downtown",
    image: "/indian-restaurant-interior.png",
    isVeg: false,
    tags: ["Popular", "Fast Delivery"],
  },
  {
    id: "2",
    name: "Green Bowl",
    cuisine: "Healthy",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: 1.99,
    address: "456 Oak Ave, Midtown",
    image: "/healthy-salad-restaurant.jpg",
    isVeg: true,
    tags: ["Vegetarian", "Healthy"],
  },
  {
    id: "3",
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.3,
    deliveryTime: "30-40 min",
    deliveryFee: 3.49,
    address: "789 Pine Rd, Uptown",
    image: "/pizza-restaurant-kitchen.jpg",
    isVeg: false,
    tags: ["Family Friendly", "Late Night"],
  },
  {
    id: "4",
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.8,
    deliveryTime: "35-45 min",
    deliveryFee: 4.99,
    address: "321 Elm St, Downtown",
    image: "/sushi-restaurant-modern.jpg",
    isVeg: false,
    tags: ["Premium", "Fresh"],
  },
  {
    id: "5",
    name: "Taco Fiesta",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "20-30 min",
    deliveryFee: 2.49,
    address: "654 Maple Dr, Southside",
    image: "/mexican-taco-restaurant.png",
    isVeg: false,
    tags: ["Spicy", "Quick Bites"],
  },
  {
    id: "6",
    name: "Veggie Delight",
    cuisine: "Vegetarian",
    rating: 4.6,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    address: "987 Cedar Ln, Westside",
    image: "/vegetarian-restaurant-fresh.jpg",
    isVeg: true,
    tags: ["100% Vegetarian", "Organic"],
  },
]

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const cuisines = ["all", ...new Set(restaurants.map((r) => r.cuisine.toLowerCase()))]

  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine.toLowerCase() === selectedCuisine
      return matchesSearch && matchesCuisine
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "deliveryTime":
          return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
        case "deliveryFee":
          return a.deliveryFee - b.deliveryFee
        default:
          return 0
      }
    })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">FoodieAI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Restaurants Near You</h1>
          <p className="text-muted-foreground">Discover amazing food from local restaurants</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search restaurants or cuisines..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Cuisine Filter */}
            <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Cuisines" />
              </SelectTrigger>
              <SelectContent>
                {cuisines.map((cuisine) => (
                  <SelectItem key={cuisine} value={cuisine}>
                    {cuisine === "all" ? "All Cuisines" : cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
                <SelectItem value="deliveryFee">Lowest Delivery Fee</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Restaurant Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRestaurants.map((restaurant) => (
            <Link key={restaurant.id} href={`/restaurants/${restaurant.id}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {restaurant.isVeg && (
                    <Badge className="absolute top-2 right-2 bg-secondary text-secondary-foreground">Vegetarian</Badge>
                  )}
                </div>

                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  <CardDescription>{restaurant.cuisine}</CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>${restaurant.deliveryFee} delivery</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {restaurant.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground">{restaurant.address}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
