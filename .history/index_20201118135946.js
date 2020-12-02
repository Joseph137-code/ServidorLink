const express = require ("express");
const conectarDB = require("../NodeServidor/config/db");


//Crear el Servidor 
    const app = express();
   

//Conectar a la Base de Datos
conectarDB();

//Puerto de la app
    const port = process.env.PORT || 4000;

//Leer los Valores del Body
app.use(express.json());

//Rutas de la App
    app.use("/api/usuarios", require("./routes/usuarios"));
    app.use("/api/auth", require("./routes/auth"));
    //app.use("/api/enlaces", require("./routes/enlaces"));


//Iniciar la app
    app.listen(port, "0.0.0.0", ()=>{
        console.log("Conectado...")
    });

