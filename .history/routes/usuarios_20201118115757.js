const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioControllers');
const { check } = require('express-validator');

router.post('/', 
   usuarioController.nuevoUsuario
);

module.exports = router;