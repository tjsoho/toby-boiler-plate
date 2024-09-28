import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";
import { Database } from "@/libs/database";
import { CheckoutMode } from "@/libs/payments/payment.types";
import { PaymentAdapter } from "@/libs/payments";
import { User } from "@/libs/database/types";

// Route to create a checkout session URL
// and redirects user to the checkout page of payment provider (Stripe, Lemon Squeezy, etc.)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { priceId, mode, successUrl, cancelUrl } = body;

  if (!body.priceId || !body.successUrl || !body.cancelUrl || !body.mode) {
    return NextResponse.json(
      {
        error:
          "Price ID, success and cancel URLs, and checkout mode are required!",
      },
      { status: 400 }
    );
  }
  if (
    body.mode !== CheckoutMode.Payment &&
    body.mode !== CheckoutMode.Subscription
  ) {
    return NextResponse.json(
      {
        error: `Mode must be either '${CheckoutMode.Payment}' or '${CheckoutMode.Subscription}'`,
      },
      { status: 400 }
    );
  }

  try {
    const db = new Database();
    const paymentAdapter = new PaymentAdapter();
    const session = await getServerSession(authOptions);

    let user: User;
    if (session) {
      user = await db.getUserById(session.user.id);

      // Check if user already has the product
      if (user.products.find((p) => p.priceId === priceId)) {
        return NextResponse.json(
          { error: "You already own this product!" },
          { status: 400 }
        );
      }
    }

    const checkoutSessionUrl = await paymentAdapter.createCheckoutSessionUrl({
      priceId,
      mode,
      successUrl,
      cancelUrl,
      user,
    });

    return NextResponse.json({ url: checkoutSessionUrl });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}
