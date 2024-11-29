import React, { useState } from 'react';
import MatrixInput from './MatrixInput';
import MatrixResultDisplay from './MatrixResultDisplay';
import axios from 'axios';

const MatrixSolver = () => {
  const [matrix1, setMatrix1] = useState([['', ''], ['', '']]);
  const [matrix2, setMatrix2] = useState([['', ''], ['', '']]);
  const [result, setResult] = useState(null);
  const [dimensions1, setDimensions1] = useState({ rows: 2, cols: 2 });
  const [dimensions2, setDimensions2] = useState({ rows: 2, cols: 2 });
  const [operation, setOperation] = useState('add');
  const [error, setError] = useState(null);
  const [multiplyOrder, setMultiplyOrder] = useState('1x2');

  const dimensionOptions = [
    { label: '2x2', rows: 2, cols: 2 },
    { label: '2x3', rows: 2, cols: 3 },
    { label: '2x4', rows: 2, cols: 4 },
    { label: '3x2', rows: 3, cols: 2 },
    { label: '3x3', rows: 3, cols: 3 },
    { label: '3x4', rows: 3, cols: 4 },
    { label: '4x2', rows: 4, cols: 2 },
    { label: '4x3', rows: 4, cols: 3 },
    { label: '4x4', rows: 4, cols: 4 },
  ];

  const operationOptions = [
    { value: 'add', label: 'Add' },
    { value: 'subtract', label: 'Subtract' },
    { value: 'multiply', label: 'Multiply' },
    { value: 'determinant', label: 'Determinant' },
    { value: 'inverse', label: 'Inverse' },
  ];

  const handleDimensionChange = (matrixNumber, { rows, cols }) => {
    const newMatrix = Array(rows).fill().map(() => Array(cols).fill(''));
    if (matrixNumber === 1) {
      setDimensions1({ rows, cols });
      setMatrix1(newMatrix);
    } else {
      setDimensions2({ rows, cols });
      setMatrix2(newMatrix);
    }
  };
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const handleOperation = async () => {
    setError(null);
    setResult(null);
    try {
      let requestMatrix1 = matrix1;
      let requestMatrix2 = matrix2;
      if (operation === 'multiply' && multiplyOrder === '2x1') {
        [requestMatrix1, requestMatrix2] = [matrix2, matrix1];
      }
      const response = await axios.post(`${API_BASE_URL}/api/solve-matrix`, {
        operation,
        matrix1: requestMatrix1,
        matrix2: ['add', 'subtract', 'multiply'].includes(operation) ? requestMatrix2 : undefined
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error performing matrix operation:', error);
      setError(error.response?.data?.error || 'An error occurred while performing the operation');
    }
  };

  const canMultiply = () => {
    if (multiplyOrder === '1x2') {
      return dimensions1.cols === dimensions2.rows;
    } else {
      return dimensions2.cols === dimensions1.rows;
    }
  };

  return (
    <div className="flex flex-col items-center p-8 max-w-[450px] mx-auto my-8 bg-white rounded-xl font-sans shadow-lg">
      <h2 className="text-black mb-8 text-center text-3xl font-semibold tracking-tight">
        Matrix Solver
      </h2>
      
      <div className="flex items-center gap-2.5 mb-8 text-lg">
        <label className="font-medium text-gray-600">Operation: </label>
        <select 
          value={operation} 
          onChange={(e) => setOperation(e.target.value)}
          className="p-3 border-2 border-gray-200 rounded-lg text-base flex-1 w-full transition-all bg-gray-50 
                   focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
        >
          {operationOptions.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
      </div>

      {operation === 'multiply' && (
        <div className="mb-4  w-150px">
          <select 
            value={multiplyOrder} 
            onChange={(e) => setMultiplyOrder(e.target.value)}
            className="p-3 border-2 border-gray-200 rounded-lg text-base w-full cursor-pointer bg-gray-50 
                     focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10 "
          >
            <option value="1x2">M₁ × M₂</option>
            <option value="2x1">M₂ × M₁</option>
          </select>
        </div>
      )}

      <div className="flex justify-around w-full mb-8 gap-12 md:flex-row flex-col items-center">
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-gray-600 text-xl mb-4">M₁</h3>
          <div className="flex justify-center w-full mb-4">
            <select 
              onChange={(e) => handleDimensionChange(1, JSON.parse(e.target.value))}
              className="p-3 border-2 border-gray-200 rounded-lg text-base cursor-pointer bg-gray-50 
                       focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
            >
              {dimensionOptions.map((option) => (
                <option key={option.label} value={JSON.stringify({ rows: option.rows, cols: option.cols })}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <MatrixInput matrix={matrix1} setMatrix={setMatrix1} rows={dimensions1.rows} cols={dimensions1.cols} />
        </div>

        {(operation !== 'determinant' && operation !== 'inverse') && (
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-gray-600 text-xl mb-4">M₂</h3>
            <div className="flex justify-center w-full mb-4">
              <select 
                onChange={(e) => handleDimensionChange(2, JSON.parse(e.target.value))}
                className="p-3 border-2 border-gray-200 rounded-lg text-base cursor-pointer bg-gray-50 
                         focus:outline-none focus:border-indigo-600 focus:bg-white focus:ring-2 focus:ring-indigo-600/10"
              >
                {dimensionOptions.map((option) => (
                  <option key={option.label} value={JSON.stringify({ rows: option.rows, cols: option.cols })}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <MatrixInput matrix={matrix2} setMatrix={setMatrix2} rows={dimensions2.rows} cols={dimensions2.cols} />
          </div>
        )}
      </div>

      {operation === 'multiply' && !canMultiply() && (
        <p className="text-red-500 mb-4 text-sm text-center">
          Cannot multiply: The number of columns in the first matrix must equal the number of rows in the second matrix.
          {multiplyOrder === '1x2' 
            ? ` (M₁ columns: ${dimensions1.cols}, M₂ rows: ${dimensions2.rows})`
            : ` (M₂ columns: ${dimensions2.cols}, M₁ rows: ${dimensions1.rows})`
          }
        </p>
      )}

      <button 
        onClick={handleOperation} 
        disabled={operation === 'multiply' && !canMultiply()}
        className="bg-indigo-600 text-white py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer 
                 transition-all mt-6 min-w-[200px] shadow-md hover:bg-indigo-800 hover:-translate-y-0.5 
                 hover:shadow-lg active:translate-y-0 active:shadow disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Calculate
      </button>
      
      {error && (
        <p className="mt-4 text-red-600 text-sm font-medium text-center bg-red-50 py-3 px-4 rounded-md border border-red-200">
          {error}
        </p>
      )}
      <MatrixResultDisplay result={result} />
    </div>
  );
};

export default MatrixSolver;