import React, { useState } from 'react';
import axios from 'axios';
const API_BASE_URL = 'https://mathsolverbackend.onrender.com';
// BasicCalculator component
const BasicCalculator = () => {
    // State variables to store the operation, input numbers, result, and error message
    const [operation, setOperation] = useState('add');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            // Send a POST request to the backend API to perform the calculation
            const response = await axios.post(`${API_BASE_URL}/api/calculate`, { operation, a: parseFloat(a), b: parseFloat(b) });
            setResult(response.data.result); // Set the result state with the response data
            setError(null); // Clear any previous error
        } catch (err) {
            // Set the error state with the error message
            setError(err.response ? err.response.data.error : 'Error performing calculation');
            setResult(null); // Clear the result state
        }
    };

    return (
        <div>
            <h2>Basic Calculator</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Number 1:</label>
                    <input type="number" value={a} onChange={(e) => setA(e.target.value)} required />
                </div>
                <div>
                    <label>Number 2:</label>
                    <input type="number" value={b} onChange={(e) => setB(e.target.value)} required />
                </div>
                <div>
                    <label>Operation:</label>
                    <select value={operation} onChange={(e) => setOperation(e.target.value)}>
                        <option value="add">Add</option>
                        <option value="subtract">Subtract</option>
                        <option value="multiply">Multiply</option>
                        <option value="divide">Divide</option>
                        <option value="exponent">Exponent</option>
                        <option value="sqrt">Square Root</option>
                    </select>
                </div>
                <button type="submit">Calculate</button>
            </form>
            {result !== null && <h3>Result: {result}</h3>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default BasicCalculator;