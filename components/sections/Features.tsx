const features = [
  {
    name: "NextJS",
    description: "Pre-configured for fast, scalable web development",
    icon: "🧑‍💻",
  },
  {
    name: "Authentication",
    description: "Secure user login system built-in, with multiple providers.",
    icon: "🔐",
  },
  {
    name: "Database",
    description: "Integrated and ready for seamless data management.",
    icon: "📁",
  },
  {
    name: "Emails",
    description: "Ready email setup for communication and signups.",
    icon: "✉️",
  },
];

export default function Features() {
  return (
    <section className="bg-neutral text-neutral-content py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="mt-2 mb-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Everything you need to deploy your app
          </p>
          <p className="mx-auto text-lg opacity-90 leading-relaxed mt-8 mb-12 md:mb-20 text-base-content-secondary">
            From streamlined setup to effortless deployment. This toolkit equips
            you with all the essential tools, and integrations to bring your app
            from concept to launch with few clicks. No more juggling multiple
            resources!
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7">
                  <div className="absolute left-0 top-0 text-3xl flex h-12 w-12 items-center justify-center rounded-lg bg-base-content/5">
                    {feature.icon}
                  </div>
                  <span className="text-base-content text-primary-content">
                    {feature.name}
                  </span>
                </dt>
                <dd className="mt-1 leading-7 text-base-content-secondary">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
