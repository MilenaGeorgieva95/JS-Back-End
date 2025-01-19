import movies from "../../movies.js";
import { v4 as uuid } from 'uuid';

function getAllMovies(){
  return movies;
}

function findMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function getStars(rating) {
  let stars = [];
  for (let i = 0; i < Math.round(Number(rating)); i++) {
    stars.push(1);
  }
  return stars;
}

function checkMovieData(data){
    const {title:name, category, genre, director, year, imageUrl, rating, description} = data;
    //TODO: input data checks
    const movie={name, category, genre, director, year, imageUrl, rating, description}
    movie.id = uuid();
    return movie;
}

function createMovie(movieData){
const movie=checkMovieData(movieData);
movies.push(movie);
return movie.id;
}

function findMovieByParams(movieParams){
const matchingMovies=[];
movies.forEach(el=>{
  if((el.name==movieParams.name||movieParams.name=='')&&(el.genre==movieParams.genre||movieParams.genre=='')&&(el.year==movieParams.year||movieParams.year==''))
    {matchingMovies.push(el)}});
return matchingMovies;
}

const movieServices = {
    getAllMovies, 
    findMovieById, 
    getStars,
    createMovie,
    findMovieByParams
 };

export default movieServices;
