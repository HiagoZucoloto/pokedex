import Link from "next/link";
import { getColorClass } from "./utils/colors";
// import Img from "../src/utils/imgBase";
// problemas ao usar a função <Img>

type PokemonCardProps = {
  name: string;
  image: string;
  id: number;
};

const PokemonCard: React.FC<PokemonCardProps> = ({ name, image, id }) => {
  const colorClass = getColorClass(id); // pegar a classe de cor com base no id

  return (
    <Link
      href={`/pokemon/${name}`}
      className={`rounded-2xl text-center ${colorClass}`} // Adicionar a classe de cor aqui
    >
      <img
        src={image}
        alt={name}
        className="mx-auto"
        width={"200px"}
        height={"200px"}
      />
      <h3 className="text-lg font-semibold text-slate-800 capitalize">
        {name}
      </h3>

      <div className="text-sm font-light">{id}</div>
      <div className="py-2"></div>
    </Link>
  );
};

export default PokemonCard;
