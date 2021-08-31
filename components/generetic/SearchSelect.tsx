import React, { FC, useState, useEffect, useRef, memo } from 'react'

interface SearchSelectProps {
  placeholder?: string
  options: IOption[]
  disabled?: boolean
  onChange?: (opt: IOption) => void
}

interface IOption {
  name: string
  value: string
}

export const SearchSelect: FC<SearchSelectProps> = memo(({
  placeholder, options: initOptions, disabled, onChange
}) => {

  const [options, setOptions] = useState(initOptions)
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState('')
  const [selected, setSelected] = useState<IOption | null>(null)
  const main = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: any) => {
      if (!main?.current?.contains(e.target)) {
        setToggle(false)
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [])

  useEffect(() => {
    setOptions(initOptions)
    setSelected(null)
    setValue('')
  }, [initOptions])

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value: val } = e.target
    setValue(val)

    setOptions(initOptions.filter(x => x.name.toLowerCase().includes(val.trim().toLowerCase())))
  }

  const inputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (selected) {
      setValue(selected.name)
    }
  }

  const inputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setToggle(true)
  }

  const selectHandler = (option: IOption) => {
    setValue(option.name)
    setSelected(option)
    setToggle(false)
    if (onChange) onChange(option)
  }

  return (
    <div ref={main} className="select select-search">
      <input 
        type='text' 
        value={value}
        disabled={disabled}
        placeholder={placeholder || 'Название'}
        onChange={inputChange}
        onBlur={inputBlur}
        onFocus={inputFocus}
      />
      {toggle  && <div className="select-search__list">
        {options.map(option => 
          <div 
            key={option.value}
            onClick={() => selectHandler(option)} 
            className="select-search__item"
          >
            {option.name}
          </div>
        )}
      </div>}
    </div>
  )
})