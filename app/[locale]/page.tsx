import { Suspense } from "react";
import Header from "@/components/sections/Header";
import Features from "@/components/sections/Features";
import Reviews from "@/components/sections/Reviews";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import ButtonCaptureEmail from "@/components/ui/ButtonCaptureEmail";
import { useTranslations } from "next-intl";
import SuccessToaster from "@/components/SuccessToaster";

export default function Home() {
  const t = useTranslations("Homepage");

  return (
    <>
      <Suspense>
        <SuccessToaster />
        <Header />
      </Suspense>
      <main>
        <Hero
          style={2}
          headline={t("headline")}
          subHeadline={t("subheadline")}
          imageUrl="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80"
        />
        <Stats />
        <Features />
        <Pricing />
        <CTA title={t("ctaOne")} />
        <Reviews />
        <FAQ />
        <CTA title={t("ctaTwo")} cta={<ButtonCaptureEmail />} />
      </main>
      <Footer />
    </>
  );
}
