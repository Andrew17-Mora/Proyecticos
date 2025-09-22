import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Lunches(){
  const [lunches, setLunches] = useState([])
  const [available, setAvailable] = useState([])
  const [form, setForm] = useState({ name: "", type: "" })

  // Cargar almuerzos locales
  useEffect(() => {
    api.getLunches().then(setLunches)
  }, [])

  // Cargar almuerzos externos (TheMealDB)
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=chicken")
      .then(res => res.json())
      .then(data => setAvailable(data.meals || []))
      .catch(err => console.error("Error cargando menú", err))
  }, [])

  // Manejo del formulario
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.type) return alert("Por favor, completa todos los campos")

    api.addLunch(form).then(newLunch => {
      setLunches(prev => [...prev, newLunch])
      setForm({ name: "", type: "" }) // limpiar formulario
    })
  }

  return (
    <section>
      <h2>Agregar almuerzo</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nombre del platillo:
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </label>
        <label>
        Id:
          <input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Guardar</button>
      </form>

      <h2 style={{marginTop:"2rem"}}>Almuerzos guardados</h2>
      {lunches.length === 0 ? <p>No hay almuerzos configurados.</p> : (
        <ul>
          {lunches.map((l, i) => (
            <li key={i}>{l.name} - {l.type}</li>
          ))}
        </ul>
      )}

      <h2 style={{marginTop:"2rem"}}>Almuerzos disponibles</h2>
      {available.length === 0 ? <p>No se encontraron platos.</p> : (
        <div className="lunch-grid">
          {available.map(plato => (
            <div key={plato.idMeal} className="lunch-card">
              <h3>{plato.strMeal}</h3>
              <img src={plato.strMealThumb} alt={plato.strMeal} className="lunch-img" />
              <p>ID: {plato.idMeal}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
