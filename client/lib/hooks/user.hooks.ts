import { useQuery } from 'react-query';
import { fetchUserListings } from '../api/user.api';

export const useUserListings = (params: { userId: number | undefined, limit : number, page : number }) => useQuery(['user', 'listings', params], () => fetchUserListings(params));