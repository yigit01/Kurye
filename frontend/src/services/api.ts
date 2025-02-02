import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
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
};

export const shipmentsApi = {
  getAll: (params?: any) => api.get("/shipments", { params }),
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
};

export const branchesApi = {
  getAll: (params?: any) => api.get("/branches", { params }),
  getById: (id: string) => api.get(`/branches/${id}`),
  create: (data: any) => api.post("/branches", data),
  update: (id: string, data: any) => api.patch(`/branches/${id}`, data),
  delete: (id: string) => api.delete(`/branches/${id}`),
};

export const dashboardApi = {
  getStats: () => api.get("/dashboard/stats"),
  getWeeklyStats: () => api.get("/dashboard/weekly-stats"),
};

export default api;
