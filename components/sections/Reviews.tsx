import { StarIcon as StarIconSolid } from "@heroicons/react/20/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import Image from "next/image";

const reviews = [
  {
    text: "I can't believe how much time this toolkit has saved me! I went from concept to a fully functional app in just a few hours. The pre-configured setup is a game-changer. Highly recommend!",
    rating: 5,
    name: "John Doe",
    title: "CEO, Company Inc.",
  },
  {
    text: "Our team loves the flexibility and support provided by the Team Plan. The collaboration tools and priority support have made all the difference in meeting our deadlines. Worth every penny!",
    rating: 4,
    name: "Jessica Doe",
    title: "Staff Engineer @ Company",
  },
  {
    text: "As a solo developer, the Hobby Plan was exactly what I needed. The core tools are powerful and easy to use, and the setup process was a breeze. Perfect for small projects!",
    rating: 5,
    name: "Jack Doe",
    title: "Entrepreneur",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="px-8 pt-8">
      <h2 className="text-left md:text-center text-4xl font-bold tracking-tight pt-12">
        What our users are saying
      </h2>
      <div className="pt-8">
        {reviews.map((review, i) => (
          <div key={i} className="pt-10">
            <Review
              text={review.text}
              name={review.name}
              rating={review.rating}
              title={review.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// review props
interface ReviewProps {
  text: string;
  rating: number;
  name: string;
  title: string;
}

function Review({ text, rating, name, title }: ReviewProps) {
  return (
    <figure className="mx-auto max-w-2xl shadow rounded-md p-4">
      <p className="sr-only">{rating} out of 5 stars</p>
      <div className="flex gap-x-1 text-primary">
        {Array.from({ length: rating }).map((_, i) => (
          <StarIconSolid
            key={i}
            aria-hidden="true"
            className="h-4 w-4 flex-none"
          />
        ))}
        {Array.from({ length: 5 - rating }).map((_, i) => (
          <StarIconOutline
            key={i}
            aria-hidden="true"
            className="h-4 w-4 flex-none"
          />
        ))}
      </div>
      <blockquote className="mt-2 text-md  leading-6 tracking-tight">
        <p>“{text}”</p>
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-x-2">
        <Image
          alt={`${name} profile picture`}
          width={64}
          height={64}
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80"
          className="h-10 w-10 rounded-full border-2 border-gray-200"
        />
        <div className="text-sm leading-4">
          <div className="font-semibold text-gray-900">{name}</div>
          <div className="mt-0.5 text-gray-600">{title}</div>
        </div>
      </figcaption>
    </figure>
  );
}
