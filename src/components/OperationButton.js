import React from 'react';

const OperationButtons = ({ onOperation }) => {
  return (
    <div className="operation-buttons">
      <button onClick={() => onOperation('add')}>Add</button>
      <button onClick={() => onOperation('subtract')}>Subtract</button>
      <button onClick={() => onOperation('multiply')}>Multiply</button>
      <button onClick={() => onOperation('determinant')}>Determinant</button>
      <button onClick={() => onOperation('inverse')}>Inverse</button>
    </div>
  );
};

export default OperationButtons;