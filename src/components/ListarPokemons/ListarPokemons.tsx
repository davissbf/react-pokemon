import axios from "axios";
import {useState} from "react";

import "./style.css";

const ListarPokemonsComponent = () => {
    const [pokemons, setPokemons] = useState([]);

    const [objImgPokemons, setObjImgPokemons] = useState([{}]);

    const listarPokemons = async () => {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=20");

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
        <div className="DivPrincipal">
            <div className="DivImg">
                {
                    objImgPokemons.map((objPokemon: any, index: number) => (
                        <img className="ImgPokemon" key={index} src={objPokemon.img} alt={objPokemon.nome} />
                    ))
                }
            </div>
            <div className="DivBotao">
                <button className="ButaoListarPokemon" onClick={listarPokemons}>Listar Pokemons</button>
                <button className="ButaoListarImgPokemon" onClick={listarImgPokemons}>Listar Img Pokemons</button>
            </div>
        </div>
    )
};

export default ListarPokemonsComponent;
