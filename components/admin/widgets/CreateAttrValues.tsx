import React, { FC, useState, useEffect } from 'react'
import slugify from 'slugify'
import { useForm } from 'react-hook-form'
import { Button, Input } from '../../generetic'

interface CreateAttrValuesProps {
  onChange?: (data: IValue[]) => void
}

interface IValue {
  name: string
  slug: string
}

export const CreateAttrValues: FC<CreateAttrValuesProps> = ({ onChange }) => {

  const { 
    register, 
    setValue,
    setError,
    reset,
    handleSubmit, 
    formState: { errors, touchedFields } 
  } = useForm<IValue>()
  const [values, setValues] = useState<IValue[]>([])
  const [update, setUpdate] = useState<number | null>(null)

  useEffect(() => {
    if (onChange) onChange(values)
  }, [values])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!touchedFields.slug) {
      setValue('slug', slugify(e.target.value.trim(), { lower: true }))
    }
  }

  const startUpdating = (name: string, slug: string, index: number) => {
    // reset()
    setUpdate(index)
    setValue('name', name)
    setValue('slug', slug)
  }

  const addHandler = handleSubmit(({ name, slug }) => {
    if (update) {
      setValues(values.map((x, i) => i === update ? { name, slug } : x))
    } else {
      setValues([...values, { name, slug }])
    }
    reset()
  })

  return (
    <div className="widget attribute-values">
      {values.map((value, index) => 
        <div 
          onClick={() => startUpdating(value.name, value.slug, index)} 
          className="item" 
          key={value.slug}
        >
          {value.name} ({value.slug})
        </div>
      )}
      <form onSubmit={addHandler}>
        <Input 
          name='name'
          register={register}
          error={errors.name}
          touched={touchedFields.name}
          rules={{ required: true }}
          onChange={changeHandler}
          placeholder='Название'
        />
        <Input 
          name='slug'
          register={register}
          touched={touchedFields.slug}
          placeholder='Слаг'
        />
        <Button type='submit'>{!update ? 'Создать' : 'Обновить'}</Button>
      </form>    
    </div>
  )
}