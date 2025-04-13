import type { AuthProvider } from "@refinedev/core";
import axios from "axios";

export const TOKEN_KEY = "token";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { token } = res.data.user;
      localStorage.setItem(TOKEN_KEY, token);

      return {
        success: true,
        redirectTo: "/",
      };
    } catch (error) {
      return {
        success: false,
        error: {
          name: "LoginError",
          message: "Email hoặc mật khẩu không chính xác",
        },
      };
    }
  },

  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: "/login",
    };
  },

  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/admin/info`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return {
        authenticated: true,
      };
    } catch (error) {
      return {
        authenticated: false,
        redirectTo: "/login",
      };
    }
  },

  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/info`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const admin = res.data;

      return {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        avatar: admin.avatar || "https://i.pravatar.cc/300",
      };
    } catch {
      return null;
    }
  },

  getPermissions: async () => null,

  onError: async (error) => {
    console.error(error);
    return { error };
  },
};
