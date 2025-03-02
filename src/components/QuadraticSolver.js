import React, { useState } from 'react';
import { solveQuadratic } from '../utils/api';

function QuadraticSolver({ isDark }) {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending data:", { a, b, c });
    try {
      const data = await solveQuadratic(parseFloat(a), parseFloat(b), parseFloat(c));
      console.log("Received response:", data);
      setResult(data.result);
      setError(null);
    } catch (error) {
      console.error("Error:", error);
      setError('Error: ' + error.message);
      setResult(null);
    }
  };

  const renderEquation = () => {
    return `${a || 'a'}x^2 + ${b || 'b'}x + ${c || 'c'} = 0`;
  };

  return (
    <div className={`flex flex-col items-center p-8 max-w-[450px] mx-auto my-8 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl font-sans shadow-lg`}>
      <h2 className={`${isDark ? 'text-white' : 'text-black'} mb-8 text-center text-3xl font-semibold tracking-tight`}>
        Quadratic Solver
      </h2>
      
      <div>
        <h3 className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4 text-xl`}>Equation:</h3>
        <p className={`text-lg my-4 p-4 ${isDark ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} rounded-lg text-center border-2 ${isDark ? 'text-white' : ''}`}>
          {renderEquation()}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} min-w-[30px]`}>a:</label>
          <input 
            type="number" 
            value={a} 
            onChange={(e) => setA(e.target.value)} 
            required
            className={`p-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'} rounded-lg text-base w-full transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} min-w-[30px]`}>b:</label>
          <input 
            type="number" 
            value={b} 
            onChange={(e) => setB(e.target.value)} 
            required
            className={`p-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'} rounded-lg text-base w-full transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <label className={`font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'} min-w-[30px]`}>c:</label>
          <input 
            type="number" 
            value={c} 
            onChange={(e) => setC(e.target.value)} 
            required
            className={`p-3 border-2 ${isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'} rounded-lg text-base w-full transition-all focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
          />
        </div>

        <button 
          type="submit"
          className={`bg-indigo-600 text-white py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer transition-all mt-6 min-w-[200px] shadow-md hover:bg-indigo-800 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 active:shadow`}
        >
          Solve
        </button>
      </form>

      {result && (
        <div className={`mt-6 p-5 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-50 border-gray-200'} rounded-lg w-full text-center border-2`}>
          <h3 className="text-xl mb-2">Solution:</h3>
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

      {error && (
        <p className={`${isDark ? 'bg-red-900/50 border-red-700 text-red-200' : 'bg-red-50 border-red-200 text-red-600'} mt-4 text-sm font-medium text-center py-3 px-4 rounded-md border`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default QuadraticSolver;