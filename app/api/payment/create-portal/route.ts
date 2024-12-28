import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth/next-auth";
import { Database } from "@/libs/database";
import { PaymentAdapter } from "@/libs/payments";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "You need to be logged in to access payment portal" },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { returnUrl } = body;
    const { id } = session.user;

    const db = new Database();
    const paymentAdapter = new PaymentAdapter();

    const user = await db.getUserById(id);

    if (!user?.customerId) {
      return noPurchaseFound();
    } else if (!returnUrl) {
      return NextResponse.json(
        { error: "Return URL is required" },
        { status: 400 }
      );
    }

    const stripePortalUrl = await paymentAdapter.createCustomerPortalUrl(
      user.customerId,
      returnUrl
    );

    if (!stripePortalUrl) {
      return noPurchaseFound();
    }

    return NextResponse.json({
      url: stripePortalUrl,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

function noPurchaseFound() {
  return NextResponse.json(
    {
      error:
        "You don't have any subscriptions or payments yet. Make a purchase first.",
    },
    { status: 400 }
  );
}
