import ButtonCheckout from "@/components/ui/ButtonCheckout";
import { HeroProps } from "..";
import Image from "next/image";
import config from "@/appConfig";

export const HeroStyle3 = ({ headline, subHeadline }: HeroProps) => {
  return (
    <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      <div className="px-6 pb-16 pt-10 sm:pb-16 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
        <div className="mx-auto max-w-2xl lg:mx-0 md:pt-0 pt-4">
          <h1 className="input-primary font-bold xl:mt-16 tracking-tight text-4xl md:text-6xl">
            {headline}
          </h1>
          <p className="label mt-6 text-lg leading-8">{subHeadline}</p>
          <div className="mt-10 flex items-center gap-x-6 flex-wrap md:flex">
            <ButtonCheckout priceId={config.payment.plans[0].priceId} />
            <a href="#" className="btn btn-ghost mt-2 md:mt-0">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
        <Image
          priority={true}
          alt=""
          src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
        />
      </div>
    </div>
  );
};
