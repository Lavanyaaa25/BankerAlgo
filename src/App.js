

import React, { useState, useEffect } from 'react';
import InputTable from './InputTable';
import Counter from './Counter';
import NeedMatrix from './needMatrix';
import Available from './Available';
import SafeSequence from './safeSequence';

// ... (existing imports)

function App() {
  const [processCount, setProcessCount] = useState(5);
  const [instances, setInstances] = useState([0, 0, 0]); // Initialize with zeros
  const [allocationMatrix, setAllocationMatrix] = useState([]);
  const [maximumMatrix, setMaximumMatrix] = useState([]);
  const [availableMatrix, setAvailableMatrix] = useState([]);
  const [needMatrix, setNeedMatrix] = useState([]);
  const [safeSequence, setSafeSequence] = useState([]);
  const [showSafeSequence, setShowSafeSequence] = useState(false);
  const [showNeedMatrix, setShowNeedMatrix] = useState(false);
  const [showAvailableMatrix, setShowAvailableMatrix] = useState(false);

  const handleProcessCountChange = (newCount) => {
    setProcessCount(newCount);
  };

  // *****************AVAILABLE MATRIX*****************

  const calculateAvailableMatrix = () => {
    // Check if instances and allocationMatrix are completely filled
    if (
      instances.some((value) => value === 0) ||
      allocationMatrix.some((row) => row.some((value) => value === ''))
    ) {
      alert('Please fill in all instances and allocation matrix values.');
      return;
    }

    const allocatedSum = Array(3).fill(0);

    // Calculate the sum of allocated resources for each process
    for (let i = 0; i < processCount; i++) {
      for (let j = 0; j < 3; j++) {
        allocatedSum[j] += parseInt(allocationMatrix[i][j]) || 0;
      }
    }

    // Subtract the allocated sum from total instances to get available resources
    const availableMatrix = instances.map((total, index) => total - allocatedSum[index]);

    // Check if availableMatrix has negative values
    if (availableMatrix.some((value) => value < 0)) {
      alert('Invalid data for Available Matrix. It should not have negative values.');
      return;
    }

    setAvailableMatrix(availableMatrix);
    setShowAvailableMatrix(true);
  };

  const initializeMatrices = (count) => {
    const initialAllocationMatrix = Array.from({ length: count }, () => Array(3).fill(''));
    const initialMaximumMatrix = Array.from({ length: count }, () => Array(3).fill(''));
    setAllocationMatrix(initialAllocationMatrix);
    setMaximumMatrix(initialMaximumMatrix);
  };

  useEffect(() => {
    initializeMatrices(processCount);
  }, [processCount]);

  const validateMatrices = () => {
    for (let i = 0; i < processCount; i++) {
      for (let j = 0; j < 3; j++) {
        const allocatedVal = parseInt(allocationMatrix[i][j]);
        const maxVal = parseInt(maximumMatrix[i][j]);
        if (isNaN(allocatedVal) || isNaN(maxVal) || maxVal < allocatedVal) {
          return false;
        }
      }
    }

    for (let i = 0; i < processCount; i++) {
      for (let j = 0; j < 3; j++) {
        if (allocationMatrix[i][j] === '' || maximumMatrix[i][j] === '') {
          return false;
        }
      }
    }

    return true;
  };

  // *****************NEED MATRIX*****************

  const calculateNeedMatrix = () => {

    if (!validateMatrices()) {
          alert('Invalid data. Please make sure every value in "Maximum" is greater than or equal to "Allocation" and all boxes are filled.');
          return;
        }
    for (let i = 0; i < allocationMatrix.length; i++) {
      const needRow = [];
      for (let j = 0; j < allocationMatrix[i].length; j++) {
        const maxVal = parseInt(maximumMatrix[i][j]);
        const allocatedVal = parseInt(allocationMatrix[i][j]);

        if (!isNaN(maxVal) && !isNaN(allocatedVal)) {
          needRow.push(maxVal - allocatedVal);
        } else {
          needRow.push('');
        }
      }
      needMatrix.push(needRow);
    }
    setNeedMatrix(needMatrix);
    setShowNeedMatrix(true);
  };
  
  // *****************SAFE SEQUENCE*****************

  const calculateSafeSequence = () => {

    if(availableMatrix.length === 0 || needMatrix.length === 0)
    {
      alert('Calculate the Need and Available Matrix First');
      return
    }

    if (!validateMatrices()) {
      alert('Invalid input. Please check allocation and maximum matrices.');
      return;
    }
  
    const work = [...availableMatrix];
    const finish = Array(processCount).fill(false);
  
    for (let k = 0; k < processCount; k++) {
      for (let i = 0; i < processCount; i++) {
        if (!finish[i]) {
          let canAllocate = true;
  
          for (let j = 0; j < 3; j++) {
            if (needMatrix[i][j] > work[j]) {
              canAllocate = false;
              break;
            }
          }
  
          if (canAllocate) {
            for (let j = 0; j < 3; j++) {
              work[j] += parseInt(allocationMatrix[i][j]);
            }

            finish[i] = true;
            safeSequence.push(i + 1); 
          }
        }
      }
    }
    setSafeSequence(safeSequence);
    setShowSafeSequence(true);
  }; 


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Banker's Algo Simulator</h1>

      <div className="mb-4">
        <Counter name="No of processes" onCountChange={handleProcessCountChange} />
      </div>
      <br></br>
      <InputTable title="Instances" processCount="1" sub="0" onDataChange={(data) => setInstances(data[0])} />
      <br></br>
      <InputTable title="Allocation" processCount={processCount} onDataChange={setAllocationMatrix} sub="1" />
      <InputTable title="Maximum" processCount={processCount} onDataChange={setMaximumMatrix} sub="1" />

      {showNeedMatrix && (
        <NeedMatrix needMatrix={needMatrix} />
      )}


      {/* Render the AvailableMatrix component only when showAvailableMatrix is true */}
      {showAvailableMatrix && <Available availableMatrix={availableMatrix} />}

      {showSafeSequence && <SafeSequence safeSequence={safeSequence} processCount={processCount} />}
      
      <div className="button-container">
        <button
          className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-pink-600 to-red-500 hover:from-pink-500 hover:to-red-400 active:from-pink-700 active:to-red-600 focus-visible:ring ring-pink-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2 calculate-button"
          onClick={calculateNeedMatrix}
        >
          Calculate Need
        </button>
      </div>
      <div className="button-container">
        <button
          className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 active:from-blue-600 active:to-indigo-600 focus-visible:ring ring-blue-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2 calculate-button"
          onClick={calculateAvailableMatrix}
        >
          Show Available Matrix
        </button>
      </div>
      <div className="button-container">
        <button
          className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 active:from-blue-600 active:to-indigo-600 focus-visible:ring ring-blue-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2 calculate-button"
          onClick={calculateSafeSequence}
        >
          Show SafeSequence
        </button>
      </div>

    </div>
  );
}

export default App;

