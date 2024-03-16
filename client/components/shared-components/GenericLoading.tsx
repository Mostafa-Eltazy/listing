import React from 'react';
import { MdOutlineHomeWork } from "react-icons/md";

const GenericLoading = () => {
  return (
    <div className="text-black bg-white" style={{ height: '100vh' }}>
      <div className="flex justify-center items-center py-24 h-full">
        <MdOutlineHomeWork className="pulsate-fwd" style={{ fontSize: '250px' }} />

      </div>
    </div>
  );
};

export default GenericLoading;
