import React from 'react';
import { BiInfoCircle } from 'react-icons/bi';

interface Props {
  message?: string;
}
const ValidataionError = ({ message }: Props) => {
  return (
    <small className="px-1 text-red-500 flex">
      <span className='mr-1 mt-1'>
        <BiInfoCircle />
      </span>
      {message}
    </small>
  );
};

export default ValidataionError;
