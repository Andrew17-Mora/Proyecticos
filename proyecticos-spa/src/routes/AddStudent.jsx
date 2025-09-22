import React, { useState } from 'react'
import { api } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function AddStudent() {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !grade) return

    await api.addStudent({
      id: Date.now(),
      name,
      grade
    })

    setName('')
    setGrade('')
    navigate('/students') // redirige a la lista
  }

  return (
    <section className="login-section">
      <h2>Añadir estudiante</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label>Grado</label>
        <input 
          type="text" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          required 
        />

        <button type="submit">Guardar</button>
      </form>
    </section>
  )
}
