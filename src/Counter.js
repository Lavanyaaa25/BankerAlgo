import React, { useState } from 'react';

const Counter = ({name}) => {
  const [count, setCount] = useState(0);

  const handleCountChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setCount(newValue);
    } else if (e.target.value === "") {
      setCount(0);
    }
  };

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div className=" p-4 rounded-md shadow-xl inline-block m-4">
      <h2 className="text-xl font-semibold">Instances of {name}</h2>
      <div className="flex items-center my-2">
        <button className="bg-gray-500 text-white p-2 rounded-l" onClick={decrement}>
          -
        </button>
        <input
          type="number"
          className="w-16 bg-gray-200 p-2 text-center"
          value={count}
          onChange={handleCountChange}
        />
        <button className="bg-gray-500 text-white p-2 rounded-r" onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
