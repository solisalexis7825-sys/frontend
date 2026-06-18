const Multimedia = require('../models/Multimedia');

// CREATE
exports.crear = async (req, res) => {
  try {
    const nuevo = new Multimedia({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      imagenUrl: req.files.imagen[0].path,
      audioUrl: req.files.audio[0].path
    });

    await nuevo.save();
    res.json(nuevo);

  } catch (error) {
    res.status(500).json(error);
  }
};

// READ
exports.obtener = async (req, res) => {
  const datos = await Multimedia.find();
  res.json(datos);
};

// UPDATE
exports.actualizar = async (req, res) => {

  try {

    const datosActualizados = {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion
    };

    if (req.files && req.files.imagen) {
      datosActualizados.imagenUrl =
        req.files.imagen[0].path;
    }

    if (req.files && req.files.audio) {
      datosActualizados.audioUrl =
        req.files.audio[0].path;
    }

    const actualizado =
      await Multimedia.findByIdAndUpdate(
        req.params.id,
        datosActualizados,
        { new: true }
      );

    res.json(actualizado);

  } catch (error) {
    res.status(500).json(error);
  }
};

// DELETE
exports.eliminar = async (req, res) => {
  await Multimedia.findByIdAndDelete(req.params.id);

  res.json({
    mensaje: "Eliminado correctamente"
  });
};