

import React, { useState, useEffect } from 'react';
import InputTable from './InputTable';
import Counter from './Counter';
import NeedMatrix from './needMatrix';
import Available from './Available';


function App() {
  const [processCount, setProcessCount] = useState(5);
  const [instances, setInstances] = useState();
  const [allocationMatrix, setAllocationMatrix] = useState([]);
  const [maximumMatrix, setMaximumMatrix] = useState([]);
  const [availableMatrix, setAvailableMatrix] = useState([]);
  const [showNeedMatrix, setShowNeedMatrix] = useState(false);
  const [showAvailableMatrix, setShowAvailableMatrix] = useState(false);
  
  const handleProcessCountChange = (newCount) => {
    setProcessCount(newCount);
  };
  const calculateAvailableMatrix = () => {
    const totalInstances = [10,10,10]; // Replace with actual values
    const allocatedSum = Array(3).fill(0);
  
    // Calculate the sum of allocated resources for each process
    for (let i = 0; i < processCount; i++) {
      for (let j = 0; j < 3; j++) {
        allocatedSum[j] += parseInt(allocationMatrix[i][j]) || 0;
      }
    }
  
    // Subtract the allocated sum from total instances to get available resources
    const availableMatrix = totalInstances.map((total, index) => total - allocatedSum[index]);
  
    setAvailableMatrix(availableMatrix);
  };

  const toggleAvailableMatrix = () => {
    calculateAvailableMatrix(); // Calculate the available matrix before showing it
    setShowAvailableMatrix(!showAvailableMatrix);
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
    } else {
      alert('Invalid data. Please make sure every value in "Maximum" is greater than or equal to "Allocation" and all boxes are filled.');
    }
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Banker's Algo Simulator</h1>
      
      <div className="mb-4">
        <Counter name="No of processes" onCountChange={handleProcessCountChange} />
      </div>
      <br></br>
      <InputTable title="Instances" processCount="1" sub="0" onDataChange={setInstances}/>
    <br></br>
      <InputTable title="Allocation" processCount={processCount} onDataChange={setAllocationMatrix} sub="1"/>
      <InputTable title="Maximum" processCount={processCount} onDataChange={setMaximumMatrix} sub="1"/>

      {showNeedMatrix && (
        <NeedMatrix allocationMatrix={allocationMatrix} maximumMatrix={maximumMatrix} />
      )}

     

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
          onClick={toggleAvailableMatrix}
        >
          {showAvailableMatrix ? 'Hide Available Matrix' : 'Show Available Matrix'}
        </button>
      </div>

      {/* Render the AvailableMatrix component only when showAvailableMatrix is true */}
      {showAvailableMatrix && <Available availableMatrix={availableMatrix} />}

    </div>
  );
}

export default App;
