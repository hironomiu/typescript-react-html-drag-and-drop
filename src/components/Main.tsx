import React, { ChangeEvent, useState } from 'react'
import Cards from './Cards'
import { CardType } from '../types'

const Main = () => {
  const [todos, setTodos] = useState<CardType[] | []>(() => [
    { id: 1, title: 'todo title1' },
    { id: 2, title: 'todo title2' },
    { id: 3, title: 'todo title3' },
  ])
  const [doings, setDoings] = useState<CardType[] | []>(() => [])
  const [dones, setDones] = useState<CardType[] | []>(() => [])
  const [dragged, setDragged] = useState<{
    id: number
    current: 'todo' | 'doing' | 'done'
    target: 'todo' | 'doing' | 'done'
  }>({ id: 0, current: 'todo', target: 'todo' })

  const [isTodo, setIsTodo] = useState<boolean>(false)
  const [isDoing, setIsDoing] = useState<boolean>(false)
  const [isDone, setIsDone] = useState<boolean>(false)

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('on drag:', e.currentTarget.className.split(' ')[0])
    const current = e.currentTarget.className.split(' ')[0]

    if (current === 'todo' || current === 'doing' || current === 'done')
      setDragged((_prev) => ({
        ..._prev,
        id: Number((e.target as HTMLDivElement).id),
        current: current,
      }))
  }

  const handleDragEnd = () => {
    if (dragged.current === 'todo' && dragged.target !== 'todo') {
      console.log('todo drag end:', dragged)

      const data = todos.filter((todo) => todo.id === dragged.id)
      const newData = todos.filter((todo) => todo.id !== dragged.id)
      setTodos(newData)
      // todo -> doing
      if (dragged.target === 'doing') {
        if (data) setDoings((_prev) => [..._prev, ...data])
        setIsDoing(false)
      }
      // todo -> done
      if (dragged.target === 'done') {
        if (data) setDones((_prev) => [..._prev, ...data])
        setIsDone(false)
      }
      setDragged({ id: 0, current: 'todo', target: 'todo' })
    } else if (dragged.current === 'doing' && dragged.target !== 'doing') {
      console.log('doing drag end:', dragged)

      const data = doings.filter((todo) => todo.id === dragged.id)
      const newData = doings.filter((todo) => todo.id !== dragged.id)
      setDoings(newData)
      // doing -> done
      if (dragged.target === 'done') {
        if (data) setDones((_prev) => [..._prev, ...data])
        setIsDone(false)
      }
      // doing -> todo
      if (dragged.target === 'todo') {
        if (data) setTodos((_prev) => [..._prev, ...data])
        setIsTodo(false)
      }
      setDragged({ id: 0, current: 'todo', target: 'todo' })
    } else if (dragged.current === 'done' && dragged.target !== 'done') {
      console.log('done drag end:', dragged)

      const data = dones.filter((todo) => todo.id === dragged.id)
      const newData = dones.filter((todo) => todo.id !== dragged.id)
      setDones(newData)
      // done -> doing
      if (dragged.target === 'doing') {
        if (data) setDoings((_prev) => [..._prev, ...data])
        setIsDoing(false)
      }
      // done -> todo
      if (dragged.target === 'todo') {
        if (data) setTodos((_prev) => [..._prev, ...data])
        setIsTodo(false)
      }
      setDragged({ id: 0, current: 'todo', target: 'todo' })
    } else {
      console.log('drag end else!!!!!!!:', dragged)
      setIsTodo(false)
      setIsDoing(false)
      setIsDone(false)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const current = e.currentTarget.className.split(' ')[0]
    console.log('drag over:', current)
    if (current === 'todo') {
      setDragged((_prev) => ({ ..._prev, target: current }))
      setIsTodo(true)
    }

    if (current === 'doing') {
      setDragged((_prev) => ({ ..._prev, target: current }))
      setIsDoing(true)
    }

    if (current === 'done') {
      setDragged((_prev) => ({ ..._prev, target: current }))
      setIsDone(true)
    }
  }

  const styleMain =
    'w-[20vw] h-[80vh] mx-4 flex flex-col wjustify-center items-center rounded-xl'
  const styleActive = 'bg-blue-500'
  const styleInactive = 'bg-blue-300'

  return (
    <>
      <div className="flex w-screen m-10">
        {/* ------------------------------------------------------ */}
        <div
          className={
            isTodo
              ? `todo ${styleMain} ${styleActive}`
              : `todo ${styleMain}  ${styleInactive}`
          }
          onDrag={handleOnDrag}
          onDragStart={() => console.log('todo drag start')}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={() => console.log('todo on drop')}
          onDragLeave={() => {
            console.log('todo drag leave')
            setIsTodo(false)
          }}
          onDragEnter={() => console.log('todo drag enter')}
        >
          <Cards title="Todo" cards={todos} />
        </div>
        {/* ------------------------------------------------------ */}
        <div
          className={
            isDoing
              ? `doing ${styleMain} ${styleActive}`
              : `doing ${styleMain} ${styleInactive}`
          }
          onDrag={handleOnDrag}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={() => console.log('doing on drop:', dragged)}
          onDragLeave={() => {
            console.log('doing drag leave')
            setIsDoing(false)
          }}
          onDragEnter={() => console.log('doing drag enter')}
        >
          <Cards title="Doing" cards={doings} />
        </div>
        {/* ------------------------------------------------------ */}
        <div
          className={
            isDone
              ? `done ${styleMain} ${styleActive}`
              : `done ${styleMain} ${styleInactive}`
          }
          onDrag={handleOnDrag}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDragLeave={() => {
            console.log('done drag leave')
            setIsDone(false)
          }}
          onDragEnter={() => console.log('done dragenter:')}
        >
          <Cards title="Done" cards={dones} />
        </div>
      </div>
    </>
  )
}

export default Main
