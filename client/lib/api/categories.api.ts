import { Category } from '../interfaces/category.interface';
import client from './client';


export const fetchCategories = async (): Promise<Category[]> => {
    const response = await client.get<Category[]>('categories');
    return response.data;
  }; 