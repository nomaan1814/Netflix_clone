import React, { useEffect, useState } from "react";
import './Row.css';
import axios from "./axios";
const base_url = "https://image.tmdb.org/t/p/original";
const Row = ({ title, fetchUrl,isLargeRow }) => {
  const [movies, setmovies] = useState([]);
  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      //    console.log(request)
    }
    fetchdata();
  }, [fetchUrl]);
  // console.log(movies)
  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => (
            //  console.log(movie.backdrop_path)
            <img key={movie.id} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />
          ))}
        </div>
      </div>
    </>
  );
};
export default Row;
