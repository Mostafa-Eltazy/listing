import { Listing } from '../interfaces/listing.interface';
import { User } from '../interfaces/user.interface';
import client from './client';

export const logInUser = async (email: string, password: string): Promise<User> => {
  const response = await client.post<User>(`auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (email: string, password: string, username: string, firstname: string, lastname: string): Promise<User> => {
  const response = await client.post<User>(`auth/register`, {
    email,
    password,
    username,
    firstname,
    lastname,
  });
  return response.data;
};

export const fetchUser = async (): Promise<User> => {
  const response = await client.get<User>(`user/`);
  return response.data;
};

export const uploadProfilePicture = async (profilePicture: any): Promise<any> => {
  const formData = new FormData();
  formData.append('profilePicture', profilePicture);

  const response = await client.put<Partial<User>[]>(`users/profile-picture`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const fetchUserListings = async (params?: {
  userId: number | undefined;
  limit: number;
  page: number;
}): Promise<{ listings: Listing[]; count: number; limit: number }> => {
  const response = await client.get<{ listings: Listing[]; count: number; limit: number }>(`user/listings`, { params });
  return response.data;
};
