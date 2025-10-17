import React, { useState } from "react";

export default function BaseCalculator() {
  const [base1, setBase1] = useState(10);
  const [value1, setValue1] = useState("");
  const [base2, setBase2] = useState(10);
  const [value2, setValue2] = useState("");
  const [operation, setOperation] = useState("+");
  const [outputBase, setOutputBase] = useState(10);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  // === Validaciones ===
  const validateBase = (b) => {
    const base = Number(b);
    if (isNaN(base) || base < 2 || base > 10) {
      throw new Error("La base debe estar entre 2 y 10");
    }
    return base;
  };

  const validateValueInBase = (value, base) => {
    for (let char of value) {
      const digit = parseInt(char, 10);
      if (isNaN(digit) || digit >= base) {
        throw new Error(`El dígito '${char}' no es válido en base ${base}`);
      }
    }
  };

  // === Conversión ===
  const toDecimal = (value, base) => parseInt(value, base);
  const fromDecimal = (value, base) => value.toString(base);

  // === Cálculo principal ===
  const handleCalculate = () => {
    try {
      setError("");
      const b1 = validateBase(base1);
      const b2 = validateBase(base2);
      const outBase = validateBase(outputBase);
      validateValueInBase(value1, b1);
      validateValueInBase(value2, b2);

      const n1 = toDecimal(value1, b1);
      const n2 = toDecimal(value2, b2);
      let res;

      switch (operation) {
        case "+":
          res = n1 + n2;
          break;
        case "-":
          res = n1 - n2;
          break;
        case "*":
          res = n1 * n2;
          break;
        case "/":
          if (n2 === 0) throw new Error("No se puede dividir por cero");
          res = Math.floor(n1 / n2);
          break;
        default:
          throw new Error("Operación no válida");
      }

      setResult(fromDecimal(res, outBase));
    } catch (err) {
      setResult("");
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>🧮 Calculadora de Bases Numéricas (2–10)</h2>

      <div style={{ display: "grid", gap: 10 }}>
        <label>
          Base 1:
          <input
            type="number"
            min="2"
            max="10"
            value={base1}
            onChange={(e) => setBase1(e.target.value)}
          />
        </label>

        <label>
          Número 1:
          <input
            type="text"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
          />
        </label>

        <label>
          Base 2:
          <input
            type="number"
            min="2"
            max="10"
            value={base2}
            onChange={(e) => setBase2(e.target.value)}
          />
        </label>

        <label>
          Número 2:
          <input
            type="text"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
          />
        </label>

        <label>
          Operación:
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
          >
            <option value="+">Suma (+)</option>
            <option value="-">Resta (-)</option>
            <option value="*">Multiplicación (*)</option>
            <option value="/">División (/)</option>
          </select>
        </label>

        <label>
          Base del resultado:
          <input
            type="number"
            min="2"
            max="10"
            value={outputBase}
            onChange={(e) => setOutputBase(e.target.value)}
          />
        </label>

        <button onClick={handleCalculate}>Calcular</button>

        {error && <p style={{ color: "red" }}>⚠️ {error}</p>}
        {result && (
          <p style={{ color: "green", fontWeight: "bold" }}>
            Resultado: {result} (en base {outputBase})
          </p>
        )}
      </div>
    </div>
  );
}
