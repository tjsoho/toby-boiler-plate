import { ReactNode } from "react";

interface CTAProps {
  title: string;
  cta?: ReactNode;
}

const CTA = ({ title, cta }: CTAProps) => {
  return (
    <section className="bg-neutral text-center text-neutral-content py-20 md:py-16">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <p className="mt-2 mb-4 text-3xl font-bold tracking-tight leading-10 sm:text-5xl">
            {title}
          </p>
        </div>
        {cta && (
          <div className="mx-auto flex justify-center text-center pt-6">
            {cta}
          </div>
        )}
      </div>
    </section>
  );
};

export default CTA;
