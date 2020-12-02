const express = require ("express");
const conectarDB = require("../NodeServidor/config/db");

//Crear el Servidor 
    const app = express();

//Conectar a la Base de Datos
conectarDB();

//Puerto de la app
    const port = process.env.PORT || 4000;

//Iniciar la app
    app.listen(port, "0.0.0.0", ()=>{
        console.log("Conectado...")
    });

