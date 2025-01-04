import React, { useState } from 'react';
import GraphDisplay from './GraphDisplay';
import { evaluateExpression } from '../utils/api';

const ExpressionInput = () => {
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
            <div className="w-full max-w-[600px] p-8 bg-white rounded-xl font-sans shadow-lg mb-8">
                <h2 className="text-black mb-8 text-center text-3xl font-semibold tracking-tight">
                    Graph Plotter
                </h2>
                
                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <label className="font-medium text-gray-600 min-w-[100px]">Enter Function:</label>
                        <input 
                            id="expression-input"
                            type="text" 
                            value={expression} 
                            onChange={handleExpressionChange}
                            placeholder="e.g., sin(x) + x^2/2"
                            className="p-3 border-2 border-gray-200 rounded-lg text-base w-full transition-all 
                                     bg-gray-50 focus:outline-none focus:border-indigo-600 focus:bg-white 
                                     focus:ring-2 focus:ring-indigo-600/10 disabled:bg-gray-100 
                                     disabled:cursor-not-allowed"
                            required 
                            disabled={loading}
                        />
                    </div>

                    <div className="text-sm text-gray-500 mt-2">
                        <p>Try combining functions: sin(x) + x^2, 2*cos(x), tan(x/2)</p>
                    </div>

                    <div className="flex justify-between items-center mt-6">
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="bg-gray-100 text-gray-700 py-3.5 px-4 rounded-lg text-base font-medium 
                                         border border-gray-200 hover:bg-gray-200 transition-colors duration-200 
                                         flex items-center gap-2"
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
                                <div className="absolute left-0 top-full mt-2 w-[280px] bg-white border border-gray-200 
                                              rounded-lg shadow-lg z-50 max-h-[400px] overflow-y-auto">
                                    <div className="p-4">
                                        <div className="mb-4">
                                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Trigonometric:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {functionGroups.trigonometric.map((example) => (
                                                    <button
                                                        type="button"
                                                        key={example.label}
                                                        onClick={() => handleExampleClick(example.func)}
                                                        className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-md 
                                                                 hover:bg-blue-100 transition-colors duration-200"
                                                    >
                                                        {example.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div className="mb-4">
                                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Algebraic:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {functionGroups.algebraic.map((example) => (
                                                    <button
                                                        type="button"
                                                        key={example.label}
                                                        onClick={() => handleExampleClick(example.func)}
                                                        className="px-3 py-1.5 text-sm bg-green-50 text-green-700 rounded-md 
                                                                 hover:bg-green-100 transition-colors duration-200"
                                                    >
                                                        {example.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-sm font-semibold text-gray-600 mb-2">Operators:</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {functionGroups.operators.map((example) => (
                                                    <button
                                                        type="button"
                                                        key={example.label}
                                                        onClick={() => handleExampleClick(example.func)}
                                                        className="px-3 py-1.5 text-sm bg-gray-50 text-gray-700 rounded-md 
                                                                 hover:bg-gray-100 transition-colors duration-200 min-w-[40px]"
                                                    >
                                                        {example.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="bg-indigo-600 text-white py-3.5 px-8 rounded-lg text-base font-semibold 
                                     cursor-pointer transition-all min-w-[200px] shadow-md hover:bg-indigo-800 
                                     hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow 
                                     disabled:bg-gray-400 disabled:cursor-not-allowed justify-center"
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
            
            {graphData && <GraphDisplay expressionData={graphData} />}
            
            {result && (
                <div className="w-full max-w-[600px] mt-6 p-5 bg-gray-50 rounded-xl shadow-md border-2 border-gray-200">
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
                <div className="w-full max-w-[600px] mt-4">
                    <p className="text-red-600 text-sm font-medium text-center bg-red-50 py-3 px-4 
                              rounded-md border border-red-200">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ExpressionInput; 