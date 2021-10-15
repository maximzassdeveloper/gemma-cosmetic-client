import editorParser from 'editorjs-html'
import htmlParser from 'html-react-parser'

function getRandom(min: number, max: number) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

export const getRandomFromArray = (arr: any[], count = 1): any[] => {
  const indexes = arr.map((_,i) => i)
  const returned: number[] = []
  const max = count > arr.length ? arr.length : count

  for (let i = 0; i < max; i++) {
    const r = getRandom(0, indexes.length-1)
    returned.push(arr[indexes[r]])
    indexes.splice(r, 1)
  }

  return returned
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

export function setCookie(cookName: string, cookValue: any, expDays: number) {
  let date = new Date()
  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
  const expires = "expires=" + date.toUTCString()
  document.cookie = cookName + "=" + cookValue + "; " + expires + "; path=/"
}

export function getCookie(cookName: string) {
  const name = cookName + "="
  const cDecoded = decodeURIComponent(document.cookie)
  const cArr = cDecoded .split('; ')
  let res: any
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length)
  })
  return JSON.parse(res || '')
}