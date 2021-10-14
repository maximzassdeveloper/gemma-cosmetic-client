import * as productAction from './productAction'
import * as cartAction from './cartAction'
import * as userAction from './userAction'
import * as helpAction from './helpAction'

export default { 
  ...productAction,
  ...cartAction,
  ...userAction,
  ...helpAction
}