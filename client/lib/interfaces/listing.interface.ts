export interface Listing {
  id: number;
  title: string;
  startPrice: number;
  maxPrice: number;
  createdAt: string;
  updatedAt: string;
  categoryId: string;
  contractorId: number;
  contractor : {username: string};
  images: string[];
  
}
