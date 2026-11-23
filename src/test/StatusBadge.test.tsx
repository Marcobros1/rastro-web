import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { StatusBadge } from "../features/listings/StatusBadge";

// Mock de CSS Modules para que las clases se resuelvan en jsdom
vi.mock("../features/listings/StatusBadge.module.css", () => ({
  default: {
    badge: "badge",
    AVAILABLE: "AVAILABLE",
    RESERVED: "RESERVED",
    SOLD: "SOLD",
    ACCEPTED: "ACCEPTED",
    PENDING: "PENDING",
    REJECTED: "REJECTED",
  },
}));

describe("StatusBadge", () => {
  it('muestra "Vendido" cuando el status es "SOLD"', () => {
    render(<StatusBadge status="SOLD" />);
    // @ts-expect-error - toBeInTheDocument viene de @testing-library/jest-dom
    expect(screen.getByText("Vendido")).toBeInTheDocument();
  });

  it('muestra "Disponible" cuando el status es "AVAILABLE"', () => {
    render(<StatusBadge status="AVAILABLE" />);
    // @ts-expect-error - toBeInTheDocument viene de @testing-library/jest-dom
    expect(screen.getByText("Disponible")).toBeInTheDocument();
  });

  it('muestra "Reservado" cuando el status es "RESERVED"', () => {
    render(<StatusBadge status="RESERVED" />);
    // @ts-expect-error - toBeInTheDocument viene de @testing-library/jest-dom
    expect(screen.getByText("Reservado")).toBeInTheDocument();
  });

  it('muestra "Pendiente" cuando el status es "PENDING"', () => {
    render(<StatusBadge status="PENDING" />);
    // @ts-expect-error - toBeInTheDocument viene de @testing-library/jest-dom
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
  });

  it('muestra "Aceptada" cuando el status es "ACCEPTED"', () => {
    render(<StatusBadge status="ACCEPTED" />);
    // @ts-expect-error - toBeInTheDocument viene de @testing-library/jest-dom
    expect(screen.getByText("Aceptada")).toBeInTheDocument();
  });

  it('muestra "Rechazada" cuando el status es "REJECTED"', () => {
    render(<StatusBadge status="REJECTED" />);
    // @ts-expect-error - toBeInTheDocument viene de @testing-library/jest-dom
    expect(screen.getByText("Rechazada")).toBeInTheDocument();
  });
});
