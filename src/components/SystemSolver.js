import React, { useState } from 'react';

function SystemSolver({ isDark }) {
    const [equationCount, setEquationCount] = useState(2);
    const [variableCount, setVariableCount] = useState(2);
    const [params, setParams] = useState({});
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setParams({ ...params, [name]: value !== '' ? parseFloat(value) : '' });
    };
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
    
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
            const response = await fetch(`${API_BASE_URL}/solve_system`, {
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
                        className={`w-20 p-3 text-center border-2 ${
                            isDark 
                                ? 'border-gray-600 bg-gray-700 text-white' 
                                : 'border-gray-200 bg-gray-50'
                        } rounded-lg text-base transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                    />
                );
            }
            inputs.push(
                <div key={`row${i}`} className="flex items-center justify-center mb-4 gap-3">
                    {rowInputs}
                    <input
                        key={`d${i}`}
                        type="number"
                        name={`d${i}`}
                        placeholder={`d${i}`}
                        onChange={handleChange}
                        required
                        className={`w-20 p-3 text-center border-2 ${
                            isDark 
                                ? 'border-gray-600 bg-gray-700 text-white' 
                                : 'border-gray-200 bg-gray-50'
                        } rounded-lg text-base transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                    />
                </div>
            );
        }
        return inputs;
    };

    return (
        <div className={`flex flex-col items-center p-8 max-w-[450px] mx-auto my-8 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl font-sans shadow-lg`}>
            <h2 className={`${isDark ? 'text-white' : 'text-black'} mb-8 text-3xl font-semibold text-center`}>
                System of Equations Solver
            </h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>Please enter the coefficients for the equations below:</p>
            
            <div className="mb-4 text-center">
                <label className="mr-2">Number of Equations: </label>
                <select 
                    value={equationCount} 
                    onChange={(e) => setEquationCount(Number(e.target.value))}
                    className={`p-3 border-2 ${
                        isDark 
                            ? 'border-gray-600 bg-gray-700 text-white' 
                            : 'border-gray-200 bg-gray-50'
                    } rounded-lg text-base cursor-pointer appearance-none focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>
            
            <div className="mb-4 text-center">
                <label className="mr-2">Number of Variables: </label>
                <select 
                    value={variableCount} 
                    onChange={(e) => setVariableCount(Number(e.target.value))}
                    className={`p-3 border-2 ${
                        isDark 
                            ? 'border-gray-600 bg-gray-700 text-white' 
                            : 'border-gray-200 bg-gray-50'
                    } rounded-lg text-base cursor-pointer appearance-none focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                >
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>

            <form onSubmit={handleSubmit} className="w-full">
                {renderInputs()}
                <button 
                    type="submit"
                    className="bg-indigo-600 text-white py-3.5 px-8 rounded-lg text-base font-semibold 
                            cursor-pointer transition-all mt-6 min-w-[200px] mx-auto block shadow-md 
                            hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg 
                            active:translate-y-0 active:shadow"
                >
                    Solve
                </button>
            </form>

            {result && (
                <div className={`mt-6 p-5 ${
                    isDark 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-gray-50 border-gray-200'
                } rounded-lg w-full text-center border-2`}>
                    <h3 className="text-xl mb-2">Solution:</h3>
                    {typeof result === 'string' ? (
                        <p>{result}</p>
                    ) : (
                        Object.entries(result).map(([key, value]) => (
                            <p key={key}>{key}: {value}</p>
                        ))
                    )}
                </div>
            )}

            {error && (
                <p className={`mt-4 text-sm font-medium text-center py-3 px-4 rounded-md border ${
                    isDark 
                        ? 'bg-red-900/50 border-red-700 text-red-200' 
                        : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                    {error}
                </p>
            )}
        </div>
    );
}

export default SystemSolver;