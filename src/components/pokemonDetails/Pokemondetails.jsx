// import pokemon from "../pokemon/pokemon";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect,useState } from "react";
import './pokemondetails.css';

function Pokemondetails() {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState({});
    async function downloadPokemon() {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // console.log(response.data)
        setPokemon({
            name: response.data.name,
            image: response.data.sprites?.other?.dream_world?.front_default ||
                   response.data.sprites?.front_default ||
                response.data.sprites?.front_shiny,
            weight: response.data.weight,
            height: response.data.height,
            types: response.data.types.map(typeInfo => typeInfo.type.name),
            id: response.data.id
        })
    };
    useEffect(() => { downloadPokemon() }, []);
    console.log(id);
    return (
        <>
            <div className="pokemon-details-wrapper">
                <img className="pokemon-detail-image" src={pokemon.image} />
                <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
                <div className="pokemon-details-name">Weight: {pokemon.weight}</div>  
                <div className="pokemon-details-name">Height:{pokemon.height}</div>
                <div className="pokemon-details-types">
               {pokemon.types?.map((t) => <div key={t}>{t}</div>)}
                <div className="pokemon-detail-id">ID:{pokemon.id}</div> 
                </div>
            </div>

        </>
       
    );
}

export default Pokemondetails;