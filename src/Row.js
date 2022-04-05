import React, { useEffect, useState } from "react";
import './Row.css';
import axios from "./axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
const base_url = "https://image.tmdb.org/t/p/original";
const Row = ({ title, fetchUrl,isLargeRow }) => {
  const [movies, setmovies] = useState([]);
  const [trailerUrl,setTrailerurl]=useState('');
  useEffect(() => {
    async function fetchdata() {
      const request = await axios.get(fetchUrl);
      setmovies(request.data.results);
      //    console.log(request)
    }
    fetchdata();
  }, [fetchUrl]);
  // console.log(movies)
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  const handleClick=(movie)=>{
        if(trailerUrl){
          setTrailerurl('');
        }
        else{
          movieTrailer(movie?.name || "")
          .then((url)=>{
              const urlParams=new URLSearchParams(new URL(url).search);
              setTrailerurl(urlParams.get('v'))
          }).catch((error)=>console.log(error))
        }
  }
  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row__posters">
          {movies.map((movie) => (
            //  console.log(movie.backdrop_path)
            <img key={movie.id} onClick={()=>handleClick(movie)} className={`row__poster ${isLargeRow && "row__posterLarge"}`} src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} alt={movie.name} />
          ))}
        </div>
        {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </>
  );
};
export default Row;
