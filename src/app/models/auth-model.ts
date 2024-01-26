export interface AuthModel {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
}

export interface AuthError {
  message: string;
}

export interface UserInfoModel {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  address: string;
}
