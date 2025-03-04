import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL 
    ? process.env.REACT_APP_API_BASE_URL.replace(/\/$/, '')
    : 'http://127.0.0.1:5000';  

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor for debugging
api.interceptors.request.use(request => {
    console.log('Starting Request:', request);
    return request;
});

// Add response interceptor for debugging
api.interceptors.response.use(
    response => {
        console.log('Response:', response);
        return response;
    },
    error => {
        console.log('Response Error:', error);
        return Promise.reject(error);
    }
);

export const evaluateExpression = async (expression) => {
    try {
        console.log('Sending expression to backend:', expression);
        const response = await api.post('/api/evaluate-expression', {
            expression: expression.trim()
        });
        console.log('Received response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Full error object:', error);
        if (error.code === 'ERR_NETWORK') {
            throw new Error('Cannot connect to the server. Please make sure the backend is running.');
        }
        throw new Error(error.response?.data?.detail || 'Error evaluating expression');
    }
};

export const differentiate = async (expression) => {
    try {
        const response = await api.post('/api/differentiate', { expression });
        return response.data;
    } catch (error) {
        console.error('Error differentiating:', error);
        throw error;
    }
};

export const integrate = async (expression) => {
    try {
        const response = await api.post('/api/integrate', { expression });
        return response.data;
    } catch (error) {
        console.error('Error integrating:', error);
        throw error;
    }
};

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
    const response = await api.post('/api/solve_quadratic', { a, b, c });
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
      matrix1: matrixA,
      matrix2: matrixB
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
    const response = await api.post('/api/solve_system', equations);
    return response.data;
  } catch (error) {
    console.error('Error solving system of equations:', error);
    throw error;
  }
};

export const solvePolynomial = async (a, b, c, d) => {
  try {
    const response = await api.post('/api/solve_polynomial', { a, b, c, d });
    return response.data;
  } catch (error) {
    console.error('Error solving polynomial equation:', error);
    throw error;
  }
};

export default api;