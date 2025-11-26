import express from "express";
import { fileURLToPath } from "url";
import path from "path";

import { homeRouter } from "./routes/homeRouter.js";
import { genreRouter } from "./routes/genreRouter.js";
import { gameRouter } from "./routes/gameRouter.js";
//Getting __dirname
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', homeRouter);
app.use('/genre', genreRouter);
app.use('/game', gameRouter);

app.listen(3000, (error)=>{
    if(error){
        throw error;
    }
    console.log('My first Express App');
})