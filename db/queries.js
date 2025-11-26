import { pool } from "./pool.js";

async function getAllGenres() {
    const { rows } = await pool.query('SELECT g.id , g.name FROM genre g ');
    return rows;
}

async function getAllGamesFromGenre(genreId) {
    const { rows } = await pool.query('SELECT g.id, g.name FROM game g LEFT JOIN game_genre gg ON gg.game_id = g.id WHERE gg.genre_id = $1', [genreId]);
    return rows;
}

async function getGenre(genreId) {
    const { rows } = await pool.query('SELECT g.id , g.name, g.description FROM genre g WHERE g.id = $1', [genreId]);
    return rows[0];
}

async function getGame(gameId) {
    const { rows } = await pool.query('SELECT g.id, g.name, g.description, g.release_date, g.price FROM game g WHERE g.id = $1', [gameId]);
    return rows[0];
}

async function getGameGenres(gameId) {
    const { rows } = await pool.query('SELECT gg.genre_id FROM game_genre gg WHERE gg.game_id = $1', [gameId]);
    return rows;
}

async function addGenre(name, description) {
    await pool.query('INSERT INTO genre (name, description) VALUES ($1, $2)',[name, description]);
}

async function addGame(name, description, release_date, price, genres) {
    const { rows } = await pool.query('INSERT INTO game (name, description, release_date, price) VALUES ($1, $2, $3, $4) RETURNING id', [name, description, release_date, price]);
    const gameId = rows[0].id;
    genres.forEach(async genreId => {
        console.log(genreId)
        await pool.query('INSERT INTO game_genre (game_id, genre_id) VALUES ($1, $2)',[gameId, genreId]);
    });
    return gameId;
}

async function updateGenre(genreId, name, description) {
    await pool.query('UPDATE genre SET name=$1, description=$2 WHERE id= $3',[ name, description, genreId ]);
}

async function updateGame(gameId, name, description, release_date, price, genres) {
    await pool.query('UPDATE game SET name=$1, description=$2, release_date=$3, price=$4 WHERE id= $5',[ name, description, release_date, price, gameId]);
    await pool.query('DELETE FROM game_genre WHERE game_id = $1', [gameId]);
    genres.forEach(async genreId => {
        await pool.query('INSERT INTO game_genre (game_id, genre_id) VALUES ($1, $2)',[gameId, genreId]);
    });
}

async function deleteGenre(genreId) {
    await pool.query('DELETE FROM genre WHERE id = $1',[genreId]);
}

async function deleteGame(gameId) {
    await pool.query('DELETE FROM game WHERE id = $1',[gameId]);
}

export const db = {
    getAllGenres,
    getAllGamesFromGenre,
    getGame,
    getGenre,
    getGameGenres,
    addGenre,
    addGame,
    updateGenre,
    updateGame,
    deleteGenre,
    deleteGame,
}