import React from 'react';

const Seq = ({ sequence }) => {
    return (
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
      );
};

export default Seq;
