import { NextResponse, NextRequest } from "next/server";
import config from "@/appConfig";
import { Database } from "@/libs/database";
import { PaymentAdapter } from "@/libs/payments";
import { PaymentEvent } from "@/libs/payments/webhook.types";

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer();
  const paymentProvider = new PaymentAdapter();

  try {
    paymentProvider.verifyWebhookSignature(rawBody);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  // Convert the rawBody to JSON
  const body = JSON.parse(new TextDecoder().decode(rawBody)) as JSON;
  const event = await paymentProvider.mapWebhookEvent(body);

  if (event.type === PaymentEvent.NOT_MAPPED) {
    // Ignore not mapped events
    return NextResponse.json({});
  }

  const db = new Database();

  try {
    switch (event.type) {
      case PaymentEvent.CHECKOUT_COMPLETED: {
        // Payment is successful (or subscription created). You can grant access to the product
        const {
          customerEmail,
          customerId,
          customerName,
          planId,
          userId,
          productName,
          purchasedAt,
        } = event.data;

        // We will try to update the user if it exists, otherwise create a new user
        const userFound =
          (await db.getUserById(userId)) ||
          (await db.getUserByEmail(customerEmail));

        const user =
          userFound ||
          (await db.createUser(customerEmail, customerName, customerId, []));

        if (!user) {
          throw new Error("No user found");
        }

        const newProduct = {
          name: productName,
          isActive: true,
          priceId: planId,
          purchasedAt,
          updatedAt: purchasedAt,
          paymentProvider: config.payment.provider,
        };

        const productAlreadyExists = user.products.find(
          (p) => p.priceId === planId
        );

        // Update user data + Grant user access to your product.
        db.updateUserById(user.id, {
          customerId: customerId,
          products: [
            ...(productAlreadyExists
              ? user.products.map((p) => {
                  if (p.priceId === planId) {
                    return {
                      ...p,
                      isActive: true,
                      purchasedAt,
                      updatedAt: purchasedAt,
                    };
                  }
                  return p;
                })
              : [...user.products, newProduct]),
          ],
        });

        break;
      }

      case PaymentEvent.CHECKOUT_EXPIRED: {
        // User didn't complete the transaction
        break;
      }

      case PaymentEvent.SUBSCRIPTION_UPDATED: {
        // Subscription updated (e.g. user changed the plan to higher/lower tier)
        break;
      }

      case PaymentEvent.SUBSCRIPTION_ENDED: {
        // Subscription ended, revoke access to the product
        const { customerId, planId } = event.data;
        const user = await db.getUserByCustomerId(customerId);

        // Revoke access to your product (delete it from the user's products array)
        db.updateUserById(user.id, {
          products: user.products.map((p) => {
            if (p.priceId === planId) {
              return {
                ...p,
                isActive: false,
                updatedAt: new Date().toISOString(),
              };
            }
            return p;
          }),
        });

        break;
      }

      case PaymentEvent.FULL_OR_PARTIAL_REFUND: {
        // User got partial or full refund (applies for single payment and subscription)
        break;
      }

      default: {
        const exhaustiveCheck: never = event;
        throw new Error(`Unhandled case: ${exhaustiveCheck}`);
      }
    }
  } catch (e) {
    console.error("Webhook payment error: ", e.message);
  }

  return NextResponse.json({});
}
