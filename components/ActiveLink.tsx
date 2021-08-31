import React from 'react'
import { useRouter } from 'next/router'

interface ActiveLinkProps {
  href: string
}

export const ActiveLink: React.FC<ActiveLinkProps> = ({ children, href }) => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a 
      href={href}
      onClick={handleClick} 
      className={router.asPath === href ? 'active' : ''}
    >
      {children}
    </a>
  )
}