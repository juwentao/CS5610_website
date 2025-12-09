const API_BASE_URL = '/api';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth API
export const authApi = {
  register: async (username, email, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    return response.json();
  },

  login: async (username, password) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    return response.json();
  },

  getMe: async () => {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { ...getAuthHeaders() },
    });
    if (!response.ok) {
      throw new Error('Not authenticated');
    }
    return response.json();
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
};

// Sudoku Game API
export const gameApi = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/sudoku`);
    if (!response.ok) {
      throw new Error('Failed to fetch games');
    }
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sudoku/${id}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch game');
    }
    return response.json();
  },

  create: async (difficulty) => {
    const response = await fetch(`${API_BASE_URL}/sudoku`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ difficulty }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create game');
    }
    return response.json();
  },

  update: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/sudoku/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update game');
    }
    return response.json();
  },

  delete: async (id) => {
    const response = await fetch(`${API_BASE_URL}/sudoku/${id}`, {
      method: 'DELETE',
      headers: { ...getAuthHeaders() },
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to delete game');
    }
    return response.json();
  },
};

// High Score API
export const highScoreApi = {
  getAll: async (difficulty = null, limit = 50) => {
    let url = `${API_BASE_URL}/highscore?limit=${limit}`;
    if (difficulty) {
      url += `&difficulty=${difficulty}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch high scores');
    }
    return response.json();
  },

  getByGameId: async (gameId) => {
    const response = await fetch(`${API_BASE_URL}/highscore/${gameId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch game high scores');
    }
    return response.json();
  },

  create: async (gameId, time) => {
    const response = await fetch(`${API_BASE_URL}/highscore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify({ gameId, time }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to submit high score');
    }
    return response.json();
  },
};

export default { authApi, gameApi, highScoreApi };
