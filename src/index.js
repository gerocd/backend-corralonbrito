// ARRANQUE DE SIST

import app from "./app.js"
import { PORT } from "./config.js"

// INICIALIZACION
app.listen(PORT)
console.log("Server running on port", PORT)

