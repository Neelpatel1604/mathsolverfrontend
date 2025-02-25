import React, { useState } from 'react';
import GraphDisplay from './GraphDisplay';
import { evaluateExpression } from '../utils/api';

const ExpressionInput = ({ isDark }) => {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const [graphData, setGraphData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Example functions grouped by category
    const functionGroups = {
        trigonometric: [
            { label: 'Sine', func: 'sin(x)' },
            { label: 'Cosine', func: 'cos(x)' },
            { label: 'Tangent', func: 'tan(x)' }
        ],
        algebraic: [
            { label: 'Quadratic', func: 'x^2' },
            { label: 'Cubic', func: 'x^3' }
        ],
        operators: [
            { label: '+', func: ' + ' },
            { label: '-', func: ' - ' },
            { label: '*', func: ' * ' },
            { label: '/', func: ' / ' },
            { label: '(', func: '(' },
            { label: ')', func: ')' }
        ]
    };

    const handleExampleClick = (func) => {
        const input = document.getElementById('expression-input');
        const cursorPos = input?.selectionStart || expression.length;
        const newExpression = expression.slice(0, cursorPos) + func + expression.slice(cursorPos);
        setExpression(newExpression);
        
        if (result || error) {
            setResult(null);
            setError(null);
            setGraphData(null);
        }

        setTimeout(() => {
            input?.focus();
            input?.setSelectionRange(cursorPos + func.length, cursorPos + func.length);
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsDropdownOpen(false);
        
        if (!expression.trim()) {
            setError('Please enter an expression');
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);
        setGraphData(null);

        try {
            const data = await evaluateExpression(expression);
            
            if (data.points) {
                setGraphData({
                    points: data.points,
                    expression: expression
                });
                setResult(data);
            } else {
                throw new Error('No graph data received');
            }
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleExpressionChange = (e) => {
        setExpression(e.target.value);
        if (result || error) {
            setResult(null);
            setError(null);
            setGraphData(null);
        }
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className={`w-full max-w-[600px] p-8 ${isDark ? 'bg-gray-800 text-white' : 'bg-white'} 
                 rounded-xl font-sans shadow-lg mb-8`}>
                <h2 className={`${isDark ? 'text-white' : 'text-black'} mb-8 text-center text-3xl font-semibold tracking-tight`}>
                    Graph Plotter
                </h2>
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row items-center gap-4 mb-4">
                        <label className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} min-w-[100px]`}>
                            Enter Function:
                        </label>
                        <input 
                            id="expression-input"
                            type="text" 
                            value={expression} 
                            onChange={handleExpressionChange}
                            placeholder="e.g., sin(x) + x^2/2"
                            className={`p-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'} 
                                     rounded-lg text-base w-full transition-all focus:outline-none 
                                     focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                            required 
                            disabled={loading}
                        />
                    </div>

                    <div className="flex justify-between items-center gap-4">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`px-6 py-2 rounded-lg font-medium text-base
                                    ${isDark 
                                        ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' 
                                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'} 
                                    border transition-colors duration-200 flex items-center gap-2`}
                            >
                                Functions
                                <svg 
                                    className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <div className={`absolute left-0 top-full mt-2 w-[280px] 
                                    ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} 
                                    border rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto`}>
                                    <div className="p-4">
                                        {Object.entries(functionGroups).map(([groupName, functions]) => (
                                            <div key={groupName} className="mb-4 last:mb-0">
                                                <h3 className={`text-sm font-semibold mb-2 
                                                    ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                                                    {groupName.charAt(0).toUpperCase() + groupName.slice(1)}:
                                                </h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {functions.map((example) => (
                                                        <button
                                                            type="button"
                                                            key={example.label}
                                                            onClick={() => handleExampleClick(example.func)}
                                                            className={`px-3 py-1.5 text-sm rounded-md transition-colors duration-200
                                                                ${isDark 
                                                                    ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                                        >
                                                            {example.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-indigo-600 text-white px-8 py-2 rounded-lg font-medium
                                     transition-all hover:bg-indigo-700 focus:outline-none focus:ring-2 
                                     focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 
                                     disabled:cursor-not-allowed"
                        >
                            {loading ? 'Plotting...' : 'Plot Graph'}
                        </button>
                    </div>
                </form>
                
                {loading && (
                    <div className="text-gray-600 mt-5 text-center">
                        Creating graph...
                    </div>
                )}
            </div>
            
            {graphData && <GraphDisplay expressionData={graphData} isDark={isDark} />}
            
            {result && (
                <div className={`mt-6 p-5 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} 
                             rounded-lg w-full text-center border-2`}>
                    <h3 className="text-xl mb-4 font-semibold text-gray-800">Analysis:</h3>
                    <div className="space-y-2">
                        {result.coefficients && (
                            <p className="text-gray-700">Coefficients: [{result.coefficients.join(', ')}]</p>
                        )}
                        {result.degree !== undefined && (
                            <p className="text-gray-700">Degree: {result.degree}</p>
                        )}
                        {result.roots && result.roots.length > 0 && (
                            <p className="text-gray-700">Roots: [{result.roots.join(', ')}]</p>
                        )}
                    </div>
                </div>
            )}

            {error && (
                <p className={`mt-4 ${isDark ? 'text-red-400 bg-red-900/50 border-red-700' : 'text-red-600 bg-red-50 border-red-200'} 
                            text-sm font-medium text-center py-3 px-4 rounded-md border`}>
                    {error}
                </p>
            )}
        </div>
    );
};

export default ExpressionInput; 