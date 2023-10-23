import React from 'react'
import Seq from './Seq';

const SequenceComp = () => {
    const sequence = ["P1", "P2", "P3", "P4","P5"];
    return (
        <div className="container mx-auto p-4">
            <div className="font-extrabold my-4">Safe Sequence</div>
            
          <Seq sequence={sequence} />
        </div>
      );
}

export default SequenceComp
