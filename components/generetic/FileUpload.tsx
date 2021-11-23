import { FC, useEffect, useRef, useState } from 'react'
import { Upload, X } from 'react-feather'
import { Image } from '.'
import authAxios from '../../services/axiosService'
import { IFile } from '../../types/product'

interface FileUploadProps {
  name?: string
  multiple?: boolean
  accept?: string
  max?: number
  files?: IFile[]
  onChange?: (files: IFile[]) => void
}

export const FileUpload: FC<FileUploadProps> = ({ 
  name, multiple = false, accept, max = 4, files: initFiles, onChange 
}) => {

  const input = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<IFile[]>(initFiles || [])

  useEffect(() => {
    if (onChange) onChange(files)
  }, [files])

  useEffect(() => {
    if (initFiles) setFiles(initFiles)
  }, [initFiles])

  const uploadFile = async (file: File) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const data = await authAxios.post<{ file: IFile }>('/upload/add', formData)
      return data.data.file
    } catch {
      return null
    }
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = Array.from(e.target.files || [])
    f.forEach(async file => {
      const n = await uploadFile(file)
      if (n) setFiles(prev => [n, ...prev])
    })
  }

  const onDelete = async (url: string) => {
    try {
      await authAxios.post('/upload/remove', { url })
      setFiles(files.filter(x => x.url !== url))
    } catch(e) {}
  }

  return (
    <div className="fileupload">
      <input 
        ref={input} 
        type="file" 
        name={name}
        multiple={multiple}
        accept={accept || '.jpg, .jpeg, .png, .webp, .mp4, .avi, .mov'}
        onChange={inputChange}
      />
      <div className="fileupload__list">

        {files.map(file => 
          <div key={file.id} className="fileupload__item item">
            <Image file={file} />
            {<div onClick={() => onDelete(file.url)} className="item__delete"><X /></div>}
          </div>
        )}

        {(!multiple && !files.length || multiple) && files.length < max && <button type='button'
          className="fileupload__upload"
          onClick={() => input.current?.click()}
        >
          <Upload />
        </button>}

      </div>
    </div>
  )
}