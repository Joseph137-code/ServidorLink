const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: 'variables.env'});

exports.autenticarUsuario = async (req, res, next) => {

    // Buscar el usuario para ver si esta registrado
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    // console.log(usuario);

    if (!usuario) {
        res.status(401).json({ msg: 'El Usuario No Existe' });
        return next();
    }

    // Verificar el password y autenticar el usuario
    if (bcrypt.compareSync(password, usuario.password)) {
        // Crear JWT
        const token = jwt.sign({
            id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email
        }, process.env.SECRETA, {
            expiresIn: '8h'
        });

        res.json({ token })

    } else {
        res.status(401).json({ msg: "Password Incorrecto" });
        return next();
    }

}

exports.usuarioAutenticado = (req, res, next) => {
    //res.json({usuario: req.usuario } );
}