import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";

function Banner(){
    const [movie,setMovie]=useState([]);
    useEffect(()=>{
        async function fetchdata(){
          const request=await axios.get(requests.fetchNetflixOriginals);
          setMovie( request.data.results[
              Math.floor(Math.random()*request.data.results.length)
          ])
          return request;
        }
        fetchdata();
    }, [])
    console.log(movie)
    return (<>
          <header className="banner"
              style={
                {
                  backgroundSize:'cover',
                  backgroundImage:`url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
                  backgroundPosition:'center center'
                }
              }
          >
               <div className="banner__contents">
                    <h1>
                        {movie?.title || movie?.name || movie?.original_name}  
                    </h1>  
              </div>  
          </header>
        </>)
}
export default Banner;