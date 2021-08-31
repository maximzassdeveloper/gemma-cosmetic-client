import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import authAxios from '../../../services/axiosService'
import { IProductAttribute, IAttribute } from '../../../types/product'
import { Button, SearchSelect } from '../../generetic'

interface IOption {
  name: string
  value: string
}

interface Props {
  attributes?: IProductAttribute[]
  onChange?: (data: IProductAttribute[]) => void
}

export const ProductAttributes: FC<Props> = ({ onChange, attributes }) => {

  const { handleSubmit, setValue } = useForm<{ attr: string, attrValue: string }>()
  const [list, setList] = useState<IProductAttribute[]>(attributes || [])
  const [curName, setCurName] = useState<IOption | null>(null)
  const [initAttrs, setInitAttrs] = useState<IAttribute[]>([])
  const [attrs, setAttrs] = useState<IOption[]>([])
  const [values, setValues] = useState<IOption[]>([])

  useEffect(() => {
    const getAttrs = async () => {
      const { data } = await authAxios.get<IAttribute[]>('/attributes')
      setAttrs(data.map(x => ({ name: x.name, value: String(x.id) })))
      setInitAttrs(data)
    }
    getAttrs()
  }, [])

  useEffect(() => {
    if (attributes) setList(attributes)
  }, [attributes])

  useEffect(() => {
    if (onChange) onChange(list)
  }, [list])


  const selectValue = (data: IOption) => {
    setValue('attrValue', data.value)
  }

  const selectName = ({ name, value }: IOption) => {
    if (curName?.value === value) return

    const cur = initAttrs.find(x => String(x.id) === value)
    if (cur?.attribute_values) {
      setValues(cur.attribute_values.map(x => ({ name: x.name, value: String(x.id) })))
      setValue('attr', value)
      setCurName({ name, value })
    }
  }

  const addHandler = handleSubmit(({ attr, attrValue }) => {
    const cur = initAttrs.find(x => String(x.id) === attr)
    const curValue = cur?.attribute_values.find(x => String(x.id) === attrValue)
    if (!cur || !curValue) return

    const newCur: IProductAttribute = {
      id: curValue.id,
      name: curValue.name,
      slug: curValue.slug,
      attribute: {
        id: cur.id,
        name: cur.name,
        slug: cur.slug
      }
    }
    setList([...list, newCur])
  })

  const deleteHandler = (id: number) => {
    setList(list.filter(x => x.id !== id))
  }

  return (
    <div className="widget product-attributes">
      <div className="product-attributes__list">
        {list.map(l => 
          <p 
            key={l.id}
            onClick={() => deleteHandler(l.id)}
            className="product-attributes__item"
          >
            {l.name} - {l.attribute.name}
          </p>
        )}
      </div>
      <form onSubmit={addHandler}>
        <SearchSelect 
          onChange={v => selectName(v)} 
          options={attrs} 
          placeholder='Название' 
        />
        <SearchSelect 
          onChange={v => selectValue(v)} 
          disabled={!values.length}
          options={values} 
          placeholder='Значение' 
        />
        <Button type='submit'>Добавить</Button>
      </form>
    </div>
  )
}