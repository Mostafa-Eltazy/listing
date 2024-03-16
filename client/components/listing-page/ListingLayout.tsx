import React from 'react';
import { Category } from '../../lib/interfaces/category.interface';
import { Listing } from '../../lib/interfaces/listing.interface';
import DetailedListingCard from '../shared-components/DetailedListingCard';

interface Props {
  listing: Listing;
  categroies: Category[];
}
const ListingLayout = ({ listing, categroies }: Props) => {
  return (
    <div className="grid grid-cols-8 mt-5">
      <div className="col-span-4 col-start-2 col-end-8 ">
        <DetailedListingCard listing={listing} categories={categroies} />
      </div>
    </div>
  );
};

export default ListingLayout;
