"use client";
import { useSession, signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import config from "@/appConfig";
import ButtonAccount from "./ButtonAccount";
import { useTranslations } from "next-intl";

const ButtonSignin = () => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Components");

  const locale = pathname.split("/")[1];

  const handleClick = () => {
    if (status === "authenticated") {
      router.push(config.auth.callbackUrl);
    } else {
      signIn(undefined, {
        callbackUrl: `${
          locale
            ? "/" + locale + "/" + config.auth.callbackUrl
            : config.auth.callbackUrl
        }`,
      });
    }
  };

  if (status === "authenticated") {
    return <ButtonAccount />;
  }

  return (
    <button className="btn btn-sm btn-primary px-4 h-10" onClick={handleClick}>
      {t("ButtonSignIn.text")}
    </button>
  );
};

export default ButtonSignin;
