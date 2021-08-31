import React, { FC } from 'react'
import classnames from '../../utils/classnames'
import { Loading } from '..'

interface ButtonProps {
  className?: string
  loading?: boolean
  type?: 'button' | 'reset' | 'submit'
  style?: React.CSSProperties
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

export const Button: FC<ButtonProps> = ({ 
  children, className, loading, type, style, onClick 
}) => {
  const clickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { currentTarget } = e
    const attrName = 'click-animating'
    const attr = currentTarget.getAttribute(attrName) || 'false'
    if (attr === 'true') {
      currentTarget.setAttribute(attrName, 'false')
      setTimeout(() => {
        currentTarget.setAttribute(attrName, 'true')
      }, 0);
    } else {
      currentTarget.setAttribute(attrName, 'true')
      setTimeout(() => {
        currentTarget.setAttribute(attrName, 'false')
      }, 2000);
    }

    if (onClick) onClick(e)
  }

  const classes = classnames('button', className, { 'loading': loading })

  return (
    <button
      className={classes}
      type={type}
      style={style}
      onClick={clickHandler}
    >
      {children}
      {loading ? <Loading /> : null}
    </button>
  )
}