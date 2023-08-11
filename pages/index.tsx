import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "../components/pokemonCard";

// Definindo tipagem de dados retornado pela API
interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  id: number;
}

const Home: React.FC = () => {
  const [pokemons, setPokemons] = useState<PokemonData[]>([]); // Tipando o estado

  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      var endpoints = [];
      for (var i = 1; i < 11; i++) {
        endpoints.push(`https://pokeapi.co/api/v2/pokemon/${i}/`);
      }

      const responses = await axios.all(
        endpoints.map((endpoint) => axios.get(endpoint))
      );

      const pokemonData: PokemonData[] = responses.map((response) => ({
        name: response.data.name,
        sprites: response.data.sprites,
        id: response.data.id,
      }));

      setPokemons(pokemonData);
    } catch (error) {
      console.log(error);
    }
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

      <section className="py-4 grid grid-cols-2 gap-4">
        {pokemons.map((pokemon, key) => (
          <div key={key}>
            <PokemonCard
              name={pokemon.name}
              image={pokemon.sprites.front_default}
              id={pokemon.id}
            />
          </div>
        ))}
      </section>
    </main>
  );
};
export default Home;
