import Link from "next/link";

type PokemonCardProps = {
  name: string;
  image: string;
  id: number;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, id }) => {
  return (
    <Link
      href={`/pokemon/${name}`} // rota para página individual de cada pokemon
      className="my-2 bg-gray-200 rounded-2xl p-4 text-center grid"
    >
      <img
        src={image}
        alt={name}
        className="mx-auto"
        width={500}
        height={500}
      />
      <h3 className="text-lg font-semibold text-center">{name}</h3>

      <div className="text-sm font-light">{id}</div>
    </Link>
  );
};

export default PokemonCard;
