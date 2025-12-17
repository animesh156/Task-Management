/* eslint-disable no-useless-catch */
import api from "../lib/axios";

export const login = async (data: {
  email: string;
  password: string;
}) => {
 
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/logout");
  } catch (error) {
    throw error;
  }
};

export const getMe = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    throw error;
  }
};
