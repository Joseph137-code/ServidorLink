const express = require('express');
const router = express.Router();
const archivosController = require('../controllers/archivosControllers');
const auth = require('../middleware/auth');

router.post('/',
    auth,
    archivosController.subirArchivo
);

module.exports = router;