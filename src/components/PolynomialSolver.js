import React, { useState } from 'react';

function PolynomialSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'http://10.214.80.103:5000';
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    console.log("Sending data:", { a, b, c, d });
    try {
      const response = await fetch(`${API_BASE_URL}/solve_polynomial`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a: parseFloat(a),
          b: parseFloat(b),
          c: parseFloat(c),
          d: parseFloat(d)
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Received response:", data);
      setResult(data.result);
    } catch (error) {
      console.error("Full error object:", error);
      setError(`Error: ${error.message}`);
    }
  };

  const renderEquation = () => {
    return `${a || 'a'}x^3 + ${b || 'b'}x^2 + ${c || 'c'}x + ${d || 'd'} = 0`;
  };

  return (
    <div>
      <h2>Polynomial Solver</h2>
      <div>
        <h3>Equation:</h3>
        <p>{renderEquation()}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>a:</label>
          <input type="number" value={a} onChange={(e) => setA(e.target.value)} required />
        </div>
        <div>
          <label>b:</label>
          <input type="number" value={b} onChange={(e) => setB(e.target.value)} required />
        </div>
        <div>
          <label>c:</label>
          <input type="number" value={c} onChange={(e) => setC(e.target.value)} required />
        </div>
        <div>
          <label>d:</label>
          <input type="number" value={d} onChange={(e) => setD(e.target.value)} required />
        </div>
        <button type="submit">Solve</button>
      </form>
      {result && (
        <div>
          <h3>Result:</h3>
          {typeof result === 'string' ? (
            <p>{result}</p>
          ) : (
            Object.entries(result).map(([key, value]) => (
              <p key={key}>{key}: {value}</p>
            ))
          )}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default PolynomialSolver;
