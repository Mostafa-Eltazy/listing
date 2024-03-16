export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth-token');
  }
  return null;
};

export const setAuthToken = (token: string | undefined) => {
  if (token) {
    localStorage.setItem('auth-token', token);
  }
};

export const clearAuthToken = () => {
  localStorage.removeItem('auth-token');
};
