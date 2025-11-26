import { Router } from "express";
import { getGame, createGameGet, createGamePost, updateGameGet, updateGamePost, deleteGame} from "../controllers/gameControler.js";

export const gameRouter = Router();

gameRouter.get('/new', createGameGet );

gameRouter.post('/new', createGamePost );


gameRouter.get('/:gameId', getGame);

gameRouter.get('/:gameId/update', updateGameGet );

gameRouter.post('/:gameId/delete', deleteGame );