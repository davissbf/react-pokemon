import axios from "axios";
import {useState} from "react";

const ListarPokemonsComponent = () => {
    const [pokemons, setPokemons] = useState([]);

    const [objImgPokemons, setObjImgPokemons] = useState([{}]);

    const listarPokemons = async () => {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=3");

        setPokemons(result.data.results);
    };

    const listarImgPokemons = () => {
        const arrayImgs: Array<object> = [];

        pokemons.forEach((pokemon: any, index: number) => {
            arrayImgs.push({
                nome: pokemon.name,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
            });
        })

        setObjImgPokemons(arrayImgs);
    };

    return (
        <div>
            <div>
                {
                    objImgPokemons.map((objPokemon: any, index: number) => (
                        <img key={index} src={objPokemon.img} alt={objPokemon.nome} />
                    ))
                }
            </div>
            <div>
                <button onClick={listarPokemons}>Listar Pokemons</button>
                <button onClick={listarImgPokemons}>Listar Img Pokemons</button>
            </div>
        </div>
    )
};

export default ListarPokemonsComponent;
