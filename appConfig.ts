import { AppConfig, DatabaseType, PaymentType } from "./libs/types";

const SITE_URL = "http://localhost:3000";

export const config: AppConfig = {
  website: {
    name: "Frontend Accelerator",
    url: SITE_URL,
    description:
      "The NextJS boilerplate with all you need to build your SaaS, or any other web app.",
    keywords: "nextjs, saas, boilerplate, web app, typescript",
    googleAnalyticsId: "", // e.g. UA-000000-2
  },
  auth: {
    magicLinkExpirationTime: 24 * 60 * 60, // 24 hours
    loginUrl: "/api/auth/signin", // Url for singup page. Default url from next-auth is /api/auth/signin
    callbackUrl: "/members", // Url to redirect after login
    thankYouUrl: `${SITE_URL}?success=true`, // Needs to be full URL
  },
  theme: {
    main: "autumn",
    auth: "light",
  },
  database: {
    provider: DatabaseType.FIRESTORE,
  },
  payment: {
    provider: PaymentType.STRIPE,
    plans: [
      {
        name: "Hobby",
        description:
          "Basic plan to cover the needs of a small team just starting up.",
        /* 
        / Example of priceId
        / Stripe - "price_1PMqCcDv...." (priceId)
        / Lemon Squeezy - "108xxx-449xxx", (format: storeId-variantId)
        */
        priceId: "price_1PMqCcDv....",
        isFeatured: false,
        discountedPrice: "$30",
        originalPrice: "$49",
        features: {
          included: ["5 products", "Access to core tools", "Basic analytics"],
          excluded: [
            "48-hour response time",
            "Marketing automations",
            "Advanced reporting",
            "Custom domain",
          ],
        },
      },
      {
        name: "Team",
        description: "Advanced plan for teams that need to scale business.",
        priceId: "price-id-here",
        isFeatured: true,
        discountedPrice: "$60",
        originalPrice: "$79",
        features: {
          included: [
            "5 products",
            "Access to core tools",
            "Basic analytics",
            "48-hour response time",
            "Marketing automations",
            "Advanced reporting",
            "Custom domain",
          ],
          excluded: [],
        },
      },
    ],
  },
};

export default config;
