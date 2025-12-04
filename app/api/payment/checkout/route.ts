import {
  createEpisodeCheckout,
  createSubscriptionCheckout,
} from "@/src/infrastructure/services/payment.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, userId, userEmail, ...params } = body;

    if (!userId || !userEmail) {
      return NextResponse.json(
        { error: "User authentication required" },
        { status: 401 }
      );
    }

    let result;

    if (type === "episode") {
      // Episode purchase
      const { episodeId, episodeTitle, seriesTitle, price } = params;

      if (!episodeId || !price) {
        return NextResponse.json(
          { error: "Missing episode information" },
          { status: 400 }
        );
      }

      result = await createEpisodeCheckout({
        episodeId,
        episodeTitle: episodeTitle || `Episode ${episodeId}`,
        seriesTitle: seriesTitle || "Series",
        price,
        userId,
        userEmail,
      });
    } else if (type === "subscription") {
      // Subscription purchase
      const { planId, planName, price } = params;

      if (!planId || !price) {
        return NextResponse.json(
          { error: "Missing subscription information" },
          { status: 400 }
        );
      }

      result = await createSubscriptionCheckout({
        planId,
        planName: planName || "Premium",
        price,
        userId,
        userEmail,
      });
    } else {
      return NextResponse.json(
        { error: "Invalid payment type" },
        { status: 400 }
      );
    }

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Payment creation failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      sessionId: result.sessionId,
      url: result.url,
    });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
