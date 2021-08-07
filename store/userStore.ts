import { makeAutoObservable } from 'mobx'
import { register, login, logout, refresh } from '../services/authService'
import { IRegisterData, ILoginData, IUser } from '../types/user'

export class UserStore {
  user = {} as IUser
  error = '' as string
  isAuth = false as boolean
  loading = false as boolean

  constructor() {
    makeAutoObservable(this)
  }

  async register(registerData: IRegisterData) {
    this.loading = true
    register(registerData)
      .then(({ data }) => {
        this.user = data.user
        this.isAuth = true
        localStorage.setItem('costoken', data.accessToken)
      })
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }

  async login(loginData: ILoginData) {
    this.loading = true
    login(loginData)
      .then(({ data }) => {
        this.user = data.user
        this.isAuth = true
        localStorage.setItem('costoken', data.accessToken)
      })
      .catch(e => console.log(e))
      .finally(() => this.loading = false)
  }

  async logout() {
    logout()
      .then(() => {
        this.user = {} as IUser
        this.isAuth = false
        localStorage.removeItem('costoken')
      })
  }

  async refresh() {
    refresh()
      .then(({ data }) => {
        this.user = data.user
        this.isAuth = true
        localStorage.setItem('costoken', data.accessToken)
      })
      .catch(e => console.log(e))
  }
}
