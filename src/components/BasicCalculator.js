import React, { useState } from 'react';
import { calculate } from '../utils/api';

// BasicCalculator component
const BasicCalculator = ({ isDark }) => {
    // State variables to store the operation, input numbers, result, and error message
    const [operation, setOperation] = useState('add');
    const [a, setA] = useState('');
    const [b, setB] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const operations = [
        { value: 'add', label: 'Add' },
        { value: 'subtract', label: 'Subtract' },
        { value: 'multiply', label: 'Multiply' },
        { value: 'divide', label: 'Divide' },
        { value: 'exponent', label: 'Exponent' },
        { value: 'sqrt', label: 'Root' }
    ];

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!a || !b) {
            setError('Please enter both numbers');
            return;
        }
        
        try {
            const data = await calculate(operation, parseFloat(a), parseFloat(b));
            
            if (data && data.result !== undefined) {
                setResult(data.result);
                setError(null);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            setError(err.message || 'Error performing calculation');
            setResult(null);
        }
    };
    return (
        <div className={`flex flex-col items-center p-8 max-w-[450px] mx-auto my-8 
            ${isDark ? 'bg-gray-800 text-white' : 'bg-white'} 
            rounded-xl font-sans shadow-lg`}>
            <h2 className={`${isDark ? 'text-white' : 'text-black'} mb-8 text-center text-3xl font-semibold tracking-tight`}>
                Basic Calculator
            </h2>
            
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <label className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} w-full sm:w-[100px] text-left text-base`}>
                        Number 1:
                    </label>
                    <input 
                        type="number" 
                        value={a} 
                        onChange={(e) => setA(e.target.value)} 
                        required 
                        className={`p-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'} 
                                rounded-lg text-base flex-1 transition-all focus:outline-none 
                                focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                    />
                </div>
              
                <div
                 className="flex flex-col sm:flex-row items-center gap-4">
                    <label className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} w-full sm:w-[100px] text-left text-base`}>
                        Number 2:
                    </label>
                    <input 
                        type="number" 
                        value={b} 
                        onChange={(e) => setB(e.target.value)} 
                        required 
                        className={`p-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'} 
                                rounded-lg text-base flex-1 transition-all focus:outline-none 
                                focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                    />
                </div>
   

                <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                    <label className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} w-full sm:w-[100px] text-left text-base`}>
                        Operation:
                    </label>
                    <div className="flex-1 relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className={`w-full p-3 border-2 ${
                                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'
                            } rounded-lg text-base flex justify-between items-center cursor-pointer focus:outline-none 
                            focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                        >
                            <span>{operations.find(op => op.value === operation)?.label}</span>
                            <svg 
                                className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <div className={`absolute top-full left-0 w-full mt-1 border-2 ${
                                isDark 
                                    ? 'bg-gray-700 border-gray-600 text-white' 
                                    : 'bg-white border-gray-200'
                            } rounded-lg shadow-lg z-10`}>
                                {operations.map((op) => (
                                    <button
                                        key={op.value}
                                        type="button"
                                        onClick={() => {
                                            setOperation(op.value);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white
                                            ${operation === op.value 
                                                ? 'bg-indigo-600 text-white' 
                                                : isDark ? 'text-gray-200' : 'text-gray-700'
                                            } transition-colors first:rounded-t-lg last:rounded-b-lg`}
                                    >
                                        {op.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <button 
                    type="submit"
                    className={`bg-indigo-600 text-white py-3.5 px-8 rounded-lg 
                                text-base font-semibold cursor-pointer 
                                transition-all mt-4 min-w-[120px] 
                                self-center shadow-md hover:bg-indigo-800 
                                hover:-translate-y-0.5 
                                hover:shadow-lg active:translate-y-0 active:shadow`}
                >
                    Calculate
                </button>
            </form>

            {result !== null && (
                <h3 className={`mt-6 ${isDark ? 'text-indigo-400' : 'text-indigo-900'} text-xl font-semibold text-center`}>
                    Result: {result}
                </h3>
            )}
            {error && (
                <p className={`mt-4 ${isDark ? 'text-red-400' : 'text-red-600'} text-sm font-medium text-center bg-red-50 py-3 px-4 rounded-md border border-red-200`}>
                    {error}
                </p>
            )}
            <p className={`text-gray-400 ${isDark ? 'text-gray-500' : ''}`}> *It might take around a minute to get first result</p>
        </div>
    );
};

export default BasicCalculator;