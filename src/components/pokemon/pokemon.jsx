import './pokemon.css';
import { Link } from 'react-router-dom';

function pokemon({ name, image,id }) {
    return (
        <div className="pokemon">
            <Link to={`/pokemon/${id}`}>
                <div className="pokemon_name">{name}</div>
            <div><img  className="pokemon-image"src={image}></img></div>
            </Link>
            
        </div>
    )
    
}

export default pokemon;