import React, { useState } from 'react';
import axios from 'axios';

function QuadraticSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = 'https://mathsolverbackend.onrender.com';
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", { a, b, c });
    try {
      const response = await axios.post(`${API_BASE_URL}/solve_quadratic`, { a: parseFloat(a), b: parseFloat(b), c: parseFloat(c) });
      console.log("Received response:", response.data);
      setResult(response.data.result);
      setError(null);
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error.message);
      setError('Error: ' + (error.response ? error.response.data.error : error.message));
      setResult(null);
    }
  };

  const renderEquation = () => {
    return `${a || 'a'}x^2 + ${b || 'b'}x + ${c || 'c'} = 0`;
  };

  return (
    <div>
      <h2>Quadratic Solver</h2>
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
        <button type="submit">Solve</button>
      </form>
      {result && (
        <div className="result">
          <h3>Solution:</h3>
          {typeof result === 'string' ? (
            <p>{result}</p>
          ) : (
            <>
              <p>x1 = {result.x1}</p>
              <p>x2 = {result.x2}</p>
            </>
          )}
        </div>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default QuadraticSolver;