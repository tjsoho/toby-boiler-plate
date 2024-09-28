export const dynamic = "force-dynamic";

// Page only for authenticated users
export default function MembersArea() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          Private area for logged in users
        </h1>
      </section>
    </main>
  );
}
