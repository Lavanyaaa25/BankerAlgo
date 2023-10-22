import React from 'react';
import InputTable from './InputTable';
import Counter from './Counter';

function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Banker's Algo Simulator</h1>
      <Counter name="A"/>
      <Counter name="B"/>
      <Counter name="C"/>
      <br></br>
      <InputTable title="Allocation" />
      <InputTable title="Maximum"/>
      <InputTable title="Need"/>
    </div>
  );
}

export default App;
