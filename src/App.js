

import React, { useState, useEffect } from 'react';
import InputTable from './InputTable';
import Counter from './Counter';
import Counter2 from './Counter2';
import NeedMatrix from './needMatrix';
import AvailableMatrix from './availableMatrix';

function App() {
  const [processCount, setProcessCount] = useState(5);
  const [allocationMatrix, setAllocationMatrix] = useState([]);
  const [maximumMatrix, setMaximumMatrix] = useState([]);
  const [showNeedMatrix, setShowNeedMatrix] = useState(false);
  const [showAvailableMatrix, setShowAvailableMatrix] = useState(false); 
  const [availableMatrix, setAvailableMatrix] = useState([]);
  const [instanceCount, setInstanceCount] = useState([10, 10, 10]);

  

  const handleProcessCountChange = (newCount) => {
    setProcessCount(newCount);
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

  const calculateNeedMatrix = () => {
    if (validateMatrices()) {
      setShowNeedMatrix(true);
      setShowAvailableMatrix(false); // Hide the AvailableMatrix
    } else {
      alert('Invalid data. Please make sure every value in "Maximum" is greater than or equal to "Allocation" and all boxes are filled.');
    }
  };

  // const calculateAvailableMatrix = () => {
  //   const totalInstances = Array(3).fill(0);

  //   for (let i = 0; i < processCount; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       totalInstances[j] += parseInt(allocationMatrix[i][j] || 0);
  //     }
  //   }

  //   const available = Array(3).fill(0);
  //   for (let j = 0; j < 3; j++) {
  //     available[j] = instanceCount[j] - totalInstances[j];
  //   }
  
  //   if (available.every((value) => value >= 0) && allocationMatrix.every(row => row.every(cell => cell !== ''))) {
  //     setShowAvailableMatrix(true);
  //     setAvailableMatrix(available); // Set the Available Matrix state
  //   } else {
  //     alert('Invalid data for Available Matrix.');
  //   }
  // };

  
  const calculateAvailableMatrix = () => {
    const totalInstances = Array(3).fill(0);
  
    for (let i = 0; i < processCount; i++) {
      for (let j = 0; j < 3; j++) {
        totalInstances[j] += parseInt(allocationMatrix[i][j] || 0);
      }
    }
  
    const available = Array(3).fill(0);
    for (let j = 0; j < 3; j++) {
      available[j] = instanceCount[j] - totalInstances[j];
    }
  
    if (available.every((value) => value >= 0) && allocationMatrix.every(row => row.every(cell => cell !== ''))) {
      setShowAvailableMatrix(true);
      setAvailableMatrix(available);
    } else {
      alert('Invalid data for Available Matrix.');
    }
  };


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Banker's Algo Simulator</h1>
      <Counter name="A" instanceCount={instanceCount} setInstanceCount={setInstanceCount} resourceIndex={0} />
<Counter name="B" instanceCount={instanceCount} setInstanceCount={setInstanceCount} resourceIndex={1} />
<Counter name="C" instanceCount={instanceCount} setInstanceCount={setInstanceCount} resourceIndex={2} />
      <div className="mb-4">
        <Counter2 name="No of processes" onCountChange={handleProcessCountChange} />
      </div>
      <br></br>

      <InputTable title="Allocation" processCount={processCount} onDataChange={setAllocationMatrix} />
      <InputTable title="Maximum" processCount={processCount} onDataChange={setMaximumMatrix} />

      {showNeedMatrix && (
        <NeedMatrix allocationMatrix={allocationMatrix} maximumMatrix={maximumMatrix} />
      )}

      {showAvailableMatrix && (
        <AvailableMatrix allocationMatrix={allocationMatrix} instanceCount={instanceCount} />
      )}

      <div className="button-container">
      <button
  className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-pink-600 to-red-500 hover:from-pink-500 hover:to-red-400 active:from-pink-700 active:to-red-600 focus-visible:ring ring-pink-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2 calculate-button"
  onClick={calculateNeedMatrix}
>
  Calculate Need
</button>

<button
  className="flex sm:inline-flex justify-center items-center bg-gradient-to-tr from-pink-600 to-red-500 hover:from-pink-500 hover:to-red-400 active:from-pink-700 active:to-red-600 focus-visible:ring ring-pink-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2 calculate-button"
  onClick={calculateAvailableMatrix}
>
  Calculate Available
</button>

      </div>
    </div>
  );
}

export default App;
