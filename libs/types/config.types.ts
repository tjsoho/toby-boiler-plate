import { Theme as DaisyTheme } from "daisyui";
import { Theme as NextTheme } from "next-auth";
import { DatabaseType, PaymentType } from "./adapter.types";

export interface AppConfig {
  website: {
    name: string;
    url: string;
    description: string;
    keywords: string;
    locale: string;
    googleAnalyticsId?: string;
  };
  theme: {
    main: DaisyTheme;
    auth: NextTheme["colorScheme"];
  };
  auth: {
    magicLinkExpirationTime: number;
    loginUrl: string;
    callbackUrl: string;
    thankYouUrl: string;
  };
  database: {
    provider: DatabaseType;
  };
  payment: {
    provider: PaymentType;
    plans: PricingPlan[];
  };
}

export interface PricingPlan {
  name: string;
  description: string;
  priceId: string;
  isFeatured: boolean;
  discountedPrice: string;
  originalPrice: string;
  features: {
    included: string[];
    excluded: string[];
  };
}
