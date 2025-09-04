// src/contexts/AdminContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";

// نوع داده‌های context
interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
}

// ساخت context
export const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Provider
export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (password: string) => {
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD; // از .env خوانده می‌شود
    if (password === adminPassword) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
  };

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook برای راحتی استفاده از context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
