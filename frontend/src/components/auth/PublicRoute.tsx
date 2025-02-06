import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const location = useLocation();

  if (user) {
    // Eğer kullanıcı giriş yapmışsa ve login sayfasına gitmeye çalışıyorsa
    // ana sayfaya yönlendir
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default PublicRoute;
