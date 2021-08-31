import React, { FC, useState, useEffect, memo } from 'react'

interface ListProps {
  options: string[]
  onClick: (value: string, index: number) => void
}

const List: FC<ListProps> = ({ options, onClick }: ListProps) => <>
  {options.map((option, index) => 
    <div 
      key={option+index}
      className="select__option option" 
      onClick={() => onClick(option, index)}
    >
      <div className="option__checkbox"></div>
      <div className="option__text">{option}</div>
    </div>
  )}
</>



interface SearchSelectProps {
  options: string[]
  activeOptions?: string[]
  onChange?: (options: string[]) => void
}

export const SearchMultiSelect: FC<SearchSelectProps> = memo(({
  options: initialOptions,
  activeOptions: initialActiveOptions,
  onChange
}) => {
  
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [activeOptions, setActiveOptions] = useState(initialActiveOptions || [])

  const aSort = (array: string[]) => {
    return array.sort((a,b) => (a < b) ? -1 : 1)
  }

  const excludeActive = () => {
    setOptions(aSort(initialOptions.filter(i => !activeOptions.includes(i))))
  }
  
  useEffect(() => {
    excludeActive()
  }, [initialOptions])

  useEffect(() => {
    if (onChange) onChange(activeOptions)
  }, [activeOptions])
  
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.trim()
    setValue(val)

    if (val.length === 0) {
      excludeActive()
    } else {
      setOptions(options.filter(x => {
        return x.toLowerCase().includes(val.toLowerCase())
      }))
    }
  }

  const selectHandler = (v: string, index: number) => {
    setActiveOptions([...activeOptions, v])
    options.splice(index, 1)
  }

  const unselectHandler = (v: string, index: number) => {
    setOptions(aSort([...options, v]))
    setActiveOptions(activeOptions.filter((_,i) => index !== i))
  }

  return (
    <div className="select">

      <div className="select__input">
        <input 
          type="text" 
          name='select-search' 
          value={value}
          onChange={changeHandler}
          placeholder='Выберите значения'
        />
      </div>

      <div className="select__options">
        <div className="select__options-active">
          <List options={activeOptions} onClick={(v,i) => unselectHandler(v,i)} />
        </div>
        {!options.length && <p>Категорий нет</p>}
        <List options={options} onClick={(v,i) => selectHandler(v,i)} />
      </div>

    </div>
  )
})