import React, { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function StudentsList(){
  const [students, setStudents] = useState([])

  useEffect(() => {
    let mounted = true
    api.getStudents().then(data => { if(mounted) setStudents(data) })
    return () => mounted = false
  }, [])

  return (
    <section>
      <h2>Listado de estudiantes</h2>
      {students.length === 0 ? <p>No hay estudiantes.</p> : (
        <table className="table">
          <thead><tr><th>ID</th><th>Nombre</th><th>Grado</th></tr></thead>
          <tbody>
            {students.map((s, i) => (
              <tr key={i}>
                <td>{s.id || (i+1)}</td>
                <td>{s.name}</td>
                <td>{s.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}
