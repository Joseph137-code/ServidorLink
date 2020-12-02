const Enlaces = require('../models/Enlaces');
const shortid = require('shortid');

exports.nuevoEnlace = async (req, res, next) => {

    // Almacenar en la BD
    const{nombre_original, password}=req.body;

    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;
    enlace.password= password
    
    console.log(enlace)
}