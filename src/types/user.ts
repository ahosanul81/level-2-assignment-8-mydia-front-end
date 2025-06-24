export interface IUserModified {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    password: string;
    profilePhoto?: string;
    role: string;
    status: string;
    Admin: string;
    Member: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface IAdmin {
  id?: string;
  userId?: string;
  user?: IUser;
  name?: string;
  email?: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IMember {
  id?: string;
  userId?: string;
  user?: IUser;
  name?: string;
  email?: string;
  profilePhoto?: string;
  contactNumber?: string;
  address?: string;
  isVerified?: boolean;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface IUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  Admin?: IAdmin;
  Member?: IMember;
  createdAt?: Date;
  updatedAt?: Date;
}
