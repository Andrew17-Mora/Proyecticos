import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Header(){
  return (
    <header className="site-header">
      <h1>Plataforma de Almuerzos</h1>
      <nav aria-label="Navegación principal">
        <ul className="nav">
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/students">Listado</NavLink></li>
          <li><NavLink to="/students/add">Añadir estudiante</NavLink></li>
          <li><NavLink to="/lunches">Almuerzos</NavLink></li>
        </ul>
      </nav>
    </header>
  )
}
