import { FC, useState, useEffect } from 'react'
import { ArrowLeft, ArrowRight } from 'react-feather'
import { checkExtension } from '../utils/helper'

interface ImagePopupProps {
  cur: number
  active: boolean
  onClose: () => void
  files: string[]
}

export const ImagePopup: FC<ImagePopupProps> = ({ files: initFiles, cur, active, onClose }) => {

  const [files, ] = useState(initFiles)
  const [curIndex, setCurIndex] = useState(cur)

  // const keyHandler = (e) => {
  //   if (e.code === 'ArrowRight') {
  //     const rightBtn: HTMLElement = document.querySelector('.image-popup__arrow.next')
  //     rightBtn.click()
  //   }
  //   if (e.code === 'ArrowLeft') {
  //     const leftBtn: HTMLElement = document.querySelector('.image-popup__arrow.prev')
  //     leftBtn.click()
  //   }
  // }

  useEffect(() => { 
    if (active) {
      document.body.style.overflow = 'hidden'
      setCurIndex(cur)
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [active])

  const nextHandler = () => {
    if (curIndex + 1 > files.length - 1) setCurIndex(0)
    else setCurIndex(curIndex + 1)
  }

  const prevHandler = () => {
    if (curIndex - 1 < 0) setCurIndex(files.length - 1)
    else setCurIndex(curIndex - 1)
  }

  const renderFile = (file: string) => {
    const type = checkExtension(file.split('.')[1])    
    switch(type) {
      case 'image':
        return <img src={file} alt="" />
      case 'video':
        return <video src={file} controls-list="nodownload" autoPlay controls></video>
    }
  }

  return <>
    {active ?
      <div className="image-popup">
        <div onClick={onClose} className="image-popup__back"></div>

        <div className="image-popup__content">
          {renderFile(files[curIndex])}
        </div>

        <div className="image-popup__arrows">
          <div onClick={prevHandler} className="image-popup__arrow prev">
            <ArrowLeft />
          </div>
          <div className="image-popup__number">
            {curIndex+1} / {files.length}
          </div>
          <div onClick={nextHandler} className="image-popup__arrow next">
            <ArrowRight />
          </div>
        </div>

      </div> 
    : null}
  </>
}