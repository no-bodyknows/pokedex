
// import { useEffect, useState } from "react";
// import axios from "axios";
// import "./PokemonList.css";
// import Pokemon from "../pokemon/pokemon.jsx";

// function PokemonList() {
//   const [PokemonListState, setPokeminListState] = useState({
//     pokemonList: [],
//     isLoading: true,
//     pokedex_url: "https://pokeapi.co/api/v2/pokemon/",
//     nextUrl: "",
//     prevUrl: "",
//   });

//   async function downloadPokemon() {
//     setPokeminListState({ ...PokemonListState, isLoading: true });
//     try {
//       const response = await axios.get(PokemonListState.pokedex_url);
//       const pokemonResults = response.data.results;

//       const pokemonResultPromise = pokemonResults.map((pokemon) =>
//         axios.get(pokemon.url)
//       );
//       const pokemonData = await axios.all(pokemonResultPromise);

//       const finalPokemonData = pokemonData.map((res) => {
//         const pokemon = res.data;
//         return {
//           name: pokemon.name,
//           image:
//             pokemon.sprites?.other?.dream_world?.front_default ||
//             pokemon.sprites?.front_default ||
//             pokemon.sprites?.front_shiny,
//           types: pokemon.types,
//           id: pokemon.id,
//         };
//       });

//       setPokeminListState({
//         ...PokemonListState,
//         pokemonList: finalPokemonData,
//         nextUrl: response.data.next,
//         prevUrl: response.data.previous,
//         isLoading: false,
//       });
//     } catch (error) {
//       console.error("Error fetching Pokemon data:", error);
//     }
//   }

//   useEffect(() => {
//     downloadPokemon();
//   }, [PokemonListState.pokedex_url]);

//   return (
//     <div className="pokemon-list-wrapper">
//       <h2>Pokemon List</h2>
//       <div className="pokemon-wrapper">
//         {PokemonListState.isLoading ? (
//           <p>Loading ....</p>
//         ) : (
//           PokemonListState.pokemonList.map((p) => (
//             <Pokemon
//               key={p.id}
//               name={p.name}
//               image={p.image}
//               types={p.types}
//               id={p.id}
//             />
//           ))
//         )}
//       </div>
//       <div className="controls">
//         <button
//           disabled={!PokemonListState.prevUrl}
//           onClick={() =>
//             setPokeminListState({
//               ...PokemonListState,
//               pokedex_url: PokemonListState.prevUrl,
//             })
//           }
//         >
//           Previous
//         </button>
//         <button
//           disabled={!PokemonListState.nextUrl}
//           onClick={() =>
//             setPokeminListState({
//               ...PokemonListState,
//               pokedex_url: PokemonListState.nextUrl,
//             })
//           }
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PokemonList;

import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../pokemon/pokemon.jsx";

function PokemonList() {
  const [PokemonListState, setPokeminListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedex_url: "https://pokeapi.co/api/v2/pokemon/",
    nextUrl: "",
    prevUrl: "",
  });

  async function downloadPokemon() {
    setPokeminListState(prev => ({ ...prev, isLoading: true }));

    try {
      const response = await axios.get(PokemonListState.pokedex_url);
      const pokemonResults = response.data.results;

      const pokemonData = await axios.all(
        pokemonResults.map(pokemon => axios.get(pokemon.url))
      );

      const finalPokemonData = pokemonData.map(res => {
        const pokemon = res.data;
        return {
          name: pokemon.name,
          image:
            pokemon.sprites?.other?.dream_world?.front_default ||
            pokemon.sprites?.front_default ||
            pokemon.sprites?.front_shiny,
          types: pokemon.types,
          id: pokemon.id,
        };
      });

      setPokeminListState(prev => ({
        ...prev,
        pokemonList: finalPokemonData,
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
        isLoading: false,
      }));
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, [PokemonListState.pokedex_url]);

  return (
    <div className="pokemon-list-wrapper">
      <h2>Pokemon List</h2>
      <div className="pokemon-wrapper">
        {PokemonListState.isLoading ? (
          <p>Loading ....</p>
        ) : (
          PokemonListState.pokemonList.map(p => (
            <Pokemon
              key={p.id}
              name={p.name}
              image={p.image}
              types={p.types}
              id={p.id}
            />
          ))
        )}
      </div>
      <div className="controls">
        <button
          disabled={!PokemonListState.prevUrl}
          onClick={() =>
            setPokeminListState(prev => ({
              ...prev,
              pokedex_url: prev.prevUrl,
            }))
          }
        >
          Previous
        </button>
        <button
          disabled={!PokemonListState.nextUrl}
          onClick={() =>
            setPokeminListState(prev => ({
              ...prev,
              pokedex_url: prev.nextUrl,
            }))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PokemonList;



