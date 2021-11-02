import React, { FC } from 'react'
import classnames from '../../utils/classnames'
import { Loading } from '..'

interface ButtonProps {
  className?: string
  loading?: boolean
  type?: 'button' | 'reset' | 'submit'
  style?: React.CSSProperties
  href?: string
  onClick?: React.MouseEventHandler<any>
}

export const Button: FC<ButtonProps> = ({ 
  children, className, loading, type, href, style, onClick 
}) => {
  const clickHandler = (e: React.MouseEvent<any>) => {
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
  const Tag = href ? 'a' : 'button'

  return (
    <Tag
      href={href}
      className={classes}
      type={type}
      style={style}
      onClick={clickHandler}
    >
      {children}
      {loading ? <Loading /> : null}
    </Tag>
  )
}