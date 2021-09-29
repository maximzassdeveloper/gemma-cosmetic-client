import * as productAction from './productAction'
import * as cartAction from './cartAction'
import * as userAction from './userAction'
import * as pageAction from './pageAction'

export default { 
  ...productAction,
  ...cartAction,
  ...userAction,
  ...pageAction
}