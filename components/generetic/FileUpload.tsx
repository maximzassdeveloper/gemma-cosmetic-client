import React, { FC, useRef, useState, useEffect, memo } from 'react'
import { Upload, X } from 'react-feather'
import { v4 } from 'uuid'

interface FileUploadProps {
  name: string
  multiple?: boolean
  initial?: string[]
  files?: File[]
  max?: number
  accept?: string
  onChange?: (files: File[]) => void
}

export const FileUpload: FC<FileUploadProps> = memo(({ 
  name, initial, multiple, onChange, max = 4, accept, files: dfiles
}) => {

  const input = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])

  const blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob
    b.lastModifiedDate = new Date()
    b.name = fileName
    return b
  }

  useEffect(() => {
    if (!dfiles) return
    if (dfiles !== files) {
      setFiles(dfiles)
    }
  }, [dfiles])

  useEffect(() => {
    if (!initial) return
    initial.forEach(async url => {
      const bl: any = await fetch(url).then(r => r.blob())
      setFiles([...files, blobToFile(bl, v4())])
    })
  }, [initial])

  const inputTarget = () => {
    input.current?.click()
  }

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = Array.from(e.target.files || [])
    console.log(f)
    setFiles([...files, ...f].slice(0, max))

    if (onChange) onChange([...files, ...f].slice(0, max))
  }

  const deleteHandler = (index: number) => {
    setFiles(files.filter((x, ind) => ind !== index))
  }

  return (
    <div className="fileupload">
      <input 
        ref={input} 
        type="file" 
        name={name}
        multiple={multiple}
        accept={accept || '.jpg, .jpeg, .png, .mp4, .avi, .mov'}
        onChange={inputChange}
      />
      <div className="fileupload__list">

        {files.map((file, index) => 
          <div key={file.name + index} className="fileupload__item item">
            {file.type.split('/')[0] === 'image' 
              ? <img src={URL.createObjectURL(file)} alt='' />
              : file.type.split('/')[0] === 'video' 
              ? <video src={URL.createObjectURL(file)} />
              : <p>Файл</p>
            }
            <div onClick={() => deleteHandler(index)} className="item__delete"><X /></div>
          </div>
        )}

        {(!multiple && !files.length || multiple) && files.length < max && <button type='button'
          className="fileupload__upload"
          onClick={inputTarget}
        ><Upload /></button>}

      </div>
    </div>
  )
})