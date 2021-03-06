const express = require('express');
const router = express.Router();
const enlacesController = require("../controllers/enlacesControllers");
const archivosControllers = require('../controllers/archivosControllers');
const { check } = require('express-validator');
const auth = require('../middleware/auth');

router.post('/',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty()
    ],      
    auth,
    enlacesController.nuevoEnlace
);

router.get('/:url',
    enlacesController.obtenerEnlace,
    archivosControllers.eliminarArchivo
);

/*router.get('/',
    enlacesController.todosEnlaces
);

router.post('/:url', 
    enlacesController.verificarPassword,
    enlacesController.obtenerEnlace
);*/

module.exports = router;