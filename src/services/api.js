const API_URL = "http://localhost:5000/api"; // 👈 tu backend actual

export const api = {
  // 🔹 Registro
  async register(data) {
    try {
      const res = await fetch(`${API_URL}/usuarios/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("❌ Error en register:", err);
      return { ok: false, message: "Error de conexión con el servidor" };
    }
  },

  // 🔹 Login
  async login(data) {
    try {
      const res = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (err) {
      console.error("❌ Error en login:", err);
      return { ok: false, message: "Error de conexión con el servidor" };
    }
  },

  // 🔹 Obtener almuerzos guardados (del backend prueba)
  async getLunches() {
    try {
      const res = await fetch(`${API_URL}/lunches`);
      if (!res.ok) throw new Error("Error al cargar almuerzos");
      return await res.json();
    } catch (err) {
      console.error("❌ Error cargando almuerzos:", err);
      return [];
    }
  },

  // 🔹 Agregar almuerzo nuevo
  async addLunch(data) {
    try {
      const res = await fetch(`${API_URL}/lunches`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Error al guardar almuerzo");
      return await res.json();
    } catch (err) {
      console.error("❌ Error agregando almuerzo:", err);
      return null;
    }
  },
};
