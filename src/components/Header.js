import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="header">
      <nav>
        <Link to="/">Inicio</Link> |{" "}
        <Link to="/lunches">Almuerzos</Link> |{" "}
        {user ? (
          <>
            <span>👋 {user.name}</span>{" "}
            <button onClick={handleLogout}>Salir</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Registro</Link>
          </>
        )}
      </nav>
    </header>
  );
}
