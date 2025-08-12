
import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../pokemon/pokemon.jsx"; // ✅ Component name should be capitalized

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedex_url, setpokedex_url] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');
  async function downloadPokemon() {
    setIsLoading(true);
    try {
      
      const response = await axios.get(pokedex_url);
      const pokemonResults = response.data.results;
      console.log(response.data); // ✅ Log the results to see the data structure
      setNextUrl(response.data.next);
      setPrevUrl(response.data.previous);
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );

      const pokemonData = await axios.all(pokemonResultPromise);

      const finalPokemonData = pokemonData.map((res) => {
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

      setPokemonList(finalPokemonData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  }

  useEffect(() => {
    downloadPokemon();
  }, [pokedex_url]);

  return (
    <div className="pokemon-list-wrapper">
      <h2>Pokemon List</h2>
      <div className='pokemon-wrapper'>
      {isLoading ? (
        <p>Loading ....</p>
      ) : (
        pokemonList.map((p, ) => (
          <Pokemon key={p.id} name={p.name} image={p.image} types={p.types} id={p.id} />
        ))
      )}  
      </div>
      <div className='controls'>
        <button disabled={prevUrl == null} onClick={() => setpokedex_url(prevUrl)}>Previous</button>
        <button  disabled ={nextUrl == null}  onClick={() => setpokedex_url(nextUrl)}>Next</button>
      </div>
      
    </div>
  );
}

export default PokemonList;
