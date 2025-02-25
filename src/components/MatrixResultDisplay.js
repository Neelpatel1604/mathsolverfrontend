import React from 'react';

const MatrixResultDisplay = ({ result, isDark }) => {
  if (result === null) return null;

  return (
    <div className={`mt-6 p-5 ${
      isDark 
        ? 'bg-gray-700 border-gray-600 text-white' 
        : 'bg-gray-50 border-gray-200'
    } rounded-lg w-full text-center border-2`}>
      <h3 className={`text-xl mb-2 ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Result:</h3>
      {typeof result === 'number' ? (
        <div className={`text-2xl font-mono ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
          {result.toFixed(2)}
        </div>
      ) : Array.isArray(result) ? (
        <div className="flex items-center justify-center my-5 font-mono">
          <div className={`text-4xl px-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>[</div>
          <div className="flex flex-col">
            {result.map((row, rowIndex) => (
              <div key={rowIndex} className="flex justify-center">
                {row.map((cell, colIndex) => (
                  <span 
                    key={colIndex} 
                    className={`w-[60px] text-right p-1.5 text-base ${
                      isDark ? 'text-gray-200' : 'text-gray-800'
                    }`}
                  >
                    {typeof cell === 'number' ? cell.toFixed(2) : cell}
                  </span>
                ))}
              </div>
            ))}
          </div>
          <div className={`text-4xl px-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>]</div>
        </div>
      ) : (
        <div className={`px-4 py-2 rounded-md ${
          isDark 
            ? 'bg-red-900/50 text-red-200 border border-red-700' 
            : 'bg-red-50 text-red-600'
        }`}>
          Invalid result format
        </div>
      )}
    </div>
  );
};

export default MatrixResultDisplay;