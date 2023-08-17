import { GetServerSideProps } from "next";

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
    <div>
      <h1>{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      {/* outras informações dos pokemons  */}
    </div>
  );
};

export default PokemonPage;
