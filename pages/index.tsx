// Other imports
import axios from "axios";

// NextJS imports
import Link from "next/link";

export default function Home() {
  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=50")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <main className="px-8">
      <header>
        <h1 className="text-5xl font-semibold py-6 mt-6">Pokédex</h1>

        <div className="leading-normal text-lg">
          Search for a Pokémon by name or using its National Pokédex number.
        </div>

        <div className="flex gap-4 w-full py-6">
          <div className="w-[80%] bg-zinc-100 p-5 rounded-2xl">
            **Search Engine
          </div>
          <div className="w-[20%] bg-gray-500 p-5 rounded-2xl">ICON</div>
        </div>
      </header>

      <section className="py-4">
        {[1, 2, 3, 4, 5].map((item, key) => (
          <div key={key}>
            <div className="flex gap-4">
              <Link
                href={"/pokemon"}
                className="w-full my-2 bg-gray-200 rounded-2xl p-4 text-center"
              >
                <div className="">IMG**</div>

                <div className="py-1">NAME</div>
                <div>NUMBER</div>
              </Link>

              <Link
                href={"/pokemon"}
                className="w-full my-2 bg-gray-200 rounded-2xl p-4 text-center"
              >
                <div className="">IMG**</div>

                <div className="py-1">NAME</div>
                <div>NUMBER</div>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
function fetchData() {
  throw new Error("Function not implemented.");
}
