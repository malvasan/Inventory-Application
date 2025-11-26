import { Pool } from "pg";

export const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    database: 'games_managment',
    password: 'manuel',
    port: 5432,
});