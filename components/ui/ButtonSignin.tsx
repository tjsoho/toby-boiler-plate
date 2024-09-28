"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import config from "@/appConfig";
import ButtonAccount from "./ButtonAccount";

const ButtonSignin = ({ text = "Sign in" }: { text?: string }) => {
  const { status } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (status === "authenticated") {
      router.push(config.auth.callbackUrl);
    } else {
      signIn(undefined, { callbackUrl: config.auth.callbackUrl });
    }
  };

  if (status === "authenticated") {
    return <ButtonAccount />;
  }

  return (
    <button className="btn btn-sm btn-primary px-4 h-10" onClick={handleClick}>
      {text}
    </button>
  );
};

export default ButtonSignin;
