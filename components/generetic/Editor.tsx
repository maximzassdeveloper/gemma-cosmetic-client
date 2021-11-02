import { FC, useEffect } from 'react'
import EditorJS, { OutputData } from '@editorjs/editorjs'
import DragDrop from 'editorjs-drag-drop'
import Header from '@editorjs/header'
import Paragraph from '@editorjs/paragraph'
import Marker from '@editorjs/marker'
import Image from '@editorjs/image'
// import Link from '@editorjs/link'
import Table from '@editorjs/table'
import Quote from '@editorjs/quote'
import List from '@editorjs/list'
import Delimiter from '@editorjs/delimiter'
import { SERVER_URL } from '../../utils/config'
// import Attaches from '@editorjs/attaches'

interface EditorProps {
  onChange?: (data: any) => void
  data?: OutputData
}

export const Editor: FC<EditorProps> = ({ data, onChange: changeHand }) => {

  useEffect(() => {
    const editor = new EditorJS({
      onReady: () => {
        new DragDrop(editor);
      },
      onChange: () => {
        if (changeHand) {
          editor.save().then(d => changeHand(d)).catch()
        }
      },
      // logLevel: 'ERROR',
      holder: 'editor',
      placeholder: 'Описание',
      defaultBlock: 'paragraph',
      data,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: 'Заголовок'
          }
        },
        table: Table,
        delimiter: Delimiter,
        quote: Quote,
        list: List,
        // attaches: {
        //   class: Attaches,
        //   config: {
        //     endpoint: 'http://localhost:5000/api/upload',
        //     buttonText: 'Выбрать файл'
        //   }
        // },
        marker: Marker,
        paragraph: {
          class: Paragraph,
          inlineToolbar: true
        },
        image: {
          class: Image,
          config: {
            endpoints: {
              byFile: `${SERVER_URL}/api/upload`,
            },
            types: 'image/*, video/*',
            buttonText: 'Выбрать изображение'
          }
        }
      }
    })

    return () => {
      editor.isReady.then(() => {
        editor.destroy()
      }).catch(e => console.log('Editor Error', e))
    }
  }, [])

  return (
    <div className="editor-wrapper editor-styles">
      <div id="editor" />
    </div>
  )
}