import React from 'react';
import { useListings } from '../../lib/hooks/listing.hooks';
import PagePagination from '../shared-components/pagination-component/PagePagination';
import ListingVerticalCardPlaceholde from '../loading-placeholders/ListingVerticalCardPlaceholde';
import ListingsList from './ListingsList';
import { renderPlaceholders } from '../../util/utilities';
import PagePaginationPlaceholde from '../loading-placeholders/PagePaginationPlaceholder';
import Banner from '../shared-components/Banner';
import Link from 'next/link';
import { useCategories } from '../../lib/hooks/categories.hooks';

const ExploreLayout = () => {
  const [page, setPage] = React.useState(1);
  const { data: listingsData, isLoading: listingsLoading } = useListings({ page, limit: 10 });
  const { data: categoriesData, isLoading: categoriesLoading } = useCategories();


  const moveForward = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page + 1);
  };

  const moveBackward = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page - 1);
  };

  const selectPage = (page: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(page);
  };

  return (
    <div className="grid grid-cols-8 mt-5">
      <div className="col-span-4 col-start-2 col-end-8 ">
        <Banner
          main="Check out a wide array of listings from different categories"
          subText={
            <h2 className="text-center tesxt-md text-slate-500 mt-4 px-2">
             Find the perfect listing for your needs
            </h2>
          }
        />
        {listingsLoading || categoriesLoading ? (
          renderPlaceholders(10, <ListingVerticalCardPlaceholde />)
        ) : listingsData?.listings && listingsData?.listings?.length > 0 && categoriesData ? (
          <ListingsList
            listings={listingsData?.listings}
            listingsTotalCount={listingsData?.count}
            listingsLimit={listingsData?.limit}
            categories={categoriesData}
            
          />
        ) : (
          <p className="text-center">No data to dispaly</p>
        )}
        {listingsLoading ? (
          <PagePaginationPlaceholde />
        ) : listingsData?.listings && listingsData?.listings?.length > 0 && listingsData.count > listingsData.limit ? (
          <PagePagination
            currentPage={page}
            totalPages={Math.ceil(listingsData.count / listingsData.limit)}
            moveForward={moveForward}
            moveBackward={moveBackward}
            selectPage={selectPage}
          />
        ) : null}
      </div>
    </div>
  );
};

export default ExploreLayout;
