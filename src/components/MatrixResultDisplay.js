import React from 'react';

const MatrixResultDisplay = ({ result }) => {
  if (result === null) return null;

  return (
    <div className="mt-8 flex flex-col items-center">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Result:</h3>
      {typeof result === 'number' ? (
        <div className="text-2xl font-mono text-indigo-900">
          {result.toFixed(2)}
        </div>
      ) : Array.isArray(result) ? (
        <div className="flex items-center justify-center my-5 font-mono">
          <div className="text-4xl px-2 text-gray-700">[</div>
          <div className="flex flex-col">
            {result.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center">
                {row.map((cell, colIndex) => (
                  <span 
                    key={colIndex} 
                    className="w-[60px] text-right p-1.5 text-base text-gray-800"
                  >
                    {typeof cell === 'number' ? cell.toFixed(2) : cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className="text-4xl px-2 text-gray-700">]</div>
        </div>
      ) : (
        <div className="text-red-600 bg-red-50 px-4 py-2 rounded-md">
          Invalid result format
        </div>
      )}
    </div>
  );
};

export default MatrixResultDisplay;