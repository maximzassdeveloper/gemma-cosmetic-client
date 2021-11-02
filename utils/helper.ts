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

// Cookies

export function setCookie(name: string, val: any, expDays: number = 7) {
  const date = new Date()
  const value = JSON.stringify(val ?? '')

  date.setTime(date.getTime() + (expDays * 24 * 60 * 60 * 1000))
  document.cookie = name+"="+value+"; expires="+date.toUTCString()+"; path=/"
}

export function getCookie(name: string) {
  const value = "; " + document.cookie
  const parts = value.split("; " + name + "=")
  
  if (parts.length == 2) {
    return JSON.parse(parts.pop().split(";").shift() ?? '')
  }
}

export function deleteCookie(name: string) {
  const date = new Date()
  date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000))
  document.cookie = name+"=; expires="+date.toUTCString()+"; path=/"
}