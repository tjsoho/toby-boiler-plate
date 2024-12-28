import { headers } from "next/headers";
import Stripe from "stripe";
import {
  PaymentEvent,
  PaymentRefund,
  PaymentCheckout,
  PaymentSubscription,
} from "../webhook.types";
import { getExtraParams } from "./helpers";

import {
  PaymentAdapterInterface,
  CreateCheckoutParams,
} from "../payment.types";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
  typescript: true,
});

export class StripeAdapter implements PaymentAdapterInterface {
  private constructStripeEvent(body: ArrayBuffer, signature: string) {
    const buffer = Buffer.from(body);
    return stripe.webhooks.constructEvent(
      buffer,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  }

  async verifyWebhookSignature(rawBody: ArrayBuffer) {
    const signature = (await headers()).get("stripe-signature");
    this.constructStripeEvent(rawBody, signature);
  }

  /*  
  /  Checkout all webook types and explanations at
  /  https://docs.stripe.com/api/events/types
  */
  mapWebhookType(webhook: any): PaymentEvent {
    const stripeObject = webhook as Stripe.Event;

    switch (stripeObject.type) {
      case "checkout.session.completed":
        return PaymentEvent.CHECKOUT_COMPLETED;
      case "checkout.session.expired":
        return PaymentEvent.CHECKOUT_EXPIRED;
      case "customer.subscription.updated":
        return PaymentEvent.SUBSCRIPTION_UPDATED;
      case "customer.subscription.deleted":
        return PaymentEvent.SUBSCRIPTION_ENDED;
      case "charge.refunded":
        return PaymentEvent.FULL_OR_PARTIAL_REFUND;
      default:
        return PaymentEvent.NOT_MAPPED;
    }
  }

  async mapToCheckout(webhook: Stripe.Event): Promise<PaymentCheckout> {
    const sessionData = webhook.data.object as Stripe.Checkout.Session;

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionData.id, {
        expand: ["line_items"],
      });
      const product = session.line_items.data[0];

      return {
        customerId: session.customer as string,
        customerEmail: session.customer_details.email,
        customerName: session.customer_details.name,
        planId: product.price.id,
        userId: session.client_reference_id,
        purchasedAt: new Date(session.created * 1000).toISOString(),
        productName: product.description,
      };
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  async mapToSubscription(webhook: Stripe.Event): Promise<PaymentSubscription> {
    const sessionData = webhook.data.object as Stripe.Checkout.Session;
    const subscription = await stripe.subscriptions.retrieve(sessionData.id);
    const invoice = await stripe.invoices.retrieve(
      subscription.latest_invoice as string
    );

    const product = subscription.items.data[0];
    return {
      customerId: subscription.customer as string,
      planId: product.price.id,
      amount: product.price.unit_amount,
      receiptUrl: invoice.hosted_invoice_url,
    };
  }

  async mapToRefund(webhook: Stripe.Event): Promise<PaymentRefund> {
    const charge = webhook.data.object as Stripe.Charge;

    return {
      amount: charge.amount_refunded,
      refundDate: new Date(charge.created * 1000).toISOString(),
      receiptUrl: charge.receipt_url,
    };
  }

  // This is used to create a Stripe Checkout Session (one-time payment or subscription)
  async createCheckoutSessionUrl(
    checkoutParams: CreateCheckoutParams
  ): Promise<string> {
    const { successUrl, cancelUrl, mode, user, priceId } = checkoutParams;
    const extraParams = getExtraParams(user, mode);

    const stripeSession = await stripe.checkout.sessions.create({
      mode,
      allow_promotion_codes: true,
      client_reference_id: user?.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...extraParams,
    });

    if (!stripeSession?.url) {
      throw new Error("Failed to create a Stripe checkout session!");
    }

    return stripeSession.url;
  }

  // This is used to create a Stripe Customer Portal (to manage subscriptions)
  async createCustomerPortalUrl(customerId: string, returnUrl: string) {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    if (!portalSession?.url) {
      throw new Error("Failed to create a Stripe portal!");
    }

    return portalSession.url;
  }
}
