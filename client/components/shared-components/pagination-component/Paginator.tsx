import React from 'react';
import { HiArrowRight, HiArrowLeft } from 'react-icons/hi';

interface props {
  currentPage: number;
  numberOfPages: number;
  moveForward: () => void;
  moveBackward: () => void;
  selectPage: (page: number) => void;
}
const Paginator = ({ currentPage, numberOfPages, moveForward, moveBackward, selectPage }: props) => {
  const pages = Array.from(Array(numberOfPages).keys()).map(page => page + 1);
  const btnStyle = 'm-1 rounded px-2 py-1 hover:bg-slate-200 disabled:opacity-50 disabled:bg-slate-200';
  const currBtnStyle = 'm-1 rounded-top px-2 py-1 hover:bg-slate-200 disabled:opacity-50 disabled:bg-slate-200 border-b border-sky-500';

  return (
    <div className="border flex items-center">
      <button className={btnStyle} disabled={numberOfPages < 1 || currentPage === 1} onClick={moveBackward}>
        <HiArrowLeft />
      </button>
      {numberOfPages > 5 ? (
        <>
          {currentPage > 1 ? (
            <>
              {currentPage > 1 ? (
                <>
                  {pages.slice(0, 1).map(page => {
                    return (
                      <button className={page === currentPage ? currBtnStyle : btnStyle} key={page} onClick={() => selectPage(page)}>
                        {page}
                      </button>
                    );
                  })}
                  {currentPage > 2 ? <span className="m-1">...</span> : null}
                </>
              ) : null}
            </>
          ) : null}
          {(currentPage >= numberOfPages - 2 ? pages.slice(numberOfPages - 3, numberOfPages) : pages.slice(currentPage - 1, currentPage + 2)).map(page => {
            return (
              <button className={page === currentPage ? currBtnStyle : btnStyle} key={page} onClick={() => selectPage(page)}>
                {page}
              </button>
            );
          })}
          {
            <>
              {currentPage < numberOfPages - 2 ? (
                <>
                  {currentPage < numberOfPages - 2 ? <span className="m-1">...</span> : null}
                  {pages.slice(-1).map(page => {
                    return (
                      <button className={page === currentPage ? currBtnStyle : btnStyle} key={page} onClick={() => selectPage(page)}>
                        {page}
                      </button>
                    );
                  })}
                </>
              ) : null}
            </>
          }
        </>
      ) : (
        pages.map(page => {
          return (
            <button className={page === currentPage ? currBtnStyle : btnStyle} key={page} onClick={() => selectPage(page)}>
              {page}
            </button>
          );
        })
      )}
      <button className={btnStyle} disabled={numberOfPages < 1 || currentPage === numberOfPages} onClick={moveForward}>
        <HiArrowRight />
      </button>
    </div>
  );
};

export default Paginator;
