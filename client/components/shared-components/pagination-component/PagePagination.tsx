import React from 'react';
import Paginator from './Paginator';

interface Props {
  currentPage: number;
  totalPages : number;
  moveForward: () => void;
  moveBackward: () => void;
  selectPage: (page: number) => void;
  
}
const PagePagination = ({currentPage, totalPages, moveForward, moveBackward, selectPage}:Props) => {
  return (
    <div className='flex flex-col md:flex-row items-center justify-between bg-gray-100 border-x-slate-500 shadow-sm p-2 rounded mt-5 mb-10'>
      <div>showing {currentPage} out of {totalPages}</div>
      <Paginator currentPage={currentPage} numberOfPages={totalPages} moveForward={moveForward} moveBackward={moveBackward} selectPage={selectPage}/>
    </div>
  );
};

export default PagePagination;
