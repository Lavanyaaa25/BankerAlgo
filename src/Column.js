import React from 'react';

const Column = ({ data, onDataChange, colIndex }) => {
  return (
    <td className=" p-2 m-2">
      <input
        type="text"
        className="w-16 border-2 rounded p-1 text-center" 
        value={data}
        onChange={(e) => onDataChange(e, colIndex)}
      />
    </td>
  );
};

export default Column;
