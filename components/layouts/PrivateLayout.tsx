import { ReactNode } from "react";
import Footer from "../sections/Footer";
import Header from "../sections/Header";

export default async function PrivateLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto">
        <div className="p-5">{children}</div>
      </div>
      <Footer />
    </>
  );
}
