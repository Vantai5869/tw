export interface LoginState {
  token: string;
  loading: boolean | null;
}

export interface LoginFail {
  status: number;
  message: string;
}

export interface LoginReq {
  client_id: string;
  client_secret: string;
  grant_type: string;
  username: string;
  password: string;
}

export interface LoginRes {
  access_token: string;
  refresh_token: string;
}
export interface RefreshTokenReq {
  client_id: string;
  client_secret: string;
  grant_type: string;
  refresh_token: string;
}
