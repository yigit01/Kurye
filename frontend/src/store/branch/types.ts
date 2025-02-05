export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedBranches {
  data: Branch[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface CreateBranchDto {
  name: string;
  address: string;
  phone: string;
}

export interface UpdateBranchDto {
  name?: string;
  address?: string;
  phone?: string;
  isActive?: boolean;
}

export interface BranchState {
  branches: PaginatedBranches | null;
  branch: Branch | null;
  loading: boolean;
  error: string | null;
}

export const initialState: BranchState = {
  branch: null,
  branches: null,
  loading: false,
  error: null,
};
