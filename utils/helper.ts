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

export const checkExtension = (str: string) => {
  const imgArr = ['jpg', 'jpeg', 'png', 'svg']
  const videoArr = ['mp4', 'mac', 'vam']

  if (imgArr.includes(str)) return 'image'
  else if (videoArr.includes(str)) return 'video'
  else return ''
}