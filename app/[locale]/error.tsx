"use client";
import { Link } from "@/i18n/routing";
import { ArrowLongLeftIcon, ArrowPathIcon } from "@heroicons/react/20/solid";

// Error boundary wrapper. Learn more here: https://nextjs.org/docs/app/building-your-application/routing/error-handling
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center text-center gap-6 p-6">
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm text-red-800">
              Uh-oh! The gremlins are at it again. We&apos;re on it, promise! 🙈
            </h3>
            <div className="mt-2 text-sm text-red-700 font-medium">
              {error?.message}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center">
        <button className="btn btn-ghost mt-2 md:mt-0" onClick={reset}>
          <ArrowPathIcon className="w-5" />
          Refresh
        </button>
        <Link href="/" className="btn btn-primary group">
          <ArrowLongLeftIcon className="w-5" />
          Go back home
        </Link>
      </div>
    </main>
  );
}
