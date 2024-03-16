import React from 'react'
import { Listing } from '../../lib/interfaces/listing.interface';
import ListingsList from '../explore-page-components/ListingsList';


interface Props {
  userListings:{ listings: Listing[]; count: number; limit: number; };
}
const ListingsView = ({userListings} : Props) => {
  return (
    <div className='px-2 py-4'>
      <h1 className='text-2xl font-bold'>Your Listings</h1>
      <ListingsList listings={userListings.listings} listingsTotalCount={userListings.count} listingsLimit={userListings.limit}/>
    </div>
  )
}

export default ListingsView;