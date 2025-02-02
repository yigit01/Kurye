export interface DashboardStats {
  totalShipments: number;
  activeCouriers: number;
  totalBranches: number;
  deliveredShipments: number;
}

export interface WeeklyStats {
  name: string;
  shipments: number;
  delivered: number;
}

export interface DashboardState {
  stats: DashboardStats | null;
  weeklyStats: WeeklyStats[];
  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
  stats: null,
  weeklyStats: [],
  loading: false,
  error: null,
};
