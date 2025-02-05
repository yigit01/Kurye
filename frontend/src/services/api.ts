import axios, { InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get("token");
    console.log("Token from Cookies:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log("Authorization header:", config.headers.Authorization);
      console.log("Request URL:", `${config.baseURL || ""}${config.url || ""}`);
    } else {
      console.log("No token found in Cookies");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      Cookies.remove("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
  token: string;
}

export const authApi = {
  login: (credentials: LoginCredentials) =>
    api.post<LoginResponse>("/auth/login", credentials),

  logout: () => api.post("/auth/logout"),

  getCurrentUser: () => api.get("/auth/me"),

  getUsers: (params?: { page: number; limit: number; sortBy?: string[] }) =>
    api.get("/users", { params }),
};

export const shipmentsApi = {
  getAll: (params?: { page: number; limit: number; sortBy?: string[] }) =>
    api.get("/shipments", { params }),
  getById: (id: string) => api.get(`/shipments/${id}`),
  getByTrackingCode: (trackingCode: string) =>
    api.get(`/shipments/track/${trackingCode}`),
  create: (data: any) => api.post("/shipments", data),
  update: (id: string, data: any) => api.patch(`/shipments/${id}`, data),
  delete: (id: string) => api.delete(`/shipments/${id}`),
  assignCourier: (id: string, courierId: string) =>
    api.patch(`/shipments/${id}/assign-courier/${courierId}`),
  transfer: (id: string, data: any) =>
    api.patch(`/shipments/${id}/transfer`, data),
};

export const couriersApi = {
  getAll: (params?: any) => api.get("/couriers", { params }),
  getById: (id: string) => api.get(`/couriers/${id}`),
  create: (data: any) => api.post("/couriers", data),
  update: (id: string, data: any) => api.patch(`/couriers/${id}`, data),
  delete: (id: string) => api.delete(`/couriers/${id}`),
  getAvailable: (branchId: string) =>
    api.get(`/couriers/available/${branchId}`),
};

export const branchesApi = {
  getAll: (params?: { page: number; limit: number; sortBy?: string[] }) =>
    api.get("/branches", { params }),
  getById: (id: string) => api.get(`/branches/${id}`),
  create: (data: any) => api.post("/branches", data),
  update: (id: string, data: any) => api.patch(`/branches/${id}`, data),
  delete: (id: string) => api.delete(`/branches/${id}`),
};

export const dashboardApi = {
  getStats: () => {
    const today = new Date();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const endDate = today;

    return Promise.all([
      api.get(
        `/reports/shipments?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      ),
      api.get(
        `/reports/couriers?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      ),
      api.get(
        `/reports/branches?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
      ),
    ]).then(([shipments, couriers, branches]) => ({
      totalShipments: shipments.data.total,
      activeShipments: shipments.data.byStatus.inTransit,
      deliveredShipments: shipments.data.byStatus.delivered,
      totalRevenue: 0, // Bu veri şu an için mevcut değil
      weeklyStats: [
        {
          date: startDate.toISOString(),
          shipments: shipments.data.total,
          revenue: 0, // Bu veri şu an için mevcut değil
        },
      ],
      courierStats: couriers.data,
      branchStats: branches.data,
    }));
  },
};

export default api;
