import { GetServerSideProps } from "next";
import Link from "next/link";

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const swiperBar = [
  {
    form: "Forms",
    detail: "Details",
    type: "Types",
    stat: "Stats",
  },
];

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
          <div className="bg-gray-200 rounded-2xl">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={"100px"}
              height={"120px"}
            />
          </div>
          <div className="bg-gray-200 rounded-2xl">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={"100px"}
              height={"120px"}
            />
          </div>
          <div className="bg-gray-200 rounded-2xl">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              width={"100px"}
              height={"120px"}
            />
          </div>
        </div>
      </section>

      <section className="py-4 grid gap-1">
        <div className="text-md font-medium">Mega Evolution</div>
        <div className="text-md">Info of pokemon text</div>
      </section>
    </main>
  );
};

export default PokemonPage;
