// AvailableMatrix.js
import React from 'react';
import Column from './Column';

const AvailableMatrix = ({ availableMatrix }) => {
  return (
    <div className="mt-4 bg-white shadow-xl inline-block p-4 m-4">
      <div className="text-center mb-4">
        <h2 className="text-xl font-semibold py-2">Available Matrix</h2>
        <div className="w-16 mx-auto border-b-2"></div>
      </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th className="p-2"></th>
            <th className="p-2">A</th>
            <th className="p-2">B</th>
            <th className="p-2">C</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="p-2">Available</th>
            {availableMatrix.map((data, colIndex) => (
              <Column
                key={colIndex}
                data={data < 0 ? 'Invalid' : data.toString()} // Display 'Invalid' if the value is negative
                colIndex={colIndex}
                rowIndex={0} // Assuming available matrix is a single row
              />
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AvailableMatrix;
