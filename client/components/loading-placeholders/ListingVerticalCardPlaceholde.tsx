import Skeleton from 'react-loading-skeleton';

const ListingVerticalCardPlaceholde = () => {
  return (
    <div className="border p-3 my-5 rounded">
      <div className="mb-5">
        <Skeleton count={3} />
      </div>
      <div className="grid grid-cols-6 gap-4 mb-5">
        <div className="col-span-1">
          <Skeleton count={2} />
        </div>
        <div className="col-start-6 col-end-7">
          <Skeleton count={2} />
        </div>
      </div>

      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-1">
          <Skeleton count={2} />
        </div>
      </div>


      <div className="border-t grid grid-cols-6 gap-4 pt-3 mt-3">
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

export default ListingVerticalCardPlaceholde;
