// pages/pokemon/[slug].tsx

import { GetServerSideProps } from "next";
import Link from "next/link";

interface PokemonData {
  name: string;
  id: number;
  sprites: {
    front_default: string;
  };
  // outras propriedades para adicionar
}

interface PokemonProps {
  pokemonData: PokemonData;
}

export const getServerSideProps: GetServerSideProps<PokemonProps> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  const pokemonData: PokemonData = await response.json();

  return {
    props: {
      pokemonData,
    },
  };
};

export default function Pokemon({ pokemonData }: PokemonProps) {
  return (
    <main className="px-8">
      <header className="flex w-full pt-12">
        <Link href={"/"} className="w-[10%]">
          {"<"}
        </Link>

        <div className="w-[90%] grid gap-1 text-center">
          <div className="text-3xl">{pokemonData.name}</div>
          <div>{pokemonData.id}</div>
        </div>
      </header>

      <section className="bg-gray-200 rounded-xl mt-6">
        <div className="text-center py-2">
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="mx-auto"
            width={"200px"}
            height={"200px"}
          />
        </div>
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
