import api from './api';
import { AxiosError } from 'axios';

export const login = async (email: string, password: string) => {
  const response = await api.post('/users/login/', { email, password }).catch(
    (error: AxiosError) => {
      if (error.response) {
        throw error.response.data;
      }
  });

  return response;
} 

export const signup = async (name: string, email: string, password: string) => {
  const response = await api.post('/users/', { name, email, password }).catch(
    (error: AxiosError) => {
      if (error.response) {
        throw error.response.data;
      }
  });

  return response;
}

export const logout = async () => {
  const response = await api.post('/users/logout/').catch(
    (error: AxiosError) => {
      if (error.response) {
        throw error.response.data;
      }
  });

  return response;
}