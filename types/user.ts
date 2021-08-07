export type UserRoles = 'USER' | 'ADMIN'

export interface IUser {
  id: number
  name: string
  surname?: string
  email: string
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