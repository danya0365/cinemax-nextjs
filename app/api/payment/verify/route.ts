import { verifyPaymentSession } from "@/src/infrastructure/services/payment.service";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID required" },
        { status: 400 }
      );
    }

    const result = await verifyPaymentSession(sessionId);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Verification failed" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: result.status,
      metadata: result.metadata,
      amount: result.amountTotal,
    });
  } catch (error) {
    console.error("Verify API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
