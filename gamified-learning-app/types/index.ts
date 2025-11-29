export interface User {
  id: number;
  username: string;
  role: 'user' | 'admin';
  email?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  success: boolean;
  redirect_url: string;
  role: 'user' | 'admin';
  tokens: AuthTokens;
}

export interface ApiError {
  error: string;
}

export interface UserStats {
  total_users: number;
}
