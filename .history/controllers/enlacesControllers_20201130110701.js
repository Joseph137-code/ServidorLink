const Enlaces = require('../models/Enlaces');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

exports.nuevoEnlace = async (req, res, next) => {
     // Revisar si hay errores
     const errores = validationResult(req);
    if(!errores.isEmpty()) {
         return res.status(400).json({errores: errores.array()});
    }

    // crear un objeto de enlace
    const{nombre_original, nombre}=req.body;

    const enlace = new Enlaces();
    enlace.url = shortid.generate();
    enlace.nombre = nombre;
    enlace.nombre_original = nombre_original;
    

    // Si el usuario esta autenticado
    if(req.usuario) {
        const { password, descargas } = req.body;

        // Asignar a enlace el número de descargas
        if(descargas) {
            enlace.descargas = descargas;
        }

        // asignar un password
        if(password) {
            const salt = await bcrypt.genSalt(10);
            enlace.password = await bcrypt.hash( password, salt );
        }

        // Asignar el autor
        enlace.autor = req.usuario.id
    }

    // Almacenar en la BD
    try {
        await enlace.save();
        return res.json({ msg : `${enlace.url}` });
        next();
    } catch (error) {
        console.log(error);
    }
}

//Obtener listo de todos enlace
exports.todosEnlaces = async (req, res, next) => {
    try {
        const enlace = await Enlaces.find({ }).select(`url`);
        res.json(enlace);
    } catch (error) {
        console.log(error)
    }
}


// Obtener el enlace
exports.obtenerEnlace = async (req, res, next) => {

    // console.log(req.params.url);
    const { url } = req.params;

    // Verificar si existe el enlace
    const enlace = await Enlaces.findOne({ url });

    if(!enlace) {
        res.status(404).json({msg: 'Ese Enlace no existe'});
        return next();
    }

    // Si el enlace existe
    res.json({archivo: enlace.nombre, password: false})

    const{descargas, nombre} = enlace;

    if(descargas === 1){
        //elimar Archivo
        req.archivo = nombre

        //Eliminar entrada de la base de Dato
        await Enlaces.findOneAndRemove(req.params.url);
        next()

    }else{
        
        enlace.descargas--;
        await enlace.save();
    }
}