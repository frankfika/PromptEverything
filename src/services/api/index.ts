import { API_CONFIG } from '../../config';
import type { Tag, ApiResponse } from './types';

// 模拟数据
const mockTags: Tag[] = [
  { id: 1, name: 'AI', count: 120 },
  { id: 2, name: 'Blockchain', count: 85 },
  { id: 3, name: 'IoT', count: 64 },
  { id: 4, name: 'Quantum', count: 45 },
  { id: 5, name: 'Nanotech', count: 38 },
  { id: 6, name: 'Biotech', count: 72 },
  { id: 7, name: 'Robotics', count: 93 },
  { id: 8, name: 'VR/AR', count: 56 }
];

class ApiService {
  private static instance: ApiService;
  private baseUrl: string;
  private isApiAvailable: boolean = true;

  private constructor() {
    this.baseUrl = API_CONFIG.BASE_URL;
  }

  static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  async getTags(limit: number = 10): Promise<Tag[]> {
    // 如果之前检测到 API 不可用，直接返回模拟数据
    if (!this.isApiAvailable) {
      console.log('API Service: Using mock data (API unavailable)');
      return mockTags.slice(0, limit);
    }

    try {
      const url = `${this.baseUrl}/api/v1/tags/top?limit=${limit}`;
      console.log('API Service: Requesting URL:', url);

      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
        cache: 'no-store'
      });

      // 如果 API 返回错误
      if (!response.ok) {
        console.log('API Service: API unavailable, switching to mock data');
        this.isApiAvailable = false; // 标记 API 不可用
        return mockTags.slice(0, limit);
      }

      const data = await response.json();
      
      // 处理不同的响应格式
      if (data.tags && Array.isArray(data.tags)) {
        return data.tags;
      }
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }
      if (Array.isArray(data)) {
        return data;
      }

      // 如果数据格式不正确，返回模拟数据
      console.log('API Service: Invalid data format, using mock data');
      return mockTags.slice(0, limit);

    } catch (error) {
      console.log('API Service: Error fetching data, using mock data');
      this.isApiAvailable = false; // 标记 API 不可用
      return mockTags.slice(0, limit);
    }
  }

  // 可以添加重试机制
  async checkApiAvailability(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      this.isApiAvailable = response.ok;
    } catch {
      this.isApiAvailable = false;
    }
  }
}

export const api = ApiService.getInstance();
export type { Tag } from './types';