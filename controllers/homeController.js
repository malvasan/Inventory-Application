import { db } from "../db/queries.js";

export async function getAllGenres(req, res) {
    const genres = await db.getAllGenres();
    console.log('Genres:', genres);
    res.render('home', {genres: genres});
}

export async function getAllGamesByGenre(req, res) {
    const {genreId} = req.params;
    const games = await db.getAllGamesFromGenre(genreId);
    console.log('games:', games);
    res.render('gamesByGenre', {games: games});
}

export function createGenreGet(req, res) {
    res.render('createGenre', {});
}

export async function createGenrePost(req, res) {
    const { name, description } = req.body;
    await db.addGenre(name, description);
    res.redirect(`/`);
}

export async function updateGenreGet(req, res) {
    const { genreId } = req.params;
    const genre = await db.getGenre(genreId);
    res.render('updateGenre', {genre: genre});
}

export async function updateGenrePost(req, res) {
    const { genreId } = req.params;
    const { name, description } = req.body;
    await db.updateGenre(genreId, name, description);
    res.redirect(`/`);
}

export async function deleteGenre(req, res) {
    const { genreId } = req.params;
    await db.deleteGenre(genreId);
    res.redirect(`/`);
}