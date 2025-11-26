import { Router } from "express";
import { getAllGenres } from "../controllers/homeController.js";

export const homeRouter = Router();

homeRouter.get('/', getAllGenres);


