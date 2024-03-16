import React from 'react'
import { Listing } from '../../lib/interfaces/listing.interface'
import { Category } from '../../lib/interfaces/category.interface';
import ListingVerticalCard from '../shared-components/ListingVerticalCard';

interface Props {
    listings?  : Listing[];
    listingsTotalCount? : number;
    listingsLimit?: number
    categories: Category[]

}


const ListingsList = ({listings, listingsTotalCount , listingsLimit, categories}:Props) => {
  return (
    <div className='border shadow-xl p-4 rounded'>
        { listings?.map((l : Listing)=>{
          return <ListingVerticalCard key={l.id} listing={l} categories={categories} />
        })}
    </div>
  )
}

export default ListingsList