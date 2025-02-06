import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // For example, check for a token in localStorage to determine authentication
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  }, []);

  return { isAuthenticated };
};
