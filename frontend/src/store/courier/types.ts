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

export interface PaginatedCouriers {
  data: Courier[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface CourierState {
  couriers: PaginatedCouriers | null;
  courier: Courier | null;
  loading: boolean;
  error: string | null;
}

export const initialState: CourierState = {
  courier: null,
  couriers: null,
  loading: false,
  error: null,
};
