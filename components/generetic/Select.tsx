import { FC, useState, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'

interface SelectProps {
  options: string[],
  default?: string,
  onChange?: (value: string) => void
}

export const Select: FC<SelectProps> = ({ options, default: defaultVal, onChange }) => {

  const [value, setValue] = useState(defaultVal || options[0])
  const [toggle, setToggle] = useState(false)

  const closeListener = (e: any) => {
    if (!e.target.closest('.select')) {
      setToggle(false)
      document.removeEventListener('click', closeListener)
    }
  }

  useEffect(() => {
    if (toggle) {
      document.addEventListener('click', closeListener)
    }
  }, [toggle])

  const selectHandler = (val: string) => {
    setValue(val)
    if (onChange) onChange(value)
  }

  return (
    <div className="select">
      <div 
        className="select__value"
        onClick={() => setToggle(!toggle)}
      >{value}</div>
      <CSSTransition in={toggle} timeout={200} unmountOnExit mountOnEnter>
        <div className="select__list">
          {options.map((op, i) =>
            <div 
              key={op+i}
              className={`select__item${value === op ? ' active': ''}`}
              onClick={() => selectHandler(op)}
            >{op}</div>
          )}
        </div>
      </CSSTransition>
    </div>
  )
}