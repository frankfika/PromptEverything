const API_BASE_URL = '/api';

export interface Tag {
  id: number;
  name: string;
  count: number;
}

export interface ApiResponse {
  code: number;
  data: Tag[];
  message: string;
}

export const api = {
  async getTags(limit: number = 10): Promise<Tag[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/tags`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        cache: 'no-store'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Service: Received response:', result);

      // 确保我们有正确的数据结构
      if (result && Array.isArray(result.data)) {
        console.log('API Service: Found tags:', result.data);
        return result.data;
      }

      console.error('API Service: Invalid response format:', result);
      return [];

    } catch (error) {
      console.error('API Service: Error fetching tags:', error);
      return [];
    }
  }
}; 