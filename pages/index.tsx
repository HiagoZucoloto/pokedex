import { GetServerSideProps } from "next";
import PokemonCard from "../components/pokemonCard";

interface PokemonData {
  name: string;
  image: string;
  id: number;
}

interface HomeProps {
  repositories: PokemonData[];
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();

  const pokemonDataPromises = data.results.map(
    async (result: { name: string; url: string }) => {
      const pokemonResponse = await fetch(result.url);
      const pokemonDetails = await pokemonResponse.json();
      return {
        name: result.name,
        image: pokemonDetails.sprites.front_default,
        id: pokemonDetails.id,
      };
    }
  );

  const pokemonData: PokemonData[] = await Promise.all(pokemonDataPromises);

  return {
    props: {
      repositories: pokemonData,
    },
  };
};

export default function Home({ repositories }: HomeProps) {
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

      <section className="py-4 grid grid-cols-2 gap-4">
        {repositories.map((pokemon: PokemonData) => (
          <PokemonCard
            key={pokemon.id}
            name={pokemon.name}
            image={pokemon.image}
            id={pokemon.id}
          ></PokemonCard>
        ))}
      </section>
    </main>
  );
}
