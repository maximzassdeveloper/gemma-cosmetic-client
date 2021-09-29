export type UserRoles = 'USER' | 'ADMIN'

export interface IUser {
  id: number
  name: string
  surname?: string
  fullName: string
  email: string
  phone?: string
  role: UserRoles
  img?: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IRegisterData {
  name: string
  surname?: string
  email: string
  password: string
}

export interface ILoginData {
  email: string
  password: string
}


// Redux
export interface UserState {
  user: IUser
  isAuth: boolean
  error: string
  loading: boolean
}

export enum UserActionsTypes {
  REGISTER = 'REGISTER',
  REGISTER_SUCCESS = 'REGISTER_SUCCESS',
  REGISTER_ERROR = 'REGISTER_ERROR',
  
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_ERROR = 'LOGIN_ERROR',

  CLEAN_ERROR = 'CLEAN_ERROR',
  
  LOGOUT = 'LOGOUT',
  REFRESH = 'REFRESH',
  GET_USER = 'GET_USER',
  UPDATE_USER = 'UPDATE_USER',
  DELETE_USER = 'DELETE_USER'
}

export interface RegisterAction {
  type: UserActionsTypes.REGISTER
}
export interface RegisterSuccessAction {
  type: UserActionsTypes.REGISTER_SUCCESS
  payload: AuthResponse
}
export interface RegisterErrorAction {
  type: UserActionsTypes.REGISTER_ERROR
  payload: string
}

export interface CleanErrorAction {
  type: UserActionsTypes.CLEAN_ERROR
}

export interface LoginAction {
  type: UserActionsTypes.LOGIN
}
export interface LoginSuccessAction {
  type: UserActionsTypes.LOGIN_SUCCESS
  payload: AuthResponse
}
export interface LoginErrorAction {
  type: UserActionsTypes.LOGIN_ERROR
  payload: string
}

export interface LogoutAction {
  type: UserActionsTypes.LOGOUT
}

export interface RefreshAction {
  type: UserActionsTypes.REFRESH
  payload: AuthResponse
}

export type UserAction = 
  RegisterAction
  | RegisterSuccessAction
  | RegisterErrorAction
  | CleanErrorAction
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction
  | RefreshAction