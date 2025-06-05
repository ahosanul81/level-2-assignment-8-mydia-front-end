export interface IUser {
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
