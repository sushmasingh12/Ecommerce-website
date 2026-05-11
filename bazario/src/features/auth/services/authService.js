// Mock authentication service
export const authService = {
  login: async (credentials) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password) {
          resolve({
            id: 'user-1',
            name: 'Priya Sharma',
            email: credentials.email,
            token: 'mock-jwt-token',
          });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1000);
    });
  },

  register: async (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: `user-${Date.now()}`,
          name: userData.name,
          email: userData.email,
          token: 'mock-jwt-token',
        });
      }, 1000);
    });
  },

  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  },
};
