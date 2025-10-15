import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import StudentsList from "./routes/StudentsList";
import AddStudent from "./routes/AddStudent";
import Lunches from "./routes/Lunches";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./routes/Login";
import Register from "./routes/Register";

function App() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          {/* 🔓 Rutas públicas */}
          <Route
            path="/"
            element={
              user ? (
                <Navigate to="/lunches" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Rutas protegidas */}
          <Route
            path="/students"
            element={
              <ProtectedRoute roles={["ADMIN", "STAFF"]}>
                <StudentsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/students/add"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AddStudent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/lunches"
            element={
              <ProtectedRoute roles={["STUDENT", "PARENT", "ADMIN"]}>
                <Lunches />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
