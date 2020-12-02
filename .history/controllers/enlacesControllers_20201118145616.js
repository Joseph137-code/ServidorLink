const Enlaces = require('../models/Enlaces');
const shortid = require('shortid');

exports.nuevoEnlace = async (req, res, next) => {

    // crear un objeto de enlace
    const{nombre_original, password}=req.body;

    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = shortid.generate();
    enlace.nombre_original = nombre_original;
    enlace.password= password

    // Almacenar en la BD
    try {
        await enlace.save();
        return res.json({ msg : `${enlace.url}` });
        next();
    } catch (error) {
        console.log(error);
    }
}