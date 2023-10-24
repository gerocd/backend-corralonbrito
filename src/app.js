// TODA LA CONFG DE EXPRESS

import express from "express";
import indexRoutes from './routes/index.routes.js';

// import { PORT } from "./config.js"; 

const app = express()

app.use(express.json())
app.use(indexRoutes)

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ------------------ Not Found Error --------------------------------
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint no fue encontrado, verifique la direccion http:// '
    })
})

export default app;