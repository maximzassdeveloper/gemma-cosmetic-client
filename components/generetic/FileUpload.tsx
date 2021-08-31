import React, { FC, useRef, useState, useEffect } from 'react'
import { Upload, X } from 'react-feather'
import { v4 } from 'uuid'

interface FileUploadProps {
  name: string
  multiple?: boolean
  initial?: string[]
  onChange?: (files: File[]) => void
}

export const FileUpload: FC<FileUploadProps> = ({ name, initial, multiple, onChange }) => {

  const input = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])

  const blobToFile = (theBlob: Blob, fileName: string): File => {
    var b: any = theBlob
    b.lastModifiedDate = new Date()
    b.name = fileName
    return b
  }

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
    setFiles([...files, ...f])

    if (onChange) onChange([...files, ...f])
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
        onChange={inputChange}
      />
      <div className="fileupload__list">

        {files.map((file, index) => 
          <div key={file.name + index} className="fileupload__item item">
            <img src={URL.createObjectURL(file)} />
            <div onClick={() => deleteHandler(index)} className="item__delete"><X /></div>
          </div>
        )}

        {(!multiple && !files.length || multiple) && <button type='button'
          className="fileupload__upload"
          onClick={inputTarget}
        ><Upload /></button>}

      </div>
    </div>
  )
}