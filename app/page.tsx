import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChefHat, Users, ShoppingCart, Star, MapPin, Clock } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">FoodieAI</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-6 bg-secondary text-secondary-foreground">AI-Powered Food Delivery</Badge>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">
              Delicious Food,
              <span className="text-primary"> Delivered Smart</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Experience the future of food delivery with AI-powered recommendations, real-time tracking, and seamless
              ordering from your favorite restaurants.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/register">
                <Button size="lg" className="text-lg px-8">
                  Order Now
                </Button>
              </Link>
              <Link href="/restaurants">
                <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent">
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose FoodieAI?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our platform combines cutting-edge AI technology with exceptional service to deliver the best food
              ordering experience.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Smart Ordering</CardTitle>
                <CardDescription>
                  AI-powered recommendations based on your preferences and dietary needs
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>Fast Delivery</CardTitle>
                <CardDescription>Real-time tracking and optimized delivery routes for quick service</CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Star className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Quality Assured</CardTitle>
                <CardDescription>Curated restaurants with verified reviews and quality standards</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Join Our Platform</h2>
            <p className="text-muted-foreground text-lg">
              Whether you're hungry or serving, we have the perfect solution for you
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">For Customers</CardTitle>
                <CardDescription className="text-base">
                  Discover amazing food, track orders, and enjoy AI-powered recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/auth/register?type=customer">
                  <Button className="w-full" size="lg">
                    Start Ordering
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="mx-auto w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <ChefHat className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">For Restaurants</CardTitle>
                <CardDescription className="text-base">
                  Manage your menu, track orders, and grow your business with our tools
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link href="/auth/register?type=restaurant">
                  <Button variant="secondary" className="w-full" size="lg">
                    Join as Partner
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FoodieAI</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span>© 2024 FoodieAI. All rights reserved.</span>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Delivering everywhere</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
