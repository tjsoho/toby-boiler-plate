import Link from "next/link";
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";

// Custom 404 page
// https://nextjs.org/docs/app/api-reference/file-conventions/not-found
export default function Custom404() {
  return (
    <main className="relative bg-base-100 text-base-content h-screen w-full flex flex-col justify-center gap-8 items-center p-10">
      <div className="text-center">
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-content sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-base-content">
          Oops! You&apos;ve wandered off the map. Let&apos;s get you back on
          track!
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/" className="btn btn-primary group">
            <ArrowLongLeftIcon className="w-5" />
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
