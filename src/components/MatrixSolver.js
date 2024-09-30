import React, { useState } from 'react';
import MatrixInput from './MatrixInput';
import ResultDisplay from './ResultDisplay';
import axios from 'axios';
import './MatrixSolver.css';

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
const API_BASE_URL = 'http://10.214.80.103:5000';
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
    <div className="matrix-solver">
      <h2>Matrix Solver</h2>
      <div className="operation-select">
        <label>Operation: </label>
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          {operationOptions.map((op) => (
            <option key={op.value} value={op.value}>{op.label}</option>
          ))}
        </select>
        {operation === 'multiply' && (
          <select value={multiplyOrder} onChange={(e) => setMultiplyOrder(e.target.value)}>
            <option value="1x2">Matrix 1 × Matrix 2</option>
            <option value="2x1">Matrix 2 × Matrix 1</option>
          </select>
        )}
      </div>
      <div className="matrices">
        <div>
          <h3>Matrix 1</h3>
          <select onChange={(e) => handleDimensionChange(1, JSON.parse(e.target.value))}>
            {dimensionOptions.map((option) => (
              <option key={option.label} value={JSON.stringify({ rows: option.rows, cols: option.cols })}>
                {option.label}
              </option>
            ))}
          </select>
          <MatrixInput matrix={matrix1} setMatrix={setMatrix1} rows={dimensions1.rows} cols={dimensions1.cols} />
        </div>
        {(operation !== 'determinant' && operation !== 'inverse') && (
          <div>
            <h3>Matrix 2</h3>
            <select onChange={(e) => handleDimensionChange(2, JSON.parse(e.target.value))}>
              {dimensionOptions.map((option) => (
                <option key={option.label} value={JSON.stringify({ rows: option.rows, cols: option.cols })}>
                  {option.label}
                </option>
              ))}
            </select>
            <MatrixInput matrix={matrix2} setMatrix={setMatrix2} rows={dimensions2.rows} cols={dimensions2.cols} />
          </div>
        )}
      </div>
      {operation === 'multiply' && !canMultiply() && (
        <p className="error">Cannot multiply: The number of columns in the first matrix must equal the number of rows in the second matrix.</p>
      )}
      <button onClick={handleOperation} disabled={operation === 'multiply' && !canMultiply()}>Perform Operation</button>
      {error && <p className="error">{error}</p>}
      <ResultDisplay result={result} />
    </div>
  );
};

export default MatrixSolver;