import { render, screen, fireEvent } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import StudentForm from "../components/StudentForm"
import "@testing-library/jest-dom"

describe("StudentForm Component", () => {
  test("renderiza el input y el botón", () => {
    render(<StudentForm onSubmit={() => {}} />)
    expect(screen.getByPlaceholderText("Nombre del estudiante")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /agregar/i })).toBeInTheDocument()
  })

  test("llama a onSubmit cuando se envía con un nombre", () => {
    const handleSubmit = vi.fn()
    render(<StudentForm onSubmit={handleSubmit} />)

    fireEvent.change(screen.getByPlaceholderText("Nombre del estudiante"), {
      target: { value: "David" },
    })
    fireEvent.click(screen.getByRole("button", { name: /agregar/i }))

    expect(handleSubmit).toHaveBeenCalledWith("David")
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })
})
