import ButtonCheckout from "@/components/ui/ButtonCheckout";
import { HeroProps } from "..";
import Image from "next/image";
import config from "@/appConfig";

export const HeroStyle2 = ({ headline, subHeadline }: HeroProps) => {
  return (
    <div className="mx-auto max-w-7xl px-6 pb-24 lg:flex lg:px-8 lg:py-36">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8">
        <div className="mt-24 sm:mt-32 lg:mt-16"></div>
        <h1 className="input-primary font-bold xl:mt-16 tracking-tight text-4xl md:text-6xl">
          {headline}
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">{subHeadline}</p>
        <div className="mt-10 flex items-center gap-x-6 flex-wrap md:flex">
          <ButtonCheckout priceId={config.payment.plans[0].priceId} />
          <a href="#" className="btn btn-ghost mt-2 md:mt-0">
            Learn more <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
        <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
          <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
            <Image
              alt="App screenshot"
              priority={true}
              src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              width={800}
              height={800}
              className="w-[18rem] md:w-[40rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
