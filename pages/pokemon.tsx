import Link from "next/link";

export default function Pokemon() {
  return (
    <main className="px-8">
      <header className="flex w-full pt-12">
        <Link href={"/"} className="w-[10%]">
          {"<"} voltar
        </Link>

        <div className="w-[90%] grid gap-1 text-center">
          <div className="text-3xl">NAME**</div>
          <div>NUMBER**</div>
        </div>
      </header>

      <section className="bg-gray-200 rounded-xl mt-6">
        <div className="text-center p-4">IMG**</div>
      </section>

      <section className="py-4">SWIPER INFO**</section>

      <section>MEGA EVO IMG**</section>

      <section className="py-4 grid gap-1">
        <div className="text-md font-medium">Mega Evolution</div>
        <div className="text-md">Info of pokemon text</div>
      </section>
    </main>
  );
}
