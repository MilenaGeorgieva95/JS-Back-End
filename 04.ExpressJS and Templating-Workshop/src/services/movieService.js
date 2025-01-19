import movies from "../../movies.js";
import { v4 as uuid } from 'uuid';

function findMovieById(id) {
  return movies.find((movie) => movie.id === id);
}

function getStars(rating) {
  let stars = [];
  for (let i = 0; i < Math.round(rating); i++) {
    stars.push(1);
  }
  return stars;
}

function checkMovieData(data){
    const {title:name, category, genre, director, year, imageUrl, rating, description} = data;
    //TODO: input data checks
    const movie={name, category, genre, director, year, imageUrl, rating,description}
    movie.id = uuid();
    return movie;
}

function createMovie(movieData){
const movie=checkMovieData(movieData);
movies.push(movie);
return movie.id;
}

const movieServices = { 
    findMovieById, 
    getStars,
    createMovie
 };

export default movieServices;
