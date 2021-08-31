import React, { FC, useEffect, useState } from 'react'
import { useActions } from '../../../hooks/useActions'
import { useTypesSelector } from '../../../hooks/useTypedSelector'
import { ICategory } from '../../../types/product'
import { SearchMultiSelect } from '../../generetic'

interface Props {
  productCategories?: ICategory[]
  onChange?: (categories: string[]) => void
}

export const CreateCategoryWidget: FC<Props> = ({ productCategories, onChange }) => {

  const { getCategories, addCategory } = useActions()
  const { categories: sCategories, loading } = useTypesSelector(state => state.product)
  const [categories, setCategories] = useState<string[]>([])
  const [value, setValue] = useState('')

  useEffect(() => {
    getCategories()
  }, [])

  useEffect(() => {
    setCategories(sCategories.map(i => i.name))
  }, [sCategories])

  const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const addCategoryHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.trim().length) {
      addCategory(value)
      setValue('')
    }
  }

  return (
    <div className="widget widget-category">
      <SearchMultiSelect 
        activeOptions={productCategories?.map(i => i.name)} 
        options={categories} 
        onChange={onChange} 
      />
      <div className="widget-category__add">
        <form onSubmit={addCategoryHandler}>
          <input 
            type='text'
            name='widget-category-add'
            value={value}
            onChange={valueHandler}
          />
          <button type='submit'>Добавить</button>
        </form>
      </div>
    </div>
  )
}