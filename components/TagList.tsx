import { FC } from 'react'

interface TagListProps {
  tags: string[]
}

export const TagList: FC<TagListProps> = ({ tags }) => {

  if (!tags || !tags?.length) return null

  return (
    <div className="tags">
      {tags.map((tag, index) => 
        <span className="tag" key={index+tag}>{tag}</span>
      )}
    </div>
  )
}