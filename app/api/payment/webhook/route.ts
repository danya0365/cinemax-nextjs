import { handleWebhookEvent } from "@/src/infrastructure/services/payment.service";
import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const payload = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    const result = await handleWebhookEvent(payload, signature);

    if (!result.success || !result.event) {
      return NextResponse.json(
        { error: result.error || "Webhook verification failed" },
        { status: 400 }
      );
    }

    const event = result.event;

    // Handle different event types
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session);
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object as unknown as WebhookSubscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as unknown as WebhookSubscription;
        await handleSubscriptionCanceled(subscription);
        break;
      }

      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment succeeded:", paymentIntent.id);
        break;
      }

      case "payment_intent.payment_failed": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        console.log("Payment failed:", paymentIntent.id);
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const metadata = session.metadata;

  if (!metadata) return;

  const userId = metadata.userId;
  const type = metadata.type;

  if (type === "episode_purchase") {
    const episodeId = metadata.episodeId;

    // Record the purchase in database
    const { error } = await supabase.from("purchases").insert({
      user_id: userId,
      episode_id: episodeId,
      amount: session.amount_total ? session.amount_total / 100 : 0,
      currency: "THB",
      stripe_session_id: session.id,
      status: "completed",
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Failed to record purchase:", error);
    } else {
      console.log(`Episode ${episodeId} purchased by user ${userId}`);
    }
  } else if (type === "subscription") {
    const planId = metadata.planId;

    // Update user subscription status
    const { error } = await supabase
      .from("users")
      .update({
        subscription_plan: planId,
        subscription_status: "active",
        subscription_started_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (error) {
      console.error("Failed to update subscription:", error);
    } else {
      console.log(`Subscription ${planId} activated for user ${userId}`);
    }
  }
}

interface WebhookSubscription {
  id: string;
  status: string;
  customer: string;
  current_period_end: number;
}

async function handleSubscriptionUpdate(subscription: WebhookSubscription) {
  const customerId = subscription.customer as string;

  // Find user by Stripe customer ID
  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (user) {
    await supabase
      .from("users")
      .update({
        subscription_status: subscription.status,
        subscription_period_end: new Date(
          subscription.current_period_end * 1000
        ).toISOString(),
      })
      .eq("id", user.id);
  }
}

async function handleSubscriptionCanceled(subscription: WebhookSubscription) {
  const customerId = subscription.customer as string;

  const { data: user } = await supabase
    .from("users")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .single();

  if (user) {
    await supabase
      .from("users")
      .update({
        subscription_status: "canceled",
        subscription_plan: null,
      })
      .eq("id", user.id);
  }
}

