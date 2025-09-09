"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Minus } from "lucide-react"
import Image from "next/image"

interface MenuItem {
  id: string
  name: string
  price: number
  description: string
  isVeg: boolean
  image: string
}

interface MenuItemProps {
  item: MenuItem
  quantity: number
  onAdd: () => void
  onRemove: () => void
}

export function MenuItem({ item, quantity, onAdd, onRemove }: MenuItemProps) {
  return (
    <Card>
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
              <div className="text-sm text-muted-foreground">{item.isVeg ? "🟢 Vegetarian" : "🔴 Non-Vegetarian"}</div>

              {quantity > 0 ? (
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={onRemove}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button size="sm" onClick={onAdd}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button size="sm" onClick={onAdd}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
