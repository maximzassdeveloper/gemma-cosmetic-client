import { FC } from 'react'
import { IFile } from '../../types/product'
import { SERVER_URL } from '../../utils/config'
import { checkExtension } from '../../utils/helper'

interface ImageProps {
  file?: string | IFile
  alt?: string
  className?: string
  controls?: boolean
  autoPlay?: boolean
}

export const Image: FC<ImageProps> = ({ file, alt, className, controls, autoPlay }) => {

  const renderType = (url: string, type: string) => {
    switch (type) {
      case 'image':
        return <img className={className} src={url} alt={alt || ''} />
      case 'video':
        return <video 
          className={className}
          src={url} 
          controls-list="nodownload" 
          autoPlay={autoPlay || false} 
          controls={controls || false}
        />
    }
  }

  const renderFile = () => {
    if (typeof file === 'string') {
      const type = checkExtension(file.split('.')[1])
      return renderType(file, type)
    } else {
      return renderType(SERVER_URL+'/'+file.url, file.type)
    }
  }

  return (
    <>
      {renderFile()}
    </>
  )
}