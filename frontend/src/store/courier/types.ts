export interface Courier {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  branchId: string;
  identificationNumber: string;
  isActive: boolean;
  region: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourierState {
  courier: Courier | null;
  couriers: Courier[];
  loading: boolean;
  error: string | null;
}

export const initialState: CourierState = {
  courier: null,
  couriers: [],
  loading: false,
  error: null,
};
