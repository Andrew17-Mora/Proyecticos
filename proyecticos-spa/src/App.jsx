import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './routes/Home'
import StudentsList from './routes/StudentsList'
import AddStudent from './routes/AddStudent'
import Lunches from './routes/Lunches'

export default function App(){
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/students/add" element={<AddStudent />} />
          <Route path="/lunches" element={<Lunches />} />
        </Routes>
      </main>
    </>
  )
}
