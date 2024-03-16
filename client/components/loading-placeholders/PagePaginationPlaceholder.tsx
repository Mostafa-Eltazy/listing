import Skeleton from 'react-loading-skeleton';

const PagePaginationPlaceholde = () => {
  return (
    <div className="border p-3 my-5 rounded">
     
      <div className="grid grid-cols-6 gap-4 ">
        <div className="col-span-1">
          <Skeleton count={1} />
        </div>
        <div className="col-start-6 col-end-7">
          <Skeleton count={1} />
        </div>
      </div>
    </div>
  );
};

export default PagePaginationPlaceholde;
