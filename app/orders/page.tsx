"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChefHat, ArrowLeft, Clock, Phone } from "lucide-react"
import Link from "next/link"

// Mock order data
const mockOrders = [
  {
    id: "FD12345678",
    status: "delivered",
    restaurant: "Pizza Palace",
    items: ["Margherita Pizza", "Garlic Bread"],
    total: 24.99,
    orderTime: "2024-01-15 14:30",
    deliveryTime: "2024-01-15 15:05",
  },
  {
    id: "FD12345677",
    status: "in-transit",
    restaurant: "Burger House",
    items: ["Classic Burger", "French Fries"],
    total: 18.5,
    orderTime: "2024-01-15 13:45",
    estimatedDelivery: "2024-01-15 14:20",
  },
]

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
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
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Your Orders</h1>

          <div className="space-y-6">
            {mockOrders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                      <CardDescription>{order.restaurant}</CardDescription>
                    </div>
                    <Badge
                      variant={
                        order.status === "delivered"
                          ? "default"
                          : order.status === "in-transit"
                            ? "secondary"
                            : "outline"
                      }
                      className={
                        order.status === "delivered"
                          ? "bg-green-600"
                          : order.status === "in-transit"
                            ? "bg-blue-600"
                            : ""
                      }
                    >
                      {order.status.replace("-", " ").toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium mb-2">Items:</p>
                      <ul className="text-sm text-muted-foreground">
                        {order.items.map((item, index) => (
                          <li key={index}>• {item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {order.status === "delivered" ? order.deliveryTime : order.estimatedDelivery}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${order.total}</p>
                        {order.status === "in-transit" && (
                          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
                            <Phone className="h-4 w-4 mr-2" />
                            Call Delivery
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
