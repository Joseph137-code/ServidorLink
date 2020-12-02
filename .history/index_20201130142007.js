const express = require ("express");
const conectarDB = require("../NodeServidor/config/db");
const cors = require ("cors")


//Crear el Servidor 
const app = express();

//Conectar a la Base de Datos
conectarDB();

//Habilitar Cors
const opcionesCors ={
    origin = process.env.FRONTEND_URL
}
app.use(cors(opcionesCors));

//Puerto de la app
const port = process.env.PORT || 4000;

//Leer los Valores del Body
app.use(express.json());

//habiliar Carpeta publica
app.use(express.static(`uploads`));

//Rutas de la App
    app.use("/api/usuarios", require("./routes/usuarios"));
    app.use("/api/auth", require("./routes/auth"));
    app.use("/api/enlaces", require("./routes/enlaces"));
    app.use("/api/archivos", require("./routes/archivos"));


//Iniciar la app
    app.listen(port, "0.0.0.0", ()=>{
        console.log("Conectado...")
    });

