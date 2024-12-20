import { ReactNode } from "react";
import SharedPageLayout from "@/components/layouts/PublicLayout";

export default async function TermsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <SharedPageLayout>{children}</SharedPageLayout>;
}
