import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import actions from '../rstore/actions'

export const useActions = () => {
  const dispatch = useDispatch()
  return bindActionCreators(actions, dispatch)
}