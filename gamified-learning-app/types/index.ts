export interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'admin' | 'superadmin';
  user_type?: 'student' | 'professor';
  display_name?: string;
  academic_program?: string;
  career?: string;
  semester?: number;
  job_title?: string;
  is_permanent?: boolean;
  date_joined?: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface LoginResponse {
  success: boolean;
  redirect_url: string;
  role: 'user' | 'admin' | 'superadmin';
  tokens: AuthTokens;
}

export interface ApiError {
  error: string;
}

export interface UserStats {
  total_users: number;
}
