import React, { useState } from 'react';
import axios from 'axios';

// Get API URL with fallback and trailing slash handling
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 
    ? process.env.REACT_APP_API_BASE_URL.replace(/\/$/, '')
    : 'http://localhost:3000';

// BasicCalculator component
const BasicCalculator = () => {
    // State variables to store the operation, input numbers, result, and error message
    const [operation, setOperation] = useState('add');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [isDropdownOpen,setIsDropdownOpen]= useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!a || !b) {
            setError('Please enter both numbers');
            return;
        }
        
        try {
            const response = await axios.post(`${API_BASE_URL}/api/calculate`, {
                operation,
                a: parseFloat(a),
                b: parseFloat(b)
            });
            
            if (response.data && response.data.result !== undefined) {
                setResult(response.data.result);
                setError(null);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Error performing calculation');
            setResult(null);
        }
    };

    return (
        <div className="flex flex-col items-center p-8 max-w-[450px] mx-auto my-8 bg-white rounded-xl font-sans shadow-lg">
            <h2 className="text-black mb-8 text-center text-3xl font-semibold tracking-tight">
                Basic Calculator
            </h2>
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                <div className="flex flex-row items-center gap-4 sm:flex-row">
                    <label className="font-medium text-gray-600 w-[100px] text-left text-base">
                        Number 1:
                    </label>
                    <input 
                        type="number" 
                        value={a} 
                        onChange={(e) => setA(e.target.value)} 
                        required 
                        className="p-3 border-2 border-gray-200 rounded-lg text-base flex-1 w-full transition-all bg-gray-50 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
                    />
                </div>

                <div className="flex flex-row items-center gap-4 sm:flex-row">
                    <label className="font-medium text-gray-600 w-[100px] text-left text-base">
                        Number 2:
                    </label>
                    <input 
                        type="number" 
                        value={b} 
                        onChange={(e) => setB(e.target.value)} 
                        required 
                        className="p-3 border-2 border-gray-200 rounded-lg text-base flex-1 w-full transition-all bg-gray-50 focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
                    />
                </div>

                <div className="flex flex-row items-center gap-4 sm:flex-row">
                    
                    <label className="font-medium text-gray-600 w-[100px] text-left text-base">
                        Operation:
                    </label>
                    
                    <select 
                        value={operation}
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
                        onChange={(e) => setOperation(e.target.value)}
                        className="p-3 border-2 border-gray-200 rounded-lg 
                        text-base flex-1 w-full cursor-pointer bg-gray-50 
                         focus:outline-none focus:border-indigo-600
                         focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
                    >
                       
                       
                        <option value="add">Add</option>
                        <option value="subtract">Subtract</option>
                        <option value="multiply">Multiply</option>
                        <option value="divide">Divide</option>
                        <option value="exponent">Exponent</option>
                        <option value="sqrt">Root</option>
                        
                       
                    </select>
                    

                </div>

                <button 
                    type="submit"
                    className="bg-indigo-600 text-white py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all mt-4 min-w-[120px] self-center shadow-md hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow"
                >
                    Calculate
                </button>
            </form>

            {result !== null && (
                <h3 className="mt-6 text-indigo-900 text-xl font-semibold text-center">
                    Result: {result}
                </h3>
            )}
            
            {error && (
                <p className="mt-4 text-red-600 text-sm font-medium text-center bg-red-50 py-3 px-4 rounded-md border border-red-200">
                    {error}
                </p>
            )}
        </div>
    );
};

export default BasicCalculator;