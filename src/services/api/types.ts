export interface Tag {
  id: number;
  name: string;
  count: number;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
} 