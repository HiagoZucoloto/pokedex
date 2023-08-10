// Other imports
import axios from "axios";

// NextJS imports
import { useEffect, useState } from "react";
import PokemonCard from "../components/pokemonCard";
import Pokemon from "./pokemon";

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  useEffect(() => {
    getPokemons();
  }, []);

  const getPokemons = () => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then((res) => setPokemons(res.data.results))
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
        {pokemons.map((pokemon, key) => (
          <div key={key}>
            <PokemonCard name={pokemon.name} />
          </div>
        ))}
      </section>
    </main>
  );
}
function fetchData() {
  throw new Error("Function not implemented.");
}
