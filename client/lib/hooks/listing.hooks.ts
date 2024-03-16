import { useQuery } from 'react-query';
import { fetchListings } from '../api/listing.api';

export const useListings = (params:{limit:number, page:number}) => useQuery(['auctions', params], () => fetchListings(params));
