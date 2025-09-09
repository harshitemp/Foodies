"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useCart } from "@/lib/cart-context"

// Mock restaurant and menu data
const restaurantData = {
  "1": {
    name: "Spice Garden",
    cuisine: "Indian",
    rating: 4.5,
    reviews: 324,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    address: "123 Main St, Downtown",
    image: "/indian-restaurant-interior.png",
    description:
      "Authentic Indian cuisine with traditional spices and flavors. Family recipes passed down through generations.",
    menu: {
      Appetizers: [
        {
          id: "1",
          name: "Samosa",
          price: 5.99,
          description: "Crispy pastry filled with spiced potatoes",
          isVeg: true,
          image: "/crispy-golden-samosas.png",
        },
        {
          id: "2",
          name: "Chicken Tikka",
          price: 8.99,
          description: "Marinated chicken grilled to perfection",
          isVeg: false,
          image: "/chicken-tikka.png",
        },
      ],
      "Main Course": [
        {
          id: "3",
          name: "Butter Chicken",
          price: 14.99,
          description: "Creamy tomato-based curry with tender chicken",
          isVeg: false,
          image: "/butter-chicken.png",
        },
        {
          id: "4",
          name: "Palak Paneer",
          price: 12.99,
          description: "Spinach curry with cottage cheese",
          isVeg: true,
          image: "/palak-paneer.png",
        },
        {
          id: "5",
          name: "Biryani",
          price: 16.99,
          description: "Fragrant basmati rice with spices and meat",
          isVeg: false,
          image: "/flavorful-biryani.png",
        },
      ],
      Desserts: [
        {
          id: "6",
          name: "Gulab Jamun",
          price: 4.99,
          description: "Sweet milk dumplings in sugar syrup",
          isVeg: true,
          image: "/gulab-jamun.png",
        },
      ],
    },
  },
}

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = params.id as string
  const restaurant = restaurantData[restaurantId as keyof typeof restaurantData]
  const { items, addItem, updateQuantity, getTotalItems, getTotalPrice } = useCart()

  const [activeTab, setActiveTab] = useState("Appetizers")

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ChefHat className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Restaurant not found</h2>
          <Link href="/restaurants">
            <Button>Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    )
  }

  const addToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      isVeg: item.isVeg,
      image: item.image,
      restaurantId: restaurantId,
      restaurantName: restaurant.name,
    })
  }

  const removeFromCart = (itemId: string) => {
    const cartItem = items.find((item) => item.id === itemId)
    if (cartItem) {
      updateQuantity(itemId, cartItem.quantity - 1)
    }
  }

  const getItemQuantity = (itemId: string) => {
    const cartItem = items.find((item) => item.id === itemId)
    return cartItem?.quantity || 0
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/restaurants">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
              </Link>
              <Link href="/" className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">FoodieAI</span>
              </Link>
            </div>
            {getTotalItems() > 0 && (
              <Link href="/cart">
                <Button className="relative">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart ({getTotalItems()})
                  <Badge className="absolute -top-2 -right-2 bg-secondary text-secondary-foreground">
                    ${getTotalPrice().toFixed(2)}
                  </Badge>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative">
        <Image
          src={restaurant.image || "/placeholder.svg"}
          alt={restaurant.name}
          width={600}
          height={300}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <p className="text-lg mb-4">{restaurant.description}</p>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {restaurant.rating} ({restaurant.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>${restaurant.deliveryFee} delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            {Object.keys(restaurant.menu).map((category) => (
              <TabsTrigger key={category} value={category}>
                {category}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(restaurant.menu).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-6">
              <div className="space-y-4">
                {items.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="font-semibold flex items-center gap-2">
                                {item.name}
                                {item.isVeg ? (
                                  <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                                    Veg
                                  </Badge>
                                ) : (
                                  <Badge variant="outline">Non-Veg</Badge>
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <span className="font-bold text-lg">${item.price}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                              {item.isVeg ? "🟢 Vegetarian" : "🔴 Non-Vegetarian"}
                            </div>

                            {getItemQuantity(item.id) > 0 ? (
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center">{getItemQuantity(item.id)}</span>
                                <Button size="sm" onClick={() => addToCart(item)}>
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <Button size="sm" onClick={() => addToCart(item)}>
                                <Plus className="h-4 w-4 mr-2" />
                                Add
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Floating Cart Summary */}
      {getTotalItems() > 0 && (
        <div className="fixed bottom-4 left-4 right-4 z-50">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{getTotalItems()} items in cart</p>
                  <p className="text-sm opacity-90">Total: ${getTotalPrice().toFixed(2)}</p>
                </div>
                <Link href="/cart">
                  <Button variant="secondary">View Cart & Checkout</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
