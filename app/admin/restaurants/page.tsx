"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, Edit, Trash2, Star, Clock, MapPin } from "lucide-react"

// Mock restaurant data
const mockRestaurants = [
  {
    id: 1,
    name: "Pizza Palace",
    cuisine: "Italian",
    rating: 4.8,
    deliveryTime: "25-35 min",
    address: "123 Main St, Downtown",
    status: "active",
    orders: 45,
    revenue: "$2,340",
  },
  {
    id: 2,
    name: "Burger House",
    cuisine: "American",
    rating: 4.6,
    deliveryTime: "20-30 min",
    address: "456 Oak Ave, Midtown",
    status: "active",
    orders: 38,
    revenue: "$1,890",
  },
  {
    id: 3,
    name: "Sushi World",
    cuisine: "Japanese",
    rating: 4.9,
    deliveryTime: "30-40 min",
    address: "789 Pine St, Uptown",
    status: "active",
    orders: 32,
    revenue: "$2,100",
  },
  {
    id: 4,
    name: "Taco Bell",
    cuisine: "Mexican",
    rating: 4.4,
    deliveryTime: "15-25 min",
    address: "321 Elm St, Southside",
    status: "inactive",
    orders: 28,
    revenue: "$1,250",
  },
]

export default function RestaurantsPage() {
  const [restaurants, setRestaurants] = useState(mockRestaurants)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredRestaurants = restaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteRestaurant = (id: number) => {
    setRestaurants(restaurants.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restaurants</h1>
          <p className="text-gray-600">Manage restaurants on your platform</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <Plus className="mr-2 h-4 w-4" />
          Add Restaurant
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search restaurants by name or cuisine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Restaurants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRestaurants.map((restaurant) => (
          <Card key={restaurant.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{restaurant.name}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Badge variant="secondary" className="mr-2">
                      {restaurant.cuisine}
                    </Badge>
                    <Badge
                      variant={restaurant.status === "active" ? "default" : "secondary"}
                      className={restaurant.status === "active" ? "bg-green-600" : ""}
                    >
                      {restaurant.status}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteRestaurant(restaurant.id)}>
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  {restaurant.rating} rating
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="mr-2 h-4 w-4" />
                  {restaurant.deliveryTime}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="mr-2 h-4 w-4" />
                  {restaurant.address}
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orders this week:</span>
                    <span className="font-medium">{restaurant.orders}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-600">Revenue:</span>
                    <span className="font-medium text-green-600">{restaurant.revenue}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRestaurants.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-gray-500">
              <Search className="mx-auto h-12 w-12 mb-4" />
              <p>No restaurants found matching your search.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
