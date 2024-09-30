import React, { useState } from 'react';

function QuadraticSolver() {
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [c, setC] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);
        console.log("Sending data:", { a, b, c });
        try {
            const response = await fetch('http://localhost:5000/solve_quadratic', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ a: parseFloat(a), b: parseFloat(b), c: parseFloat(c) }),
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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