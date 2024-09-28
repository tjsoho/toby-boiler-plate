import ButtonCheckout from "@/components/ui/ButtonCheckout";
import { HeroProps } from "..";
import config from "@/appConfig";

export const HeroStyle1 = ({ headline, subHeadline }: HeroProps) => {
  return (
    <div className="mx-auto max-w-2xl py-16 sm:py-32 lg:py-40">
      <div className="text-center">
        <h1 className="input-primary font-bold xl:mt-16 tracking-tight text-4xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-base-content/80">
          {subHeadline}
        </p>
        <div className="mt-10 items-center justify-center gap-x-6 flex-wrap md:flex">
          <ButtonCheckout priceId={config.payment.plans[0].priceId} />
          <a href="#" className="btn btn-ghost mt-2 md:mt-0">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
};
