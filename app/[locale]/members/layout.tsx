import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import config from "@/appConfig";
import { authOptions } from "@/libs/auth/next-auth";
import PrivateLayout from "@/components/layouts/PrivateLayout";

// Private layout only for authenticated users. It is applied to all sub-pages
export default async function LayoutPrivate({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(config.auth.loginUrl);
  }

  return <PrivateLayout>{children}</PrivateLayout>;
}
