import { GetServerSideProps } from "next";
import Link from "next/link";

// React Icons
import { BsArrowLeftShort } from "react-icons/bs";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// components
import { getColorClass } from "../../src/components/utils/colors";
// import Img from "../../src/utils/imgBase";
// problemas ao usar a função <Img>

const swiperBar = [
  {
    form: "Forms",
    detail: "Details",
    type: "Types",
    stat: "Stats",
  },
];

interface PokemonDetail {
  moves: any;
  name: string;
  image: string;
  imageBack: string;
  imageShiny: string;
  id: number;
}

interface PokemonProps {
  pokemon: PokemonDetail;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug;

  if (!slug) {
    return {
      notFound: true,
    };
  }

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${slug}`);
  const data = await response.json();

  const pokemon: PokemonDetail = {
    name: data.name,
    image: data.sprites.front_default,
    imageBack: data.sprites.back_default,
    imageShiny: data.sprites.front_shiny,
    id: data.id,
    moves: data.moves,
  };

  return {
    props: {
      pokemon,
    },
  };
};

const PokemonPage: React.FC<PokemonProps> = ({ pokemon }) => {
  const colorClass = getColorClass(pokemon.id);
  return (
    <main className="px-8">
      <header className="flex w-full pt-12">
        <Link href={"/"} className="w-[10%] text-4xl">
          <BsArrowLeftShort />
        </Link>

        <div className="w-[90%] grid gap-1 text-center">
          <div className="text-3xl font-medium capitalize">{pokemon.name}</div>
          <div>{pokemon.id}</div>
        </div>
      </header>

      <section className={`${colorClass} rounded-xl mt-6`}>
        <div className="text-center py-2">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="mx-auto object-cover w-full h-full"
            width={"500px"}
            height={"500px"}
          />
        </div>
      </section>

      <section className="py-4">
        {swiperBar.map((item, key) => (
          <Swiper
            key={key}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              460: {
                slidesPerView: 3,
                spaceBetween: 4,
              },
              650: {
                slidesPerView: 4,
                spaceBetween: 8,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 16,
              },
            }}
            className="mySwiper pr-40"
          >
            <SwiperSlide>
              <div className="text-lg font-semibold">{item.form}</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-lg font-semibold">{item.detail}</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-lg font-semibold">{item.type}</div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-lg font-semibold">{item.stat}</div>
            </SwiperSlide>
          </Swiper>
        ))}
      </section>

      <section>
        <div className="flex gap-4">
          <div className={`${colorClass} rounded-2xl`}>
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={"100px"}
              height={"120px"}
            />
          </div>
          <div className={`${colorClass} rounded-2xl`}>
            <img
              src={pokemon.imageBack}
              alt={pokemon.name}
              width={"100px"}
              height={"120px"}
            />
          </div>
          <div className={`${colorClass} rounded-2xl`}>
            <img
              src={pokemon.imageShiny}
              alt={pokemon.name}
              width={"100px"}
              height={"120px"}
            />
          </div>
        </div>
      </section>

      <section className="py-4 grid gap-1">
        <ul>
          <div className="text-lg font-medium">Seus principais ataques:</div>
          {pokemon.moves
            .slice(0, 4)
            .map((move: { move: { name: string } }, index: number) => (
              <li key={index} className="text-lg">
                {">"} {move.move.name}
              </li>
            ))}
        </ul>
      </section>
    </main>
  );
};

export default PokemonPage;
