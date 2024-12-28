import config from "@/appConfig";
import { LemonSqueezeAdapter as LemonSqueezyAdapter } from "./lemonSqueezy/adapter";
import { StripeAdapter } from "./stripe/adapter";
import { PaymentType } from "../types";
import { CreateCheckoutParams, PaymentAdapterInterface } from "./payment.types";
import { PaymentEvent, PaymentWebhookEvent } from "./webhook.types";

export class PaymentAdapter {
  payment: PaymentAdapterInterface;

  constructor() {
    if (config.payment.provider === PaymentType.STRIPE) {
      this.payment = new StripeAdapter();
    } else if (config.payment.provider === PaymentType.LEMON_SQUEEZY) {
      this.payment = new LemonSqueezyAdapter();
    } else {
      throw new Error("Invalid PAYMENT_PROVIDER in .env file");
    }
  }

  async verifyWebhookSignature(req: ArrayBuffer) {
    return this.payment.verifyWebhookSignature(req);
  }

  private mapToCheckout(webhook: JSON) {
    return this.payment.mapToCheckout(webhook);
  }

  private mapToSubscription(webhook: JSON) {
    return this.payment.mapToSubscription(webhook);
  }

  async mapWebhookEvent(webhook: JSON): Promise<PaymentWebhookEvent> {
    const type = this.payment.mapWebhookType(webhook);

    switch (type) {
      case PaymentEvent.CHECKOUT_COMPLETED:
      case PaymentEvent.CHECKOUT_EXPIRED: {
        return {
          type,
          data: await this.mapToCheckout(webhook),
        };
      }
      case PaymentEvent.SUBSCRIPTION_UPDATED:
      case PaymentEvent.SUBSCRIPTION_ENDED:
        return {
          type,
          data: await this.mapToSubscription(webhook),
        };
      case PaymentEvent.FULL_OR_PARTIAL_REFUND:
        return {
          type,
          data: await this.payment.mapToRefund(webhook),
        };
      case PaymentEvent.NOT_MAPPED:
        return {
          type,
          data: {},
        };
      default: {
        // Just to ensure with typescript that we handle all cases
        const exhaustiveCheck: never = type;
        throw new Error(`Unhandled case: ${exhaustiveCheck}`);
      }
    }
  }

  createCheckoutSessionUrl(checkoutParams: CreateCheckoutParams) {
    return this.payment.createCheckoutSessionUrl(checkoutParams);
  }

  createCustomerPortalUrl(customerId: string, returnUrl: string) {
    return this.payment.createCustomerPortalUrl(customerId, returnUrl);
  }
}
