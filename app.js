require('dotenv').config();
const express = require('express');
const cors = require('cors');

const conectarDB = require('./config/db');
const rutas = require('./routes/multimediaRoutes');

const app = express();

// conectar DB
conectarDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// rutas
app.use('/api/multimedia', rutas);

// servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));