export interface Courier {
  id: string;
  fullName: string;
  phone: string;
  isActive: boolean;
  region: string;
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
