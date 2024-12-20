"use client";
import { useState } from "react";
import apiClient from "@/libs/apiClient";
import LoaderIcon from "../elements/icons/loader";
import { RocketLaunchIcon } from "@heroicons/react/20/solid";
import app from "@/appConfig";
import { useTranslations } from "next-intl";

const ButtonCheckout = ({
  priceId,
  mode = "payment",
}: {
  priceId: string;
  mode?: "payment" | "subscription";
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const t = useTranslations("Components");

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      const { url }: { url: string } = await apiClient.post(
        "/payment/create-checkout",
        {
          priceId,
          successUrl: app.auth.thankYouUrl,
          cancelUrl: window.location.href,
          mode,
        }
      );

      window.location.href = url;
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <button className="btn btn-primary group" onClick={() => handlePayment()}>
      {isLoading ? (
        <LoaderIcon className="loading-xs" />
      ) : (
        <RocketLaunchIcon className="w-5 group-hover:-rotate-3 group-hover:scale-110 duration-200" />
      )}
      {t("ButtonCheckout.text")}
    </button>
  );
};

export default ButtonCheckout;
