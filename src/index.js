import { render } from "react-dom";
import axios from "axios";
import Movie from "./Movie";
import { useState, useEffect } from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    Routes
  } from "react-router-dom";

import "./index.css"


function App(){

    const [movieName, setMovieName] = useState("");
    const [movies, setMovies] = useState([]);

    const searchMovie = (event) =>{
        setMovieName(event.target.value)
    }

    const getMovie = async () => {
        const movieData = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=f189fd5&s=${movieName}`);
        // const movieData = await axios.get(`http://www.omdbapi.com/?i=tt3896198&apikey=f189fd5&s=batman`);

        setMovies(movieData.data.Search);
        console.log(movieData.data.Search); 
    }

    const redirectHandler=(event)=>{
        console.log(event.target.id);
    }
    
    const handleKeyPress =()=>{
        
    }

    return (
    <div>
        <div className="navbarS">
            <input type="text" placeholder="Search Movies" onChange={searchMovie} onKeyPress={handleKeyPress}/>
            <button className="getMovieBtn" onClick={getMovie}>Search</button>
        </div>
        <div className="d-flex flex-wrap">
            {
                movies.map((movie) => {
                    return <div className="d-flex flex-column mx-2 my-4 px-5 justify-content-center align-items-center"> 
                        <img id={movie.imdbID} src={movie.Poster} onClick={redirectHandler}/>
                        {/* <h2>{movie.Title}</h2> */}
                        <Link className="my-2 text-dark movieName" to={"/movie/"+movie.imdbID}>{movie.Title}</Link>

                    </div>
                })
            }
        </div>
    </div>)
}

render(<BrowserRouter>
<Routes>
    <Route path="/" element={<App/>}></Route>
    <Route path="/movie/:id" element={<Movie/>}></Route>
</Routes>
</BrowserRouter>, document.getElementById("root"));


