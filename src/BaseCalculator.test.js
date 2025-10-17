import { render, screen, fireEvent } from "@testing-library/react";
import BaseCalculator from "./BaseCalculator";

describe("BaseCalculator", () => {
  test("renderiza el título principal", () => {
    render(<BaseCalculator />);
    expect(
      screen.getByText(/calculadora de bases numéricas/i)
    ).toBeInTheDocument();
  });

  test("realiza una suma simple en base 10", () => {
    render(<BaseCalculator />);

    fireEvent.change(screen.getByLabelText(/número 1/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/número 2/i), {
      target: { value: "3" },
    });

    fireEvent.click(screen.getByText(/calcular/i));

    expect(
      screen.getByText(/resultado: 8 \(en base 10\)/i)
    ).toBeInTheDocument();
  });

  test("muestra error si la base es inválida", () => {
    render(<BaseCalculator />);

    fireEvent.change(screen.getByLabelText(/base 1/i), {
      target: { value: "15" },
    });
    fireEvent.change(screen.getByLabelText(/número 1/i), {
      target: { value: "1" },
    });
    fireEvent.change(screen.getByLabelText(/número 2/i), {
      target: { value: "2" },
    });

    fireEvent.click(screen.getByText(/calcular/i));

    expect(
      screen.getByText(/la base debe estar entre 2 y 10/i)
    ).toBeInTheDocument();
  });

  test("muestra error al dividir por cero", () => {
    render(<BaseCalculator />);

    fireEvent.change(screen.getByLabelText(/número 1/i), {
      target: { value: "5" },
    });
    fireEvent.change(screen.getByLabelText(/número 2/i), {
      target: { value: "0" },
    });
    fireEvent.change(screen.getByLabelText(/operación/i), {
      target: { value: "/" },
    });

    fireEvent.click(screen.getByText(/calcular/i));

    expect(
      screen.getByText(/no se puede dividir por cero/i)
    ).toBeInTheDocument();
  });
});
