import { API_BASE_URL } from '@/config/api';

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  authenticated?: boolean;
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
    permissions: string[] | null;
  };
}

export const api = {
  auth: {
    login: async (username: string, password: string): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth-admin.php?action=login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });
      return response.json();
    },

    logout: async (): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth-admin.php?action=logout`, {
        method: 'POST',
        credentials: 'include'
      });
      return response.json();
    },

    check: async (): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth-admin.php?action=check`, {
        credentials: 'include'
      });
      return response.json();
    },

    forgotPassword: async (): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/auth-admin.php?action=forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
        credentials: 'include'
      });
      return response.json();
    }
  },

  blogs: {
    getAll: async (): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/blogs-admin.php`, {
        credentials: 'include'
      });
      return response.json();
    },

    getById: async (id: number): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/blogs-admin.php?id=${id}`, {
        credentials: 'include'
      });
      return response.json();
    },

    create: async (data: any): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/blogs-admin.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      return response.json();
    },

    update: async (id: number, data: any): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/blogs-admin.php?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      return response.json();
    },

    delete: async (id: number): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/blogs-admin.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      return response.json();
    }
  },

  media: {
    getAll: async (): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/media-admin.php`, {
        credentials: 'include'
      });
      return response.json();
    },

    uploadFile: async (file: File, name: string): Promise<ApiResponse> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('name', name);

      const response = await fetch(`${API_BASE_URL}/media-admin.php`, {
        method: 'POST',
        body: formData,
        credentials: 'include'
      });
      return response.json();
    },

    addUrl: async (url: string, name: string): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/media-admin.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, name }),
        credentials: 'include'
      });
      return response.json();
    },

    delete: async (id: number): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/media-admin.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      return response.json();
    }
  }, jobs: {
    getAll: async (status?: string): Promise<ApiResponse> => {
      const url = status ? `${API_BASE_URL}/jobs.php?status=${status}` : `${API_BASE_URL}/jobs.php`;
      const response = await fetch(url, {
        credentials: 'include'
      });
      return response.json();
    },

    getById: async (id: number): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/jobs.php?id=${id}`, {
        credentials: 'include'
      });
      return response.json();
    },

    create: async (data: any): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/jobs.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include'
      });
      return response.json();
    },

    update: async (id: number, data: any): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/jobs.php`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, id }),
        credentials: 'include'
      });
      return response.json();
    },

    delete: async (id: number): Promise<ApiResponse> => {
      const response = await fetch(`${API_BASE_URL}/jobs.php`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
        credentials: 'include'
      });
      return response.json();
    }
  }
};
