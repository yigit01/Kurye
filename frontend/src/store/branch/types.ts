export interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
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
  branch: Branch | null;
  branches: Branch[];
  loading: boolean;
  error: string | null;
}

export const initialState: BranchState = {
  branch: null,
  branches: [],
  loading: false,
  error: null,
};
