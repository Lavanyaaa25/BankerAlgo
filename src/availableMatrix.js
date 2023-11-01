// import React, { useState } from 'react';

// function AvailableMatrix({ allocationMatrix,setAllocationMatrix, processCount, instanceCount }) {
//   const [availableMatrix, setAvailableMatrix] = useState([]);
//   const [showAvailableMatrix, setShowAvailableMatrix] = useState(false);

//   const calculateAvailableMatrix = () => {
//     // Calculate the Available matrix based on your logic
//     const totalInstances = Array(3).fill(0);

//     // Calculate the total allocated instances for each resource
//     for (let i = 0; i < processCount; i++) {
//       for (let j = 0; j < 3; j++) {
//         totalInstances[j] += parseInt(allocationMatrix[i][j] || 0);
//       }
//     }

//     // Calculate the Available matrix
//     const available = Array(3).fill(0);
//     for (let j = 0; j < 3; j++) {
//       available[j] = instanceCount[j] - totalInstances[j];
//     }

//     if (available.some((value) => value < 0)) {
//       alert('Number of instances is less than the total number of allocated instances of that resource type.');
//     } else {
//       setAvailableMatrix(available);
//       setShowAvailableMatrix(true);

//       setAllocationMatrix(Array.from({ length: processCount }, () => Array(3).fill('')));
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-xl font-semibold">Available Matrix</h2>
//       <button onClick={calculateAvailableMatrix}>Calculate Available</button>
//       {showAvailableMatrix && (
//         <table className="table-auto">
//           <thead>
//             <tr>
//               <th className="p-2"></th>
//               <th className="p-2">A</th>
//               <th className="p-2">B</th>
//               <th className="p-2">C</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td className="p-2">Available</td>
//               {availableMatrix.map((value, index) => (
//                 <td key={index} className="p-2">
//                   {value}
//                 </td>
//               ))}
//             </tr>
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default AvailableMatrix;






// AvailableMatrix.js
import React, { useState } from 'react';

function AvailableMatrix({ allocationMatrix, setAllocationMatrix, processCount, instanceCount }) {
  const [availableMatrix, setAvailableMatrix] = useState([]);
  const [showAvailableMatrix, setShowAvailableMatrix] = useState(false);

  const calculateAvailableMatrix = () => {
    // Calculate the Available matrix based on your logic
    const totalInstances = Array(3).fill(0);

    // Calculate the total allocated instances for each resource
    for (let i = 0; i < processCount; i++) {
      for (let j = 0; j < 3; j++) {
        totalInstances[j] += parseInt(allocationMatrix[i][j] || 0);
      }
    }

    // Calculate the Available matrix
    const available = Array(3).fill(0);
    for (let j = 0; j < 3; j++) {
      available[j] = instanceCount[j] - totalInstances[j];
    }

    if (available.some((value) => value < 0)) {
      alert('Number of instances is less than the total number of allocated instances of that resource type.');

      // Reset the allocationMatrix when alert is shown
      setAllocationMatrix(Array.from({ length: processCount }, () => Array(3).fill('')));
    } else {
      setAvailableMatrix(available);
      setShowAvailableMatrix(true);
    }
  };

  return (
    <div>
      <div className="p-4">
        <h2 className="text-xl font-semibold">Available Matrix</h2>
        <button onClick={calculateAvailableMatrix} className="button">
          Calculate Available
        </button>
        {showAvailableMatrix && (
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
                    <td key={index} className="matrix-cell">
                      {value}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AvailableMatrix;
