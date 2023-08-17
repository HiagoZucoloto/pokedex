import { GetServerSideProps } from "next";
import Link from "next/link";

interface PokemonDetail {
  name: string;
  image: string;
  id: number;
  // outras informações dos pokemons
}

interface PokemonProps {
  pokemon: PokemonDetail;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  if (!id) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();

  const pokemon: PokemonDetail = {
    name: data.name,
    image: data.sprites.front_default,
    id: data.id,
    // outras informações dos pokemons
  };

  return {
    props: {
      pokemon,
    },
  };
};

const PokemonPage: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    <main className="px-8">
      <header className="flex w-full pt-12">
        <Link href={"/"} className="w-[10%]">
          {"<"}
        </Link>

        <div className="w-[90%] grid gap-1 text-center">
          <div className="text-3xl">{pokemon.name}</div>
          <div>{pokemon.id}</div>
        </div>
      </header>

      <section className="bg-gray-200 rounded-xl mt-6">
        <div className="text-center py-2">
          <img
            src={pokemon.image}
            alt={pokemon.name}
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
};

export default PokemonPage;
