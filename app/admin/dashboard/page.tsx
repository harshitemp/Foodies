"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Store, ShoppingBag, Users, DollarSign, TrendingUp, Clock, Star, Download } from "lucide-react"

// Mock data
const stats = [
  {
    title: "Total Revenue",
    value: "$12,345",
    change: "+12.5%",
    icon: DollarSign,
    color: "text-green-600",
  },
  {
    title: "Active Orders",
    value: "23",
    change: "+5.2%",
    icon: ShoppingBag,
    color: "text-blue-600",
  },
  {
    title: "Total Restaurants",
    value: "156",
    change: "+8.1%",
    icon: Store,
    color: "text-purple-600",
  },
  {
    title: "Active Users",
    value: "2,847",
    change: "+15.3%",
    icon: Users,
    color: "text-orange-600",
  },
]

const recentOrders = [
  {
    id: "#12345",
    customer: "John Doe",
    restaurant: "Pizza Palace",
    amount: "$24.99",
    status: "Delivered",
    time: "2 min ago",
  },
  {
    id: "#12344",
    customer: "Jane Smith",
    restaurant: "Burger House",
    amount: "$18.50",
    status: "In Transit",
    time: "5 min ago",
  },
  {
    id: "#12343",
    customer: "Mike Johnson",
    restaurant: "Sushi World",
    amount: "$45.00",
    status: "Preparing",
    time: "8 min ago",
  },
  {
    id: "#12342",
    customer: "Sarah Wilson",
    restaurant: "Taco Bell",
    amount: "$12.75",
    status: "Confirmed",
    time: "12 min ago",
  },
]

const topRestaurants = [
  { name: "Pizza Palace", orders: 45, rating: 4.8, revenue: "$2,340" },
  { name: "Burger House", orders: 38, rating: 4.6, revenue: "$1,890" },
  { name: "Sushi World", orders: 32, rating: 4.9, revenue: "$2,100" },
  { name: "Taco Bell", orders: 28, rating: 4.4, revenue: "$1,250" },
]

export default function AdminDashboard() {
  const handleExportData = () => {
    // Mock data export functionality
    const data = {
      stats,
      recentOrders,
      topRestaurants,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `foodieai-dashboard-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome to your FoodieAI admin dashboard</p>
        </div>
        <Button onClick={handleExportData} className="bg-green-600 hover:bg-green-700">
          <Download className="mr-2 h-4 w-4" />
          Export Data
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Recent Orders
            </CardTitle>
            <CardDescription>Latest orders from your platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <span className="text-sm text-gray-500">{order.time}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {order.customer} • {order.restaurant}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{order.amount}</div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "In Transit"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "Preparing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Restaurants */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Top Restaurants
            </CardTitle>
            <CardDescription>Best performing restaurants this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topRestaurants.map((restaurant, index) => (
                <div key={restaurant.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{restaurant.name}</div>
                      <div className="text-sm text-gray-600">
                        {restaurant.orders} orders • ⭐ {restaurant.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-900">{restaurant.revenue}</div>
                    <div className="text-sm text-gray-600">Revenue</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
