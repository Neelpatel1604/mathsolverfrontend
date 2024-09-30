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
    <div className="matrix-input">
      <div className="matrix-bracket">[</div>
      <div className="matrix-content">
        {Array(rows).fill().map((_, rowIndex) => (
          <div key={rowIndex} className="matrix-row">
            {Array(cols).fill().map((_, colIndex) => (
              <input
                key={colIndex}
                type="number"
                value={matrix[rowIndex]?.[colIndex] === '' ? '' : matrix[rowIndex]?.[colIndex]}
                onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="matrix-bracket">]</div>
    </div>
  );
};

export default MatrixInput;