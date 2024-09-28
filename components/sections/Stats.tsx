const stats = [
  {
    name: "To Launch",
    value: "30 min",
  },
  {
    name: "Hours Saved",
    value: "100+",
  },
  {
    name: "Happy Users",
    value: "1,200",
  },
  {
    name: "Support",
    value: "24/7",
  },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-screen-xl pb-12 px-8">
      <dl className="mg-6 grid grid-cols-1 lg:grid-cols-4 gap-4 divide-y divide-gray-100 sm:mt-8 sm:grid-cols-2 sm:divide-x sm:divide-y-0">
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col px-4 py-8 text-center">
            <dd className="text-4xl font-extrabold text-primary/80 md:text-5xl">
              {stat.value}
            </dd>

            <dt className="text-lg font-medium text-content pt-2">
              {stat.name}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
