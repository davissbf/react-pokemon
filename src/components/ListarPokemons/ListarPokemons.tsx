import axios from "axios";
import {useState} from "react";
import './style.css';

const ListarPokemonsComponent = () => {
    const [pokemons, setPokemons] = useState([]);

    const [objImgPokemons, setObjImgPokemons] = useState([{}]);

    const listarPokemons = async () => {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=50");

        console.log("result => ", result)

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
        <div className="container-fluid">
            <div className="container">
                <button onClick={listarPokemons} className="btn btn-primary">Listar Pokemons</button>
                <button onClick={listarImgPokemons} className="btn btn-primary">Listar Img Pokemons</button>
            </div>
            <div className="row">
                {
                    objImgPokemons.map((objPokemon: any, index: number) => (
                        <div className="card shadow-sm col-1">
                            <div className="card-body shadow">
                                <img key={index} src={objPokemon.img} title={objPokemon.nome} alt={objPokemon.nome} className="imgPokemon"/>
                            </div>
                            <div className="card-body">
                                <p className="card-text">{objPokemon.nome}</p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
};

export default ListarPokemonsComponent;
