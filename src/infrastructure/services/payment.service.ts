import Stripe from "stripe";

// Initialized lazily to avoid build-time errors when API key is missing
let stripeInstance: Stripe | null = null;

function getStripe() {
  if (!stripeInstance) {
    stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
      apiVersion: "2025-11-17.clover",
    });
  }
  return stripeInstance;
}

export interface CreateCheckoutParams {
  episodeId: string;
  episodeTitle: string;
  seriesTitle: string;
  price: number; // in THB
  userId: string;
  userEmail: string;
}

export interface CreateSubscriptionParams {
  planId: string;
  planName: string;
  price: number; // in THB per month
  userId: string;
  userEmail: string;
}

export interface PaymentResult {
  success: boolean;
  sessionId?: string;
  url?: string;
  error?: string;
}

/**
 * Create a checkout session for episode purchase
 */
export async function createEpisodeCheckout(
  params: CreateCheckoutParams
): Promise<PaymentResult> {
  try {
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card", "promptpay"],
      mode: "payment",
      customer_email: params.userEmail,
      client_reference_id: params.userId,
      line_items: [
        {
          price_data: {
            currency: "thb",
            product_data: {
              name: `${params.seriesTitle} - ${params.episodeTitle}`,
              description: `ซื้อตอน: ${params.episodeTitle}`,
              metadata: {
                episodeId: params.episodeId,
                type: "episode",
              },
            },
            unit_amount: params.price * 100, // Stripe uses smallest currency unit
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: params.userId,
        episodeId: params.episodeId,
        type: "episode_purchase",
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/cancel`,
      locale: "th",
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url || undefined,
    };
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Payment failed",
    };
  }
}

/**
 * Create a checkout session for subscription
 */
export async function createSubscriptionCheckout(
  params: CreateSubscriptionParams
): Promise<PaymentResult> {
  try {
    // First, create or get the price
    const product = await getStripe().products.create({
      name: `CINEMAX ${params.planName}`,
      description: `แพ็คเกจสมาชิก ${params.planName}`,
    });

    const price = await getStripe().prices.create({
      product: product.id,
      unit_amount: params.price * 100,
      currency: "thb",
      recurring: {
        interval: "month",
      },
    });

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: params.userEmail,
      client_reference_id: params.userId,
      line_items: [
        {
          price: price.id,
          quantity: 1,
        },
      ],
      metadata: {
        userId: params.userId,
        planId: params.planId,
        type: "subscription",
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/subscription`,
      locale: "th",
    });

    return {
      success: true,
      sessionId: session.id,
      url: session.url || undefined,
    };
  } catch (error) {
    console.error("Stripe subscription error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Subscription failed",
    };
  }
}

/**
 * Verify payment session
 */
export async function verifyPaymentSession(sessionId: string) {
  try {
    const session = await getStripe().checkout.sessions.retrieve(sessionId);

    return {
      success: true,
      status: session.payment_status,
      metadata: session.metadata,
      customerId: session.customer,
      amountTotal: session.amount_total ? session.amount_total / 100 : 0,
    };
  } catch (error) {
    console.error("Verify session error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Verification failed",
    };
  }
}

/**
 * Handle webhook event
 */
export async function handleWebhookEvent(
  payload: string,
  signature: string
): Promise<{ success: boolean; event?: Stripe.Event; error?: string }> {
  try {
    const event = getStripe().webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ""
    );

    return { success: true, event };
  } catch (error) {
    console.error("Webhook error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Webhook failed",
    };
  }
}

/**
 * Get customer portal URL
 */
export async function getCustomerPortalUrl(
  customerId: string
): Promise<string | null> {
  try {
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/profile/settings`,
    });
    return session.url;
  } catch (error) {
    console.error("Customer portal error:", error);
    return null;
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await getStripe().subscriptions.cancel(subscriptionId);
    return { success: true, subscription };
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return { success: false, error };
  }
}
