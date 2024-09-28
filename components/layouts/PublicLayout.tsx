import { ReactNode, Suspense } from "react";
import Header from "../sections/Header";
import Footer from "../sections/Footer";

export default async function PublicLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <div className="max-w-xl mx-auto">
        <div className="p-5">{children}</div>
      </div>
      <Footer />
    </>
  );
}
