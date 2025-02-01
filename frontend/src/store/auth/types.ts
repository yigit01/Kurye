export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
}

export interface AuthState {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  users: [],
  loading: false,
  error: null,
};
