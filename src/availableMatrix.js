import React from 'react';
import Column from './Column';

function AvailableMatrix({ allocationMatrix, instanceCount }) {
  const calculateAvailableMatrix = () => {
    const totalInstances = Array(3).fill(0);

    for (let i = 0; i < allocationMatrix.length; i++) {
      for (let j = 0; j < 3; j++) {
        const allocatedVal = parseInt(allocationMatrix[i][j] || 0);
        totalInstances[j] += allocatedVal;
      }
    }

    const available = Array(3).fill(0);
    for (let j = 0; j < 3; j++) {
      available[j] = instanceCount[j] - totalInstances[j];
    }

    return available;
  };

  const availableMatrix = calculateAvailableMatrix();

  return (
    <div className="mt-4 bg-white shadow-xl inline-block p-4 m-4">
      <h2 className="text-xl font-semibold">Available Matrix</h2>
      <div className="matrix-container">
        <table className="matrix-table">
          <thead>
            <tr>
              <th className="matrix-header"></th>
              <th className="matrix-header">A</th>
              <th className="matrix-header">B</th>
              <th className="matrix-header">C</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="matrix-label">Available</td>
              {availableMatrix.map((value, index) => (
                <Column
                  key={index}
                  data={value >= 0 ? value.toString() : '0'}
                  colIndex={index}
                  rowIndex={0}
                />
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AvailableMatrix;
