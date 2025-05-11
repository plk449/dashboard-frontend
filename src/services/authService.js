import api from './api'

export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Login failed')
  }
}

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Registration failed')
  }
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch user data')
  }
}