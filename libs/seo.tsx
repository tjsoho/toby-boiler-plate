import { SoftwareApplication } from "schema-dts";
import type { Metadata } from "next";
import config from "@/appConfig";

// Generates SEO tags for the page
export const generateSEOMetadata = ({
  title,
  description,
  keywords,
  openGraph,
  alternates: { canonical: canonicalUrl },
}: Metadata) => {
  return {
    // Max 50 characters
    title: title || config.website.name,
    // Max 160 characters
    description: description || config.website.description,
    keywords: keywords || config.website.keywords,
    applicationName: config.website.name,
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `${config.website.url}/`
    ),

    ...(canonicalUrl && {
      alternates: { canonical: canonicalUrl },
    }),

    openGraph: {
      siteName: openGraph?.title || config.website.name,
      title: openGraph?.title || config.website.name,
      description: openGraph?.description || config.website.description,
      url: openGraph?.url || `${config.website.url}/`,
      type: "website",
      locale: config.website.locale.replace("-", "_"), // en-US -> en_US, Open Graph requires an underscore
    },

    twitter: {
      creator: "Your Name",
      title: openGraph?.title || config.website.name,
      description: openGraph?.description || config.website.description,
      card: "summary_large_image",
    },
  };
};

// JSON Schema for Google Search structured data
// https://developers.google.com/search/docs/appearance/structured-data/software-app#json-ld
export const renderProductSchema = () => {
  const productSchema: SoftwareApplication = {
    "@type": "SoftwareApplication",
    name: config.website.name,
    description: config.website.description,
    applicationCategory: "DeveloperApplication",
    // author: {
    //   "@type": "Person",
    //   name: "Your Name",
    // },
    // aggregateRating: {
    //   "@type": "AggregateRating",
    //   ratingValue: "4.6",
    //   ratingCount: "200",
    // },
    offers: config.payment.plans.map((plan) => ({
      "@type": "Offer",
      name: plan.name,
      price: plan.discountedPrice,
      priceCurrency: "USD",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...productSchema,
        }),
      }}
    ></script>
  );
};
