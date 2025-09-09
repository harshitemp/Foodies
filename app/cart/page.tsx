"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  ChefHat,
  ArrowLeft,
  Plus,
  Minus,
  Trash2,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  CheckCircle,
  Clock,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useCart } from "@/lib/cart-context"

type PaymentMethod = "cod" | "card" | "wallet"

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalItems, getTotalPrice, clearCart } = useCart()
  const [step, setStep] = useState<"cart" | "address" | "payment" | "confirmation">("cart")
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [address, setAddress] = useState({
    type: "home",
    flatNo: "",
    street: "",
    pincode: "",
    landmark: "",
  })
  const [cardDetails, setCardDetails] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: "",
  })

  const subtotal = getTotalPrice()
  const gstRate = 0.18 // 18% GST
  const gstAmount = subtotal * gstRate
  const platformFee = 2.99
  const deliveryFee = 2.99
  const totalAmount = subtotal + gstAmount + platformFee + deliveryFee

  const generateOrderId = () => {
    return `FD${Date.now().toString().slice(-8)}`
  }

  const handleCheckout = async () => {
    if (step === "cart") {
      setStep("address")
    } else if (step === "address") {
      if (!address.flatNo || !address.street || !address.pincode) {
        return
      }
      setStep("payment")
    } else if (step === "payment") {
      setIsProcessing(true)

      try {
        // Simulate payment processing delay
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Generate order ID
        const newOrderId = generateOrderId()
        setOrderId(newOrderId)

        // Clear cart and move to confirmation
        clearCart()
        setStep("confirmation")
      } catch (error) {
        console.error("Payment failed:", error)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  const isAddressValid = address.flatNo && address.street && address.pincode
  const isCardValid =
    paymentMethod !== "card" || (cardDetails.number && cardDetails.expiry && cardDetails.cvv && cardDetails.name)

  if (items.length === 0 && step === "cart") {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
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
          </div>
        </header>

        <div className="container mx-auto px-4 py-16 text-center">
          <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-8">Add some delicious items to get started!</p>
          <Link href="/restaurants">
            <Button size="lg">Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (step === "confirmation") {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FoodieAI</span>
            </Link>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We've received your payment and your food is being prepared.
            </p>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Order ID:</span>
                    <span className="font-mono text-primary">{orderId}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Amount:</span>
                    <span className="font-bold text-lg">${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Payment Method:</span>
                    <span className="capitalize">
                      {paymentMethod === "cod"
                        ? "Cash on Delivery"
                        : paymentMethod === "card"
                          ? "Credit/Debit Card"
                          : "Digital Wallet"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Delivery Address:</span>
                    <span className="text-right text-sm">
                      {address.flatNo}, {address.street}
                      <br />
                      {address.pincode}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert className="mb-8">
              <Clock className="h-4 w-4" />
              <AlertDescription>
                Estimated delivery time: 25-35 minutes. You'll receive updates via SMS.
              </AlertDescription>
            </Alert>

            <div className="flex gap-4 justify-center">
              <Link href="/orders">
                <Button variant="outline">Track Order</Button>
              </Link>
              <Link href="/restaurants">
                <Button>Order Again</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (step === "cart") {
                  window.history.back()
                } else if (step === "address") {
                  setStep("cart")
                } else {
                  setStep("address")
                }
              }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Link href="/" className="flex items-center gap-2">
              <ChefHat className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">FoodieAI</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className={`flex items-center gap-2 ${step === "cart" ? "text-primary" : "text-muted-foreground"}`}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "cart" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  1
                </div>
                <span>Cart</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div
                className={`flex items-center gap-2 ${step === "address" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "address" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  2
                </div>
                <span>Address</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div
                className={`flex items-center gap-2 ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                >
                  3
                </div>
                <span>Payment</span>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === "cart" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Your Cart ({getTotalItems()} items)</CardTitle>
                    <CardDescription>Review your items before checkout</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={80}
                          height={80}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
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
                              <p className="text-sm text-muted-foreground">{item.restaurantName}</p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                            <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {step === "address" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      Delivery Address
                    </CardTitle>
                    <CardDescription>Where should we deliver your order?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="flatNo">Flat/House No. *</Label>
                        <Input
                          id="flatNo"
                          placeholder="Enter flat/house number"
                          value={address.flatNo}
                          onChange={(e) => setAddress({ ...address, flatNo: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pincode">Pincode *</Label>
                        <Input
                          id="pincode"
                          placeholder="Enter pincode"
                          value={address.pincode}
                          onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        placeholder="Enter street address"
                        value={address.street}
                        onChange={(e) => setAddress({ ...address, street: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="landmark">Landmark (Optional)</Label>
                      <Input
                        id="landmark"
                        placeholder="Enter nearby landmark"
                        value={address.landmark}
                        onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                      />
                    </div>
                  </CardContent>
                </Card>
              )}

              {step === "payment" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Method
                    </CardTitle>
                    <CardDescription>Choose your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <Card
                        className={`p-4 border-2 cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full ${paymentMethod === "cod" ? "bg-primary" : "border-2"}`}
                          />
                          <Banknote className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Cash on Delivery</p>
                            <p className="text-sm text-muted-foreground">Pay when your order arrives</p>
                          </div>
                        </div>
                      </Card>

                      <Card
                        className={`p-4 border-2 cursor-pointer transition-colors ${paymentMethod === "card" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full ${paymentMethod === "card" ? "bg-primary" : "border-2"}`}
                          />
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Credit/Debit Card</p>
                            <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
                          </div>
                        </div>
                      </Card>

                      <Card
                        className={`p-4 border-2 cursor-pointer transition-colors ${paymentMethod === "wallet" ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
                        onClick={() => setPaymentMethod("wallet")}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-4 h-4 rounded-full ${paymentMethod === "wallet" ? "bg-primary" : "border-2"}`}
                          />
                          <Wallet className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">Digital Wallet</p>
                            <p className="text-sm text-muted-foreground">PayPal, Google Pay, Apple Pay</p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    {paymentMethod === "card" && (
                      <div className="mt-6 p-4 border rounded-lg bg-muted/50">
                        <h4 className="font-medium mb-4">Card Details</h4>
                        <div className="grid gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <Input
                              id="cardName"
                              placeholder="Enter name on card"
                              value={cardDetails.name}
                              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.number}
                              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Expiry Date *</Label>
                              <Input
                                id="cardExpiry"
                                placeholder="MM/YY"
                                value={cardDetails.expiry}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cardCvv">CVV *</Label>
                              <Input
                                id="cardCvv"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>GST (18%)</span>
                      <span>${gstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee</span>
                      <span>${platformFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${totalAmount.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={handleCheckout}
                    disabled={
                      isProcessing || (step === "address" && !isAddressValid) || (step === "payment" && !isCardValid)
                    }
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        {step === "cart" && "Proceed to Address"}
                        {step === "address" && "Proceed to Payment"}
                        {step === "payment" && `Pay $${totalAmount.toFixed(2)}`}
                      </>
                    )}
                  </Button>

                  {step === "payment" && (
                    <p className="text-xs text-muted-foreground text-center">
                      By placing this order, you agree to our terms and conditions. Your payment is secure and
                      encrypted.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
