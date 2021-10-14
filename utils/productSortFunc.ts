import { IProduct } from '../types/product'

export function partitionDown(arr: IProduct[], start: number, end: number) {
  const pivotValue = arr[end].price
  let pivotIndex = start
  for (let i = start; i < end; i++) {
    if (arr[i].price > pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
      pivotIndex++
    }
  }
  
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
  return pivotIndex
}

export function partitionUp(arr: IProduct[], start: number, end: number) {
  const pivotValue = arr[end].price
  let pivotIndex = start
  for (let i = start; i < end; i++) {
    if (arr[i].price < pivotValue) {
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]]
      pivotIndex++
    }
  }
  
  [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]] 
  return pivotIndex
}

export function quickSort(arr: IProduct[], start: number, end: number, dir: 'up' | 'down') {
  if (start >= end) return
  
  let index
  switch (dir) {
    case 'down': index = partitionDown(arr, start, end)
    case 'up' : index = partitionUp(arr, start, end)
  }
  
  quickSort(arr, start, index - 1, dir)
  quickSort(arr, index + 1, end, dir)
}