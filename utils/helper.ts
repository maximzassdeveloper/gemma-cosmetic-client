import editorParser from 'editorjs-html'
import htmlParser from 'html-react-parser'

function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export const getRandomFromArray = (items: any[], count: number = 1) => {
  const arr = []

  console.log(items)

  for (let i = 0; i < count; i++) {
    let index = getRandom(0, items.length)
    if (index) {
      arr.push(items[index])
      items.splice(index, 1)
    }
  }
  
  return arr
}

export const editorRender = (content: string) => {
  if (!content) return ''
  
  function ownImageParser({ data }){
    const r = data.file.url.split('.')[1]
    const videoArr = ['mp4', 'avi', 'mov']
    if (videoArr.includes(r)) {
      return `<video src="${data.file.url}" controlslist="nodownload" controls alt="${data.caption}"></video>`
    } else {
      return `<img src="${data.file.url}" alt="${data.caption}" />`
    }
  }

  try {
    const edjsParser = editorParser({ image: ownImageParser })
    const html = edjsParser.parse(JSON.parse(content))
    return htmlParser(html.join(''))
  } catch(e) {
    console.log(e)
    return ''
  }
}

export const checkExtension = (str: string) => {
  const imgArr = ['jpg', 'jpeg', 'png', 'svg']
  const videoArr = ['mp4', 'mac', 'vam']

  if (imgArr.includes(str)) return 'image'
  else if (videoArr.includes(str)) return 'video'
  else return ''
}