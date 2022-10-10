import axios from "axios";
import {useState} from "react";
import './style.css';

const ListarPokemonsComponent = () => {
    const [pokemons, setPokemons] = useState([{}]);

    const [objImgPokemons, setObjImgPokemons] = useState([{}]);

    const listarPokemons = async () => {
        const result = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=100");

        const arrayPokemons: Array<object> = [];

        for (const objPokemon of result.data.results) {
            const result2 = await axios.get(objPokemon.url);

            arrayPokemons.push({
                ...objPokemon,
                experiencia: result2.data.base_experience
            });
        }

        setPokemons(arrayPokemons);
    };

    const listarImgPokemons = () => {
        const arrayImgs: Array<object> = [];

        console.log("pokemons => ", pokemons)

        pokemons.forEach((pokemon: any, index: number) => {
            const nomePokemon = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);

            arrayImgs.push({
                nome: nomePokemon,
                img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`,
                experiencia: pokemon.experiencia,
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
                        <div className="card shadow-sm col-2">
                            <div className="card-body shadow">
                                <img key={index} src={objPokemon.img} title={objPokemon.nome} alt={objPokemon.nome} />
                            </div>
                            <div className="card-body">
                                <p className="card-text"><b>{objPokemon.nome}</b></p>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-success">View</button>
                                        <button type="button" className="btn btn-primary">Edit</button>
                                    </div>
                                    <small><b>XP: {objPokemon.experiencia}</b></small>
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
