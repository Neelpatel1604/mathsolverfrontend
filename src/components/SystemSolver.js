import React, { useState } from 'react';
import './SystemSolver.css'; // Make sure to create this CSS file

function SystemSolver() {
    const [equationCount, setEquationCount] = useState(2);
    const [variableCount, setVariableCount] = useState(2);
    const [params, setParams] = useState({});
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParams({ ...params, [name]: value !== '' ? parseFloat(value) : '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setResult(null);

        const data = {
            equationCount,
            variableCount,
            ...params
        };

        console.log("Sending data:", data);

        try {
            const response = await fetch('http://localhost:5000/solve_system', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();
            console.log("Received response:", responseData);

            if (!response.ok) {
                throw new Error(responseData.error || `HTTP error! status: ${response.status}`);
            }

            setResult(responseData.result);
        } catch (error) {
            console.error("Full error object:", error);
            setError(`Error: ${error.message}`);
        }
    };

    const renderInputs = () => {
        const inputs = [];
        for (let i = 1; i <= equationCount; i++) {
            const rowInputs = [];
            for (let j = 1; j <= variableCount; j++) {
                rowInputs.push(
                    <input
                        key={`a${i}${j}`}
                        type="number"
                        name={`a${i}${j}`}
                        placeholder={`a${i}${j}`}
                        onChange={handleChange}
                        required
                    />
                );
            }
            inputs.push(
                <div key={`row${i}`} className="input-row">
                    {rowInputs}
                    <input
                        key={`d${i}`}
                        type="number"
                        name={`d${i}`}
                        placeholder={`d${i}`}
                        onChange={handleChange}
                        required
                    />
                </div>
            );
        }
        return inputs;
    };

    return (
        <div className="system-solver-container">
            <h2>System of Equations Solver</h2>
            <p>Please enter the coefficients for the equations below:</p>
            <div>
                <label>Number of Equations: </label>
                <select value={equationCount} onChange={(e) => setEquationCount(Number(e.target.value))}>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
            <div>
                <label>Number of Variables: </label>
                <select value={variableCount} onChange={(e) => setVariableCount(Number(e.target.value))}>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                {renderInputs()}
                <button type="submit">Solve</button>
            </form>
            {result && (
                <div>
                    <h3>Solution:</h3>
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

export default SystemSolver;