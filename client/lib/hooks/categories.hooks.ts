import { useQuery } from 'react-query';
import { fetchCategories } from '../api/categories.api';

export const useCategories = () => useQuery(['categories'], () => fetchCategories());
