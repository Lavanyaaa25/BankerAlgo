
import React from 'react';

const SafeSequence = ({ safeSequence, processCount }) => {
  
  return (
    <div className="mt-4 p-4 border-b border-l border-r rounded-md shadow-lg bg-white text-center">
      <div className="font-bold my-4 text-green-700 text-3xl">
        {safeSequence.length === processCount ? (
          <>
            System is in safe state. <br />
            Safe Sequence: 
          </>
        ) : (
          <span className="text-red-700">
            System is in unsafe state. <br/>
            Safe sequence does not exist!
          </span>
        )}
      </div>

      {safeSequence.length > 0 && (
        <div className="flex items-center justify-center mt-4">
          {safeSequence.map((item, index) => (
            <div key={index} className="flex items-center mx-2">
              {index > 0 && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-black-400 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6l6 6m0 0l-6 6m6-6H3" />
                </svg>
              )}
              <div className="bg-green-200 text-black font-bold px-6 py-2 shadow-xl">P{item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SafeSequence;
