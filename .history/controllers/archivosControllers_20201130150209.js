const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
const Enlaces = require('../models/Enlaces');

exports.subirArchivo = async (req, res, ) => {

    const configuracionMulter = {
        limits : { fileSize : req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
        storage: fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname+'/../uploads')
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
                cb(null, `${shortid.generate()}${extension}` );
            }
        })
    }
    const upload = multer(configuracionMulter).single('archivo');
    
    upload( req, res, async (error) => {
        console.log(req.file);

        if(!error) {
            res.json({archivo: req.file.filename });
        } else {
            console.log(error);
            return next();
        }
    });
}

exports.eliminarArchivo = async (req, res ) => {
    console.log(req.archivo)
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
        console.log('Archivo Eliminado');
    } catch (error) {
        console.log(error);
    }
}

exports.descargar = async (req, res ) => {
    const enlace = await Enlaces.findOne({nombre: req.params.archivo})


    const archivo = __dirname + `/../uploads/` + req.params.archivo;
    res.download(archivo);

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