import { db } from "../db/queries.js";

export async function getGame(req,res) {
    const { gameId } = req.params;
    const game = await db.getGame(gameId);
    res.render('game', { game: game }) 
}

export async function createGameGet(req, res) {
    const genres = await db.getAllGenres();
    res.render('createGame', {genres: genres});
}

export async function createGamePost(req, res) {
    const { name, description, release_date, price } = req.body;
    let genres = req.body.genres || [];
    genres = Array.isArray(genres)? genres : [genres];

    const gameId = await db.addGame(name, description, release_date, price, genres);
    res.redirect(`/game/${gameId}`);
}

export async function updateGameGet(req, res) {
    const { gameId } = req.params;
    const genres = await db.getAllGenres();
    const game = await db.getGame(gameId);
    const rows = await db.getGameGenres(gameId);
    const selectedGenres = rows.map(r => r.genre_id);
    console.log(selectedGenres);

    game.release_date = new Date(game.release_date);
    game.release_date = game.release_date.toISOString().split("T")[0];

    res.render('updateGame', {game: game, genres: genres, selectedGenres: selectedGenres});
}


export async function updateGamePost(req, res) {
    const { gameId } = req.params;
    const { name, description, price } = req.body;
    let genres = req.body.genres || [];
    genres = Array.isArray(genres)? genres : [genres];
    let releaseDateString = req.body.release_date;
    console.log(releaseDateString);
    let release_date = new Date(releaseDateString);
    release_date = release_date.toISOString().split("T")[0];
    await db.updateGame(gameId, name, description, release_date, price, genres);

    res.redirect(`/game/${gameId}`);
}


export async function deleteGame(req, res) {
    const { gameId } = req.params;
    await db.deleteGame(gameId);
    res.redirect(`/`);
}