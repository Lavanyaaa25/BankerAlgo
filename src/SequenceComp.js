// import React from 'react'
// import Seq from './Seq';

// const SequenceComp = () => {
//     const sequence = ["P1", "P2", "P3", "P4","P5"];
//     return (
//         <div className="container mx-auto p-4">
//             <div className="font-extrabold my-4">Safe Sequence</div>
            
//           <Seq sequence={sequence} />
//         </div>
//       );
// }

// export default SequenceComp

// import React, { useState } from 'react';

// const SequenceComp = ({ allocationMatrix, maximumMatrix, instanceCount }) => {
//   const [safeSequence, setSafeSequence] = useState([]);
//   const [showSafeSequence, setShowSafeSequence] = useState(false);

//   const runBankersAlgorithm = () => {
//     // Implement Banker's Algorithm logic here
//     const n = allocationMatrix.length;
//     const m = allocationMatrix[0].length;

//     // Initialize data structures
//     let f = [];
//     for (let k = 0; k < n; k++) {
//       f[k] = 0;
//     }

//     const need = [];
//     for (let i = 0; i < n; i++) {
//       const need1 = [];
//       for (let j = 0; j < m; j++) {
//         need1.push(maximumMatrix[i][j] - allocationMatrix[i][j]);
//       }
//       need.push(need1);
//     }

//     const ans = [];
//     let ind = 0;

//     // Initialize available resources
//     let avail = [...instanceCount];

//     for (let k = 0; k < n; k++) {
//       for (let i = 0; i < n; i++) {
//         if (f[i] === 0) {
//           let flag = 0;
//           for (let j = 0; j < m; j++) {
//             if (need[i][j] > avail[j]) {
//               flag = 1;
//               break;
//             }
//           }

//           if (flag === 0) {
//             ans[ind++] = i;
//             for (let y = 0; y < m; y++) {
//               avail[y] += allocationMatrix[i][y];
//             }
//             f[i] = 1;
//           }
//         }
//       }
//     }

//     if (ind < n) {
//       setSafeSequence([]);
//       setShowSafeSequence(false);
//     } else {
//       setSafeSequence(ans);
//       setShowSafeSequence(true);
//     }
//   };

//   return (
//     <div>
//       <div className="font-extrabold my-4">Safe Sequence</div>
//       <button onClick={runBankersAlgorithm}>Run Banker's Algorithm</button>
//       {showSafeSequence && (
//         <div className="flex items-center space-x-4">
//           {safeSequence.map((item, index) => (
//             <div key={index} className="flex items-center">
//               {index > 0 && (
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6m0 0l-6 6m6-6H3" />
//                 </svg>
//               )}
//               <div className="bg-blue-200 text-black font-bold px-6 py-2 shadow-xl">P{item + 1}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SequenceComp;


import React, { useState } from 'react';

const SequenceComp = ({ allocationMatrix, maximumMatrix, instanceCount, processCount, validateMatrices }) => {
  const [sequence, setSequence] = useState([]);
  const [showAvailableMatrix, setShowAvailableMatrix] = useState(false);

  const calculateBankersAlgorithm = () => {
    // Implement the Banker's Algorithm logic here
    const n = processCount; // Number of processes
    const m = instanceCount.length; // Number of resource types
    let safeSequence = [];
    let f = Array(n).fill(0);
    let need = [];

    for (let i = 0; i < n; i++) {
      let needRow = [];
      for (let j = 0; j < m; j++) {
        needRow.push(maximumMatrix[i][j] - allocationMatrix[i][j]);
      }
      need.push(needRow);
    }

    let available = [...instanceCount];

    let y = 0;
    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        if (f[i] === 0) {
          let flag = true;
          for (let j = 0; j < m; j++) {
            if (need[i][j] > available[j]) {
              flag = false;
              break;
            }
          }

          if (flag) {
            safeSequence.push(i);
            for (let y = 0; y < m; y++) {
              available[y] += allocationMatrix[i][y];
            }
            f[i] = 1;
          }
        }
      }
    }

    if (safeSequence.length === n) {
      return safeSequence.map((seq) => `P${seq}`);
    } else {
      return ['No safe sequence found'];
    }
  };

  const runBankersAlgorithm = () => {
    if (validateMatrices()) {
      const resultSequence = calculateBankersAlgorithm();
      setSequence(resultSequence);
      setShowAvailableMatrix(true);
    } else {
      alert('Invalid data. Please make sure every value in "Maximum" is greater than or equal to "Allocation" and all boxes are filled.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="font-extrabold my-4">Safe Sequence</div>
      <div className="flex items-center space-x-4">
        {sequence.map((item, index) => (
          <div key={index} className="flex items-center">
            {index > 0 && (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6m0 0l-6 6m6-6H3" />
              </svg>
            )}
            <div className="bg-blue-200 text-black font-bold px-6 py-2 shadow-xl">{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SequenceComp;

