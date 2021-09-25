import { FC, useState } from 'react'
import { Input, Textarea } from '../../generetic'
import { TagList } from '../../'

interface CreateTagsProps {
  tags?: string[]
  onChange?: (tags: string[]) => void
}

export const CreateTags: FC<CreateTagsProps> = ({ tags: defaultTags, onChange }) => {

  const [tags, setTags] = useState(defaultTags?.join(', ') || '')
  const [delimiter, setDelimiter] = useState(',')
  const [mode, setMode] = useState<'tag' | 'text'>('tag')

  const renderTags = (arr: string): string[] => {
    const b = []
    arr.split(delimiter).forEach(i => {
      if (i.trim()) b.push(i.trim())
    })
    return b
  }

  const changeHandler = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTags(target.value)
    if (onChange) onChange(renderTags(target.value))
  }

  return (
    <div className="create-tags">
      <h3>Создание тегов</h3>
      <Input 
        value={delimiter}
        onChange={e => setDelimiter(e.target.value)}
        name='create-tags-delimiter' 
        placeholder='Разделитель' 
      />
      <Textarea 
        value={tags}
        onChange={changeHandler}
        name='create-tags' 
        placeholder={'Теги'}
      />
      <TagList tags={renderTags(tags)} />
    </div>
  )
}