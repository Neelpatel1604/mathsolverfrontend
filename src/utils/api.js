import axios from 'axios';

const API_BASE_URL = 'https://mathsolverbackend.onrender.com'; // Update this to your actual backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calculate = async (operation, a, b) => {
  try {
    const response = await api.post('/api/calculate', { operation, a, b });
    return response.data;
  } catch (error) {
    console.error('Error calculating:', error);
    throw error;
  }
};

export const solveQuadratic = async (a, b, c) => {
  try {
    const response = await api.post('/api/solve-quadratic', { a, b, c });
    return response.data;
  } catch (error) {
    console.error('Error solving quadratic equation:', error);
    throw error;
  }
};

export const solveMatrix = async (operation, matrixA, matrixB = null) => {
  try {
    const response = await api.post('/api/solve-matrix', {
      operation,
      matrixA,
      matrixB
    });
    return response.data;
  } catch (error) {
    console.error('Error solving matrix:', error);
    throw error;
  }
};

// Placeholder functions for future implementations
export const solveSystem = async (equations) => {
  try {
    const response = await api.post('/api/solve-system', { equations });
    return response.data;
  } catch (error) {
    console.error('Error solving system of equations:', error);
    throw error;
  }
};

export const solvePolynomial = async (coefficients) => {
  try {
    const response = await api.post('/api/solve-polynomial', { coefficients });
    return response.data;
  } catch (error) {
    console.error('Error solving polynomial equation:', error);
    throw error;
  }
};

export default api;