export interface LoginResponse {
  user_token: string;
  user_id: number;
  timestamp: number;
}

export interface LoginProps {
  email: string;
  password: string;
}
