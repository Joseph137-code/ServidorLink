const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosControllers');
const auth = require('../middleware/auth');

//Subid de Archivos
const multer = require("multer");
const upload = multer({dest: "../uploads/"})

router.post('/',
    upload.single("archivo"),
    auth,
    archivosController.subirArchivo
);

router.delete('/:id', 
    //archivosController.descargar,
    archivosController.eliminarArchivo,
);

module.exports = router;