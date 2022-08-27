import axios from "axios";
import { useState, useEffect } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
  } from "react-router-dom";

import "./Movie.css"

function Movie(){
    let { id } = useParams();

    const [film, setFlim] = useState([]);
   

    useEffect(()=>{
        async function getMovie(){
            const movieContent= await axios.get(`https://www.omdbapi.com/?apikey=7acabdde&i=${id}`);
            console.log("movieContent",movieContent.data);
            setFlim(movieContent.data);
        }
        getMovie();
},[])


    return (
        <div className="movie_parent">
            <h2 className="mb-4">{film.Title}</h2>
            <img id={film.imdbID} src={film.Poster} />
            <p className="my-2"><b>Actors:</b> {film.Actors}</p>
            <p className="my-2"><b>Genre:</b> {film.Genre}</p>
            <p className="my-2"><b>Director:</b> {film.Director}</p>
            <p className="my-2"><b>IMBD rating:</b> {film.imdbRating} <i className="bi bi-star-fill"></i></p>

            <p className="my-2"><b>Released Date:</b> {film.Released} <i class="bi bi-calendar3"></i></p>
            <p className="movie_desc">{film.Plot}</p>
        </div>
    )
}

export default Movie