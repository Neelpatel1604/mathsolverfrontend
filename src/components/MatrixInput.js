import React from 'react';

const MatrixInput = ({ matrix, setMatrix, rows, cols }) => {
  const handleInputChange = (rowIndex, colIndex, value) => {
    const newMatrix = matrix.map((row, rIndex) =>
      rIndex === rowIndex
        ? row.map((cell, cIndex) =>
            cIndex === colIndex ? (value === '' ? '' : Number(value)) : cell
          )
        : row
    );
    setMatrix(newMatrix);
  };

  return (
    <div className="flex items-center">
      <div className="text-4xl px-2.5">
        [
      </div>
      <div className="flex flex-col">
        {Array(rows).fill().map((_, rowIndex) => (
          <div key={rowIndex} className="flex">
            {Array(cols).fill().map((_, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={matrix[rowIndex]?.[colIndex] === '' ? '' : matrix[rowIndex]?.[colIndex]}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                onFocus={(e) => e.target.select()}
                className="w-[50px] h-[30px] m-0.5 text-center text-base p-1.5 border border-gray-300 rounded focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="text-4xl px-2.5">
        ]
      </div>
    </div>
  );
};

export default MatrixInput;