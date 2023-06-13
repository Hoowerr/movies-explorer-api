const movieRouter = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../utils/validation');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidation, createMovie);
movieRouter.delete('/:_id', deleteMovieValidation, deleteMovie);
module.exports = movieRouter;
