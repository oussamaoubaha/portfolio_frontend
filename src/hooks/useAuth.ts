import { useState, useEffect } from "react";
import api from "@/services/api";

export function useAuth() {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await api.get('/user');
      setUser(data);
      // If we can fetch /user, we are authenticated. 
      // Assuming only admin exists/logs in for this portfolio backend.
      setIsAdmin(true);
    } catch (error) {
      console.error("Auth check failed", error);
      localStorage.removeItem('token');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // Laravel Sanctum requires hitting the CSRF endpoint for SPA 
      // authentication before the login request.
      await api.get('/../sanctum/csrf-cookie');

      const { data } = await api.post('/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setIsAdmin(true);
      return { error: null };
    } catch (error: any) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || error.message || "Une erreur est survenue";
      const status = error.response?.status;
      return {
        error: { message, status, data: error.response?.data }
      };
    }
  };

  const signUp = async (email: string, password: string) => {
    return { error: { message: "L'inscription est désactivée pour ce portfolio." } };
  };

  const signOut = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      // Ignore logout errors (e.g. 401)
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAdmin(false);
    }
  };

  return { user, loading, isAdmin, signIn, signUp, signOut };
}
