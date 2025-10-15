const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000" // o http://localhost:5173 si usas Vite
}));

// Intentar conectar a MongoDB Atlas
console.log("⏳ Intentando conectar a MongoDB Atlas...");
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar con MongoDB:", err));

// Importar rutas
const usuariosRoutes = require('./routes/usuarios');

// Usar rutas
app.use("/api/usuarios", usuariosRoutes);

// Ruta base
app.get("/", (req, res) => {
  res.send("🌐 API de Prueba funcionando correctamente");
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
