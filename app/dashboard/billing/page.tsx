"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, CreditCard, Download, Info } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function BillingPage() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async (plan: string) => {
    setLoading(true)

    // In a real implementation, this would redirect to Stripe Checkout
    // For demo purposes, we'll just simulate a delay
    setTimeout(() => {
      setLoading(false)
      alert(`Redirecting to Stripe checkout for ${plan} plan...`)
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Billing & Subscription</h2>
          <p className="text-muted-foreground">Manage your subscription and payment methods</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-7 md:col-span-4">
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Silver plan</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Silver Plan</p>
                <p className="text-sm text-muted-foreground">$19.99/month</p>
              </div>
              <Badge>Active</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Token Usage</span>
                <span>128/150 tokens</span>
              </div>
              <Progress value={85} />
            </div>
            <div className="rounded-md bg-muted p-4">
              <div className="flex items-start gap-4">
                <Info className="mt-0.5 h-4 w-4 text-muted-foreground" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Your subscription renews on May 15, 2023</p>
                  <p className="text-sm text-muted-foreground">You will be charged $19.99 on this date.</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-2 sm:flex-row sm:justify-between">
            <Button variant="outline">Cancel Subscription</Button>
            <Button>Buy Additional Tokens</Button>
          </CardFooter>
        </Card>
        <Card className="col-span-7 md:col-span-3">
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="rounded-md border p-2">
                <CreditCard className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-muted-foreground">Expires 12/25</p>
              </div>
              <Button variant="ghost" size="sm">
                Edit
              </Button>
            </div>
            <div className="rounded-md bg-muted p-4">
              <p className="text-sm">
                Your next payment of <span className="font-medium">$19.99</span> will be processed on{" "}
                <span className="font-medium">May 15, 2023</span>.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              <CreditCard className="mr-2 h-4 w-4" /> Update Payment Method
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Tabs defaultValue="plans" className="space-y-4">
        <TabsList>
          <TabsTrigger value="plans">Available Plans</TabsTrigger>
          <TabsTrigger value="history">Billing History</TabsTrigger>
        </TabsList>
        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Bronze</CardTitle>
                <div className="text-2xl font-bold">
                  $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Perfect for occasional homework help</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>50 AI tutoring tokens per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Text-based question input</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Basic practice problem generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Progress tracking</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" onClick={() => handleUpgrade("Bronze")}>
                  Downgrade
                </Button>
              </CardFooter>
            </Card>
            <Card className="border-primary">
              <CardHeader>
                <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
                  Current Plan
                </div>
                <CardTitle>Silver</CardTitle>
                <div className="text-2xl font-bold">
                  $19.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">For regular students who need consistent help</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>150 AI tutoring tokens per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Text & image input (upload photos)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Advanced practice generation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Performance analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Topic-specific study guides</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button disabled className="w-full">
                  Current Plan
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Gold</CardTitle>
                <div className="text-2xl font-bold">
                  $29.99<span className="text-sm font-normal text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">For serious students who need comprehensive support</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Unlimited basic sessions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>200 advanced tokens per month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>All input types (text, image, voice)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Personalized study plans</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleUpgrade("Gold")} disabled={loading}>
                  {loading ? "Processing..." : "Upgrade"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Invoice</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Apr 15, 2023</TableCell>
                    <TableCell>Silver Plan - Monthly</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Mar 15, 2023</TableCell>
                    <TableCell>Silver Plan - Monthly</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Feb 15, 2023</TableCell>
                    <TableCell>Silver Plan - Monthly</TableCell>
                    <TableCell>$19.99</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Paid
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
