import { FC } from 'react'
import classnames from '../../utils/classnames'

interface ContainerProps {
  className?: string
}

export const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={classnames('container', className)}>
      {children}
    </div>
  )
}