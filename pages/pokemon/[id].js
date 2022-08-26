

import React from "react";

const PokeDetailPage = ({ pokeData }) => {
  return (
    <div>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm dark:bg-white-800 dark:border-gray-700">
          <a>
            <img
              className="rounded-t-lg"
              src={pokeData.sprites.front_default}
              alt=""
              width={300} height={300} 
            />
          </a>
          <a>
            <img
              className="rounded-t-lg"
              src={pokeData.sprites.back_default}
              alt=""
              width={300} height={300} 
            />
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="text-black-900 font-bold text-2xl tracking-tight mb-2 dark:text-black">
                名前：{pokeData.name}
              </h5>
            </a>
            <ul className="font-normal text-black mb-3 dark:text-black">
              <li>重さ：{pokeData.weight}</li>
                <li>タイプ：{pokeData.types.map((type) => type.type.name)}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const pokeID = context.params.id;
  const POKEMON_DETAIL_URL = `https://pokeapi.co/api/v2/pokemon/${pokeID}/`;
  const res = await fetch(POKEMON_DETAIL_URL);
  // 404
    if (res.status === 404) {
        return {
            notFound: true
          };
    }
  const pokeData = await res.json();
  return { props: { pokeData } };
}

export default PokeDetailPage;