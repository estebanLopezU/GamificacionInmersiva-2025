export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin';
  user_type?: 'student' | 'professor';
  display_name?: string;
  academic_program?: string;
  career?: string;
  semester?: number;
  job_title?: string;
  is_permanent?: boolean;
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
