import { FC } from 'react'

interface ImagePopupSliderProps {
  files: string[]
}

export const ImagePopupSlider: FC<ImagePopupSliderProps> = ({ files }) => {
  return <>
    <div className="image-popup-slider__back"></div>
    <div className="image-popup-slider">
      {files.map((file, index) => 
        <div key={index+file} className="image-popup-slider__item item">
          
        </div>
      )}
    </div>
  </>
}