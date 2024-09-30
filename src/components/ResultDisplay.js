import React from 'react';

const ResultDisplay = ({ result }) => {
  if (result === null) return null;

  return (
    <div className="result-display">
      <h3>Result:</h3>
      {typeof result === 'number' ? (
        <div className="scalar-result">{result.toFixed(2)}</div>
      ) : Array.isArray(result) ? (
        <div className="matrix-result">
          <div className="matrix-bracket">[</div>
          <div className="matrix-content">
            {result.map((row, rowIndex) => (
              <div key={rowIndex} className="matrix-row">
                {row.map((cell, colIndex) => (
                  <span key={colIndex} className="matrix-cell">
                    {typeof cell === 'number' ? cell.toFixed(2) : cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="matrix-bracket">]</div>
        </div>
      ) : (
        <div className="invalid-result">Invalid result format</div>
      )}
    </div>
  );
};

export default ResultDisplay;