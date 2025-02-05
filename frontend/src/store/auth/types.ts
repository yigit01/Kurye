export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface PaginatedUsers {
  data: User[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  users: PaginatedUsers | null;
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  users: null,
  loading: false,
  error: null,
};
