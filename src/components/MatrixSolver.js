import React, { useState, useEffect, useRef } from 'react';
import MatrixInput from './MatrixInput';
import MatrixResultDisplay from './MatrixResultDisplay';
import axios from 'axios';

const MatrixSolver = ({ isDark }) => {
  const [matrix1, setMatrix1] = useState([['', ''], ['', '']]);
  const [matrix2, setMatrix2] = useState([['', ''], ['', '']]);
  const [result, setResult] = useState(null);
  const [dimensions1, setDimensions1] = useState({ rows: 2, cols: 2 });
  const [dimensions2, setDimensions2] = useState({ rows: 2, cols: 2 });
  const [operation, setOperation] = useState('add');
  const [error, setError] = useState(null);
  const [multiplyOrder, setMultiplyOrder] = useState('1x2');
  const [selectedDimension, setSelectedDimension] = useState('1x2');
  const [isOperationDropdownOpen, setIsOperationDropdownOpen] = useState(false);
  const [isMultiplyOrderDropdownOpen, setIsMultiplyOrderDropdownOpen] = useState(false);
  const [isDimensions1DropdownOpen, setIsDimensions1DropdownOpen] = useState(false);
  const [isDimensions2DropdownOpen, setIsDimensions2DropdownOpen] = useState(false);
  
  // Create refs for the dropdowns
  const operationDropdownRef = useRef(null);
  const dimensions1DropdownRef = useRef(null);
  const dimensions2DropdownRef = useRef(null);
  const dimensionDropdownRef = useRef(null);
  
  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (operationDropdownRef.current && !operationDropdownRef.current.contains(event.target)) {
        setIsOperationDropdownOpen(false);
      }
      if (dimensions1DropdownRef.current && !dimensions1DropdownRef.current.contains(event.target)) {
        setIsDimensions1DropdownOpen(false);
      }
      if (dimensions2DropdownRef.current && !dimensions2DropdownRef.current.contains(event.target)) {
        setIsDimensions2DropdownOpen(false);
      }
      if (dimensionDropdownRef.current && !dimensionDropdownRef.current.contains(event.target)) {
        setIsMultiplyOrderDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const dimensionsOptions = [
    { value: '1x2', label: 'M₁ × M₂' },
    { value: '2x1', label: 'M₂ × M₁' },
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
  
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';
  
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
    <div className={`flex flex-col  items-center  p-8 max-w-[650px] mx-auto my-8 
      ${isDark ? 'bg-gray-800 text-white' : 'bg-white'} rounded-xl font-sans shadow-lg`}>
      <h2 className={`${isDark ? 'text-white' : 'text-black'} mb-8 text-center text-3xl font-semibold tracking-tight`}>
        Matrix Solver
      </h2>
      
      <div className="flex items-center mr-20 ml-20 gap-2.5 mb-8 text-lg w-full max-w-[250px] mx-auto">
        <label className={`font-medium  ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Operation: </label>
        
        {/* Custom Operation Dropdown */}
        <div className="relative w-full" ref={operationDropdownRef}>
          <button
            type="button"
            onClick={() => setIsOperationDropdownOpen(!isOperationDropdownOpen)}
            className={` w-250 p-3 border-2 ${
              isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'
            } rounded-lg text-base flex justify-between items-center cursor-pointer focus:outline-none
            focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
          >
            <span>{operationOptions.find(op => op.value === operation)?.label}</span>
            <svg
              className={`w-5 h-5 transition-transform ${isOperationDropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOperationDropdownOpen && (
            <div className={`absolute top-full left-0 w-full  mt-1 border-2 ${
              isDark
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-200'
            } rounded-lg shadow-lg z-10`}>
              {operationOptions.map((op) => (
                <button
                  key={op.value}
                  type="button"
                  onClick={() => {
                    setOperation(op.value);
                    setIsOperationDropdownOpen(false);
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

      {operation === 'multiply' && (
        <div className="mb-4 w-full max-w-[200px] mx-auto">
          <div className="relative w-full" ref={dimensionDropdownRef}>
            <button
              type="button"
              onClick={() => setIsMultiplyOrderDropdownOpen(!isMultiplyOrderDropdownOpen)}
              className={`w-full p-3 border-2 ${
                isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'
              } rounded-lg text-base flex justify-between items-center cursor-pointer focus:outline-none
              focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
            >
              <span>{dimensionsOptions.find(op => op.value === selectedDimension)?.label}</span>
              <svg
                className={`w-5 h-5 transition-transform ${isMultiplyOrderDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isMultiplyOrderDropdownOpen && (
              <div className={`absolute top-full left-0 w-full mt-1 border-2 ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200'
              } rounded-lg shadow-lg z-10`}>
                {dimensionsOptions.map((op) => (
                  <button
                    key={op.value}
                    type="button"
                    onClick={() => {
                      setSelectedDimension(op.value);
                      setMultiplyOrder(op.value);
                      setIsMultiplyOrderDropdownOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white
                      ${selectedDimension === op.value
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
      )}

      <div className="flex justify-center  mb-8 gap-12 md:flex-row flex-col ">
        <div className="flex flex-col items-center gap-4">
          <h3 className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xl mb-4`}>M₁</h3>
          
          {/* Custom Dimensions1 Dropdown */}
          <div className="flex justify-center w-full mb-4">
            <div className="relative " ref={dimensions1DropdownRef}>
              <button
                type="button"
                onClick={() => setIsDimensions1DropdownOpen(!isDimensions1DropdownOpen)}
                className={`w-full p-3 border-2 ${
                  isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'
                } rounded-lg text-base flex justify-between items-center cursor-pointer focus:outline-none
                focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
              >
                <span>{dimensionOptions.find(dim => dim.rows === dimensions1.rows && dim.cols === dimensions1.cols)?.label || '2x2'}</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isDimensions1DropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDimensions1DropdownOpen && (
                <div className={`absolute top-full left-0 w-full mt-1 border-2 ${
                  isDark
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200'
                } rounded-lg shadow-lg z-10`}>
                  {dimensionOptions.map((dim) => (
                    <button
                      key={dim.label}
                      type="button"
                      onClick={() => {
                        handleDimensionChange(1, { rows: dim.rows, cols: dim.cols });
                        setIsDimensions1DropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white
                        ${(dimensions1.rows === dim.rows && dimensions1.cols === dim.cols)
                          ? 'bg-indigo-600 text-white'
                          : isDark ? 'text-gray-200' : 'text-gray-700'
                        } transition-colors first:rounded-t-lg last:rounded-b-lg`}
                    >
                      {dim.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <MatrixInput matrix={matrix1} setMatrix={setMatrix1} rows={dimensions1.rows} cols={dimensions1.cols} isDark={isDark} />
        </div>

        {(operation !== 'determinant' && operation !== 'inverse') && (
          <div className="flex flex-col items-center gap-4">
            <h3 className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-xl mb-4`}>M₂</h3>
            
            {/* Custom Dimensions2 Dropdown */}
            <div className="flex justify-center w-full mb-4">
              <div className="relative " ref={dimensions2DropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsDimensions2DropdownOpen(!isDimensions2DropdownOpen)}
                  className={`w-full p-3 border-2 ${
                    isDark ? 'border-gray-600 bg-gray-700 text-white' : 'border-gray-200 bg-gray-50'
                  } rounded-lg text-base flex justify-between items-center cursor-pointer focus:outline-none
                  focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/10`}
                >
                  <span>{dimensionOptions.find(dim => dim.rows === dimensions2.rows && dim.cols === dimensions2.cols)?.label || '2x2'}</span>
                  <svg
                    className={`w-5 h-5 transition-transform ${isDimensions2DropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isDimensions2DropdownOpen && (
                  <div className={`absolute top-full left-0 w-full mt-1 border-2 ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-200'
                  } rounded-lg shadow-lg z-10`}>
                    {dimensionOptions.map((dim) => (
                      <button
                        key={dim.label}
                        type="button"
                        onClick={() => {
                          handleDimensionChange(2, { rows: dim.rows, cols: dim.cols });
                          setIsDimensions2DropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-indigo-600 hover:text-white
                          ${(dimensions2.rows === dim.rows && dimensions2.cols === dim.cols)
                            ? 'bg-indigo-600 text-white'
                            : isDark ? 'text-gray-200' : 'text-gray-700'
                          } transition-colors first:rounded-t-lg last:rounded-b-lg`}
                      >
                        {dim.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <MatrixInput matrix={matrix2} setMatrix={setMatrix2} rows={dimensions2.rows} cols={dimensions2.cols} isDark={isDark} />
          </div>
        )}
      </div>

      {operation === 'multiply' && !canMultiply() && (
        <p className={`${
          isDark 
            ? 'text-red-400 bg-red-900/50 border-red-700' 
            : 'text-red-600 bg-red-50 border-red-200'
        } mb-4 text-sm text-center border rounded-md px-4 py-2`}>
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
        className={`bg-indigo-600 text-white py-3.5 px-8 rounded-lg text-base font-semibold cursor-pointer 
                 transition-all mt-6 min-w-[200px] shadow-md hover:bg-indigo-800 hover:-translate-y-0.5 
                 hover:shadow-lg active:translate-y-0 active:shadow disabled:bg-gray-400 disabled:cursor-not-allowed`}
      >
        Calculate
      </button>
      
      {error && (
        <p className={`mt-4 ${isDark ? 'text-red-400 bg-red-900/50 border-red-700' : 'text-red-600 bg-red-50 border-red-200'} 
                    text-sm font-medium text-center py-3 px-4 rounded-md border`}>
          {error}
        </p>
      )}
      <MatrixResultDisplay result={result} isDark={isDark} />
    </div>
  );
};

export default MatrixSolver;