import React, { useState } from 'react';
import axios from 'axios';

function QuadraticSolver() {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
    <div className="flex flex-col items-center p-8 max-w-[450px] mx-auto my-8 bg-white rounded-xl font-sans shadow-lg">
      <h2 className="text-black mb-8 text-center text-3xl font-semibold tracking-tight">
        Quadratic Solver
      </h2>
      
      <div>
        <h3 className="text-gray-600 mb-4 text-xl">Equation:</h3>
        <p className="text-lg my-4 p-4 bg-gray-50 rounded-lg text-center border-2 border-gray-200">
          {renderEquation()}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
        <div className="flex items-center gap-4 sm:flex-row flex-col">
          <label className="font-medium text-gray-600 min-w-[30px]">a:</label>
          <input 
            type="number" 
            value={a} 
            onChange={(e) => setA(e.target.value)} 
            required
            className="p-3 border-2 border-gray-200 rounded-lg text-base w-full transition-all bg-gray-50 
                     focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
          />
        </div>

        <div className="flex items-center gap-4 sm:flex-row flex-col">
          <label className="font-medium text-gray-600 min-w-[30px]">b:</label>
          <input 
            type="number" 
            value={b} 
            onChange={(e) => setB(e.target.value)} 
            required
            className="p-3 border-2 border-gray-200 rounded-lg 
                      text-base w-full transition-all bg-gray-50 
                     focus:outline-none focus:border-indigo-600
                   focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
          />
        </div>

        <div className="flex items-center gap-4 sm:flex-row flex-col">
          <label className="font-medium text-gray-600 min-w-[30px]">c:</label>
          <input 
            type="number" 
            value={c} 
            onChange={(e) => setC(e.target.value)} 
            required
            className="p-3 border-2 border-gray-200 rounded-lg 
                    text-base w-full transition-all bg-gray-50 
                     focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
          />
        </div>

        <button 
          type="submit"
          className="bg-indigo-600 text-white py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer 
                   transition-all mt-6 min-w-[200px] shadow-md hover:bg-indigo-800 hover:-translate-y-0.5 
                   hover:shadow-lg active:translate-y-0 active:shadow"
        >
          Solve
        </button>
      </form>

      {result && (
        <div className="mt-6 p-5 bg-gray-50 rounded-lg w-full text-center border-2 border-gray-200">
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
        <p className="text-red-600 mt-4 text-sm font-medium text-center bg-red-50 py-3 px-4 rounded-md border border-red-200">
          {error}
        </p>
      )}
    </div>
  );
}

export default QuadraticSolver;