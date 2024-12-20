import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ButtonCheckout from "../ui/ButtonCheckout";
import { TagIcon } from "@heroicons/react/24/outline";
import config from "@/appConfig";

export default async function Pricing() {
  return (
    <section
      id="pricing"
      className="text-neutral-content mx-auto px-6 pt-24 text-center sm:pt-32 lg:px-8"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-base-content mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
          The right price for you, <br className="hidden sm:inline lg:hidden" />
          whoever you are
        </p>
      </div>
      <div className="relative mt-6">
        <p className="text-base-content/50 mx-auto max-w-2xl text-lg leading-8">
          Flexible plans tailored to fit every developer&apos;s needs—whether
          you&apos;re just starting out or scaling up.
        </p>
      </div>
      <div className="mt-12 pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-md grid-cols-1 gap-8 lg:max-w-4xl lg:grid-cols-2">
            {config.payment.plans.map((tier) => (
              <div
                key={tier.priceId}
                className={`flex flex-col bg-neutral-content justify-between bg-white p-8 shadow-xl sm:p-10 ${
                  tier.isFeatured ? "border-primary" : "border-transparent"
                } border-2 rounded-lg`}
              >
                <div className="flex justify-between">
                  <h3
                    id={tier.priceId}
                    className="text-xl text-left font-semibold leading-7 text-primary "
                  >
                    {tier.name}
                  </h3>
                  {tier.isFeatured ? (
                    <p className="flex items-center rounded-full bg-primary text-base px-2.5 py-1 text-xs font-semibold">
                      <TagIcon className="w-4 h-4 mr-1" />
                      Best value
                    </p>
                  ) : null}
                </div>
                <div className="mt-6 flex items-baseline gap-x-2">
                  <span className="line-through text-gray-600">
                    {tier.originalPrice}
                  </span>
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    {tier.discountedPrice}
                  </span>
                </div>
                <p className="mt-6 text-left text-base leading-7 text-base-content">
                  {tier.description}
                </p>
                <ul className="mt-10 space-y-4 text-sm leading-6 text-gray-600">
                  {tier.features.included.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <CheckIcon className="h-6 w-5 flex-none text-success" />
                      {feature}
                    </li>
                  ))}
                  {tier.features.excluded.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <XMarkIcon className="h-6 w-5 flex-none text-error" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-8 py-2 flex flex-col">
                  <ButtonCheckout priceId={tier.priceId} />
                  <span className="text-sm mt-2 text-gray-600">
                    Pay once. Keep it forever.
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
