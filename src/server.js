const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/arquidb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Definir el esquema y el modelo
const coordenadaSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
  title: String,
});

const Coordenada = mongoose.model('Coordenada', coordenadaSchema);

// Ruta para obtener las coordenadas
app.get('/api/coordenadas', async (req, res) => {
  try {
    const coordenadas = await Coordenada.find();
    res.json(coordenadas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener las coordenadas' });
  }
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
