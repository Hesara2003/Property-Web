import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Home, Mail, Phone, MapPin, Clock } from "lucide-react"
import Link from "next/link"
import GSAPScrollProvider from "@/components/gsap-scroll-provider"

export default function ContactPage() {
  return (
  <GSAPScrollProvider>
  <div className="min-h-screen bg-background">
  <div className="container mx-auto px-4 py-16" data-gsap="fade-up" data-gsap-stagger="0.15">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16" data-gsap="fade-up" data-gsap-delay="0.05">
            <h1 className="text-4xl lg:text-5xl font-bold text-balance mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
              Have questions about Property Scout in Sri Lanka? We're here to help you find your perfect property match across Colombo, Kandy, Galle, Jaffna and beyond.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12" data-gsap="fade-up" data-gsap-delay="0.1">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="+94 71 234 5678" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us more about your inquiry..." rows={5} required />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                      <p className="text-muted-foreground mb-2">Send us an email and we'll respond within 24 hours.</p>
                      <p className="font-medium">support@propertyscout.lk</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Call Us</h3>
                      <p className="text-muted-foreground mb-2">Speak directly with our property experts.</p>
                      <p className="font-medium">+94 11 234 5678</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Visit Us</h3>
                      <p className="text-muted-foreground mb-2">Come visit our office for in-person consultation.</p>
                      <p className="font-medium">
                        42 Sir Baron Jayatilaka Mawatha
                        <br />
                        Colombo 01
                        <br />
                        Sri Lanka
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
                      <p className="text-muted-foreground mb-2">We're available during these hours:</p>
                      <div className="space-y-1 text-sm">
                        <p>
                          <span className="font-medium">Monday - Friday:</span> 9:00 AM - 7:00 PM
                        </p>
                        <p>
                          <span className="font-medium">Saturday:</span> 10:00 AM - 5:00 PM
                        </p>
                        <p>
                          <span className="font-medium">Sunday:</span> Closed
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>


    </div>
    </GSAPScrollProvider>
  )
}
