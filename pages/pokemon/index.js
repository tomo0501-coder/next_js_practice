import { useState, useEffect} from 'react';
import axios from 'axios';
import styles from '../../styles/Home.module.css'
import Head from 'next/head'
import Image from 'next/image'

const POKEMON_LIST_URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";

const PokeList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get(POKEMON_LIST_URL)

      .then(res => {
        setPokemonList(res.data.results);
      }).catch(err => {
        console.log(err);
      }
      );
  }
  , []);
  const getIdFromUrl= (url) => {
    return url.split("/").slice(-2)[0]
  }



  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="Todo App" content="Made by Tomo!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>

        <h1 class="text-gray-800 font-bold" >ポケモン LIST</h1>
<div class="mt-32">
    <div class="px-4 sm:px-8 max-w-5xl m-auto">
        <ul class="border border-black-200 rounded overflow-hidden shadow-md">
        {pokemonList.map((pokemon, index) => {
            const pokemonId = getIdFromUrl(pokemon.url)
            return (
                <div key={index}>       
                <a href={`/pokemon/${pokemonId}`} aria-current="true" class="px-4 py-2 bg-white  border-black-200 text-black ">
                    {pokemon.name}
                </a>
                </div> 
            )
        })}           
        </ul>
        
    </div>
</div>
        </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default PokeList;