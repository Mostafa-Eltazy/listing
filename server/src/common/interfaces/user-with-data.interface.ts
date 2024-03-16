
export interface UserWithInfo {
  id: number;
  email: string;
  username: string;
  profilePicture: string | null;
  firstname: string;
  lastname:string;
  createdAt?: Date;
  updatedAt?: Date;
  
}
