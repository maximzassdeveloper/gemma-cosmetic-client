import * as productAction from './productAction'
import * as cartAction from './cartAction'
import * as userAction from './userAction'

export default { 
  ...productAction,
  ...cartAction,
  ...userAction
}