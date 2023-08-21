import { GetServerSideProps } from "next";
import { useState } from "react";

// React Icons
import { FaSearch } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";

// Components
import PokemonCard from "../src/components/pokemonCard";

interface PokemonData {
  name: string;
  image: string;
  imageBack: string;
  imageShiny: string;
  id: number;
  moves: string;
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
  const [searchTerm, setSearchTerm] = useState(""); // Estado para a barra de pesquisa
  const [searchResults, setSearchResults] = useState(repositories); // Estado para os resultados da pesquisa

  // Função para realizar a pesquisa
  const searchPokemon = async () => {
    const searchTermLower = searchTerm.toLowerCase();
    const results = repositories.filter(
      (pokemon) =>
        pokemon.name.toLowerCase().includes(searchTermLower) ||
        String(pokemon.id).includes(searchTermLower)
    );
    setSearchResults(results);
  };

  return (
    <main className="px-8">
      <header>
        <div>
          <h1 className="text-5xl font-semibold py-4 mt-8">Pokédex</h1>

          <div className="leading-8 text-lg font-light">
            search for a Pokémon by name or using its National Pokédex number.
          </div>

          <div className="flex gap-3 w-full py-6">
            <div className="flex w-[80%] bg-zinc-100 rounded-xl py-4">
              <div className="ml-4 my-auto text-xl">
                <FaSearch />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Name or number"
                className="w-full px-2 mx-2 py-1 rounded-lg bg-zinc-100
                focus:outline-none focus:border-transparent focus:ring-transparent focus:ring-1"
              />
            </div>
            <button
              onClick={searchPokemon}
              className="bg-slate-600 text-white rounded-xl px-4 text-3xl"
            >
              <LuSettings2 />
            </button>
          </div>
        </div>
      </header>

      <section className="py-4 grid grid-cols-2 gap-4">
        {/* Mapeamento dos resultados da pesquisa */}
        {searchResults.map((pokemon: PokemonData) => (
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
