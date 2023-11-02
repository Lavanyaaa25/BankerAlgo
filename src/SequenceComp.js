
import React, { useState } from 'react';

const SequenceComp = ({ allocationMatrix, maximumMatrix, instanceCount }) => {
  const [safeSequence, setSafeSequence] = useState([]);
  const [showSafeSequence, setShowSafeSequence] = useState(false);

  const runBankersAlgorithm = () => {
    // Implement Banker's Algorithm logic here
    const n = allocationMatrix.length;
    const m = allocationMatrix[0].length;

    // Initialize data structures
    let f = [];
    for (let k = 0; k < n; k++) {
      f[k] = 0;
    }

    const need = [];
    for (let i = 0; i < n; i++) {
      const need1 = [];
      for (let j = 0; j < m; j++) {
        need1.push(maximumMatrix[i][j] - allocationMatrix[i][j]);
      }
      need.push(need1);
    }

    const ans = [];
    let ind = 0;

    // Initialize available resources
    let avail = [...instanceCount];

    for (let k = 0; k < n; k++) {
      for (let i = 0; i < n; i++) {
        if (f[i] === 0) {
          let flag = 0;
          for (let j = 0; j < m; j++) {
            if (need[i][j] > avail[j]) {
              flag = 1;
              break;
            }
          }

          if (flag === 0) {
            ans[ind++] = i;
            for (let y = 0; y < m; y++) {
              avail[y] += allocationMatrix[i][y];
            }
            f[i] = 1;
          }
        }
      }
    }

    if (ind < n) {
      setSafeSequence([]);
      setShowSafeSequence(false);
    } else {
      setSafeSequence(ans);
      setShowSafeSequence(true);
    }
  };

  return (
    <div>
      <div className="font-extrabold my-4">Safe Sequence</div>
      <button onClick={runBankersAlgorithm}>Run Banker's Algorithm</button>
      {showSafeSequence && (
        <div className="flex items-center space-x-4">
          {safeSequence.map((item, index) => (
            <div key={index} className="flex items-center">
              {index > 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6m0 0l-6 6m6-6H3" />
                </svg>
              )}
              <div className="bg-blue-200 text-black font-bold px-6 py-2 shadow-xl">P{item + 1}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SequenceComp;


