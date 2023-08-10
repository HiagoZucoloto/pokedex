import Link from "next/link";

type PokemonCard = {
  name: string;
};

export default function PokemonCard({ name } = PokemonCard) {
  return (
    <Link
      href={"/pokemon"}
      className="my-2 bg-gray-200 rounded-2xl p-4 text-center grid gap-1"
    >
      <div className="">IMG**</div>

      <div className="py-1">{name}</div>
      <div>NUMBER</div>
    </Link>
  );
}
