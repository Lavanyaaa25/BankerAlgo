import React from 'react'

const SafeSequence = ({ safeSequence , processCount }) => {
    // console.log(safeSequence);
    const sequence = safeSequence.join(' -> ');
  return (
    <div>
        {(safeSequence.length === processCount)?
      <div>System is in a safe state. Safe Sequence: {sequence}</div> : 
      <div>'System is in an unsafe state. No safe sequence exists.</div>
    }
    
    </div>
  )
}

export default SafeSequence