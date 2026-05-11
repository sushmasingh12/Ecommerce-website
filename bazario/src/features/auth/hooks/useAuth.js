import { useSelector, useDispatch } from 'react-redux';
import {
  loginAsync,
  registerAsync,
  logout as logoutAction,
  selectAuth,
  clearError,
} from '../store/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(selectAuth);

  const login = async (credentials) => {
    return dispatch(loginAsync(credentials)).unwrap();
  };

  const register = async (userData) => {
    return dispatch(registerAsync(userData)).unwrap();
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const resetError = () => {
    dispatch(clearError());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    resetError,
  };
};
