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
            name={pokemon.name}
            image={pokemon.image}
            id={pokemon.id}
          ></PokemonCard>
        ))}
      </section>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon/");
  const data = await response.json();

  const pokemonData: PokemonData[] = data.results.map(
    (result: { name: string; url: string }) => ({
      name: result.name,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
        result.url.split("/")[6]
      }.png`,
      id: parseInt(result.url.split("/")[6]),
    })
  );

  return {
    props: {
      repositories: pokemonData,
    },
  };
};
