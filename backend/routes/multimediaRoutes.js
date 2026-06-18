const express = require('express');
const router = express.Router();
const controller = require('../controllers/multimediaController');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post(
  '/',
  upload.fields([
    { name: 'imagen' },
    { name: 'audio' }
  ]),
  controller.crear
);

router.get('/', controller.obtener);

router.put(
  '/:id',
  upload.fields([
    { name: 'imagen' },
    { name: 'audio' }
  ]),
  controller.actualizar
);

router.delete('/:id', controller.eliminar);

module.exports = router;