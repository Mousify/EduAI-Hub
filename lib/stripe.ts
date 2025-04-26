import Stripe from "stripe"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
})

// Plan IDs in Stripe
const PLANS = {
  bronze: process.env.STRIPE_BRONZE_PLAN_ID,
  silver: process.env.STRIPE_SILVER_PLAN_ID,
  gold: process.env.STRIPE_GOLD_PLAN_ID,
}

// Token allocations per plan
export const PLAN_TOKENS = {
  free: 5,
  bronze: 50,
  silver: 150,
  gold: 500,
}

// Create a Stripe checkout session
export async function createCheckoutSession(customerId: string, priceId: string, returnUrl: string) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: "subscription",
    success_url: `${returnUrl}?success=true`,
    cancel_url: `${returnUrl}?canceled=true`,
  })

  return session
}

// Create a Stripe customer
export async function createCustomer(email: string, name: string) {
  const customer = await stripe.customers.create({
    email,
    name,
  })

  return customer
}

// Update a subscription
export async function updateSubscription(subscriptionId: string, priceId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)

  const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
    items: [
      {
        id: subscription.items.data[0].id,
        price: priceId,
      },
    ],
  })

  return updatedSubscription
}

// Cancel a subscription
export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })

  return subscription
}

// Create a portal session for managing billing
export async function createPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  })

  return session
}

// Get subscription data
export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  return subscription
}

// Get customer data
export async function getCustomer(customerId: string) {
  const customer = await stripe.customers.retrieve(customerId)
  return customer
}

// Get invoices for a customer
export async function getInvoices(customerId: string) {
  const invoices = await stripe.invoices.list({
    customer: customerId,
    limit: 10,
  })

  return invoices
}
