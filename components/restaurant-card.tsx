import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Restaurant {
  id: string
  name: string
  cuisine: string
  rating: number
  deliveryTime: string
  deliveryFee: number
  address: string
  image: string
  isVeg: boolean
  tags: string[]
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  return (
    <Link href={`/restaurants/${restaurant.id}`}>
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
  )
}
