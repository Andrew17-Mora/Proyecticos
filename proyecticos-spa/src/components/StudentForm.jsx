import React, { useState } from 'react'

export default function StudentForm({ onAdd }) {
  const [name, setName] = useState('')
  const [grade, setGrade] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !grade) return
    onAdd({ id: Date.now(), name, grade })
    setName('')
    setGrade('')
  }

  return (
    <form onSubmit={handleSubmit} className="login-section">
      <h2>Añadir estudiante</h2>

      <label htmlFor="name">Nombre</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <label htmlFor="grade">Grado</label>
      <input
        id="grade"
        type="text"
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        required
      />

      <button type="submit">Añadir</button>
    </form>
  )
}
