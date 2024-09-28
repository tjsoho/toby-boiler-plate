import { ReactNode } from "react";
import SharedPageLayout from "@/components/layouts/PublicLayout";

export default async function PrivacyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SharedPageLayout>{children}</SharedPageLayout>;
}
