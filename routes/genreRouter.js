import { Router } from "express";
import { getAllGamesByGenre, createGenreGet, createGenrePost, updateGenreGet, updateGenrePost, deleteGenre } from "../controllers/homeController.js";

export const genreRouter = Router();

genreRouter.get('/new', createGenreGet );

genreRouter.post('/new', createGenrePost );


genreRouter.get('/:genreId', getAllGamesByGenre );

genreRouter.get('/:genreId/update', updateGenreGet );

genreRouter.post('/:genreId/update', updateGenrePost );

genreRouter.post('/:genreId/delete', deleteGenre );
