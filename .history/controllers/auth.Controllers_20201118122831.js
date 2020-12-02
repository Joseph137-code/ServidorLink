const Usuario = require('../models/Usuario');

exports.autenticarUsuario = async (req, res, next) => {
    console.log(req.body)
}

exports.usuarioAutenticado = (req, res, next) => {
    //res.json({usuario: req.usuario } );
}