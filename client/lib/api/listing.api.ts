import { number, object } from 'yup';
import { Listing } from '../interfaces/listing.interface';
import client from './client';

export const fetchListings = async (params: { limit: number; page: number }): Promise<{ listings: Listing[]; count: number; limit: number }> => {
  const response = await client.get<{ listings: Listing[]; count: number; limit: number }>(`listings`, { params });
  return response.data;
};

export const createListing = async (
  data: {
    categoryId: string;
    listingsImage: FileList;
    maxPrice: number;
    startPrice: number;
    title: string;
  },
  creatorId: string,
): Promise<Listing> => {
  const reqFormData = new FormData();
  reqFormData.append('categoryId', data.categoryId);
  reqFormData.append('maxPrice', data.maxPrice.toString());
  reqFormData.append('startPrice', data.startPrice.toString());
  reqFormData.append('title', data.title);
  for (let i = 0; i < data.listingsImage.length; i++) {
    reqFormData.append('listingsImage', data.listingsImage[i]);
  }
  
  
  const response = await client.post<Listing>(`users/${creatorId}/listings`, reqFormData);
  return response.data;
};

export const fetchListing = async (id: string): Promise<Listing> => {
  const response = await client.get<Listing>(`listings/${id}`);
  return response.data;
};
