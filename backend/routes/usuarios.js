const express = require('express');
const User = require('../models/User');
const router = express.Router();

// 🔹 Registro de usuario
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    console.log("📝 Datos recibidos para registro:", req.body);

    if (!name || !email || !password) {
      return res.status(400).json({ ok: false, message: "Todos los campos son obligatorios" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ ok: false, message: "El usuario ya existe" });
    }

    const newUser = new User({ name, email, password, role: role || "STUDENT" });
    await newUser.save();

    res.status(201).json({
      ok: true,
      message: "Usuario registrado exitosamente",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    console.error("❌ Error en registro:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor: " + error.message });
  }
});

// 🔹 Login de usuario
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("🔐 Datos recibidos para login:", req.body);

    if (!email || !password) {
      return res.status(400).json({ ok: false, message: "Email y contraseña son obligatorios" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ ok: false, message: "Usuario no encontrado" });
    }

    if (user.password !== password) {
      return res.status(400).json({ ok: false, message: "Contraseña incorrecta" });
    }

    res.json({
      ok: true,
      message: "Login exitoso",
      token: "token_temporal_" + user._id,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ ok: false, message: "Error interno del servidor: " + error.message });
  }
});

module.exports = router;
