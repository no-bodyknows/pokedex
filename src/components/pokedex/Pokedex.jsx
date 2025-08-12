import PokemonList from '../Pokemonlist/Pokemonlist.jsx';
import Search from '../Search/Search.jsx';
import './Pokedex.css';

function Pokedex() {
    return (
        <>
            <div className="pokedex-wrapper">
                
                <Search /> 
                <PokemonList />
            </div>

        </>
    ) 
}



export  default Pokedex;