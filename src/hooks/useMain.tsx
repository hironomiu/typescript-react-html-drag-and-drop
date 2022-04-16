import { useState } from 'react'
import { Dragged } from '../types'

export const useMain = () => {
  // TODO: Draggedを自動生成したい(boards内のtitleをユニオン型で定義)
  const [dragged, setDragged] = useState<Dragged>({
    id: 0,
    current: 'todo',
    target: 'todo',
  })

  return {
    dragged,
    setDragged,
  }
}
