import { createPool } from "mysql2/promise"; // pool: conjunto de conexiones que podemos utilizar facil,emte

import {
    DB_HOST, 
    DB_PORT, 
    DB_DATABASE, 
    DB_USER, 
    DB_PASSWORD
} from './config.js'



//objeto de conexion
export const pool = createPool({
    host: DB_HOST,
    port: DB_PORT,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    
})

// const [rows, fields] = await pool.query('SELECT * FROM test');
// console.log(rows);