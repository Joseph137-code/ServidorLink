const express = require ("express");

//Crear el Servidor 
    const app = express();

    console.log("comenzando")

//Puerto de la app
    const port = process.env.PORT || 4000;

//Iniciar la app
    app.listen(port, "0.0.0.0", ()=>{
        console.log("Conectado... en el puerto ${port}")
    });

