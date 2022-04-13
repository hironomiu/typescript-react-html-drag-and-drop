import React from 'react'
import Cards from './Cards'
import { useMain } from '../hooks/useMain'

const Main = () => {
  const {
    todos,
    setTodos,
    dragged,
    setDragged,
    isTodo,
    setIsTodo,
    isDoing,
    setIsDoing,
    isDone,
    setIsDone,
  } = useMain()

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('on drag:', e.currentTarget.className.split(' ')[0])
    // TODO: currentを'todo' | 'doing' | 'done'に縛る方法（現状はstring）
    const current = e.currentTarget.className.split(' ')[0]

    if (current === 'todo' || current === 'doing' || current === 'done')
      setDragged((_prev) => ({
        ..._prev,
        id: Number((e.target as HTMLDivElement).id),
        current: current,
      }))
  }

  const handleDragEnd = () => {
    const card = todos.filter((todo) => todo.id === dragged.id)
    const newData = todos.filter((todo) => todo.id !== dragged.id)
    setTodos(newData)

    // TODO: switch & never で縛る
    if (dragged.current === 'todo' && dragged.target !== 'todo') {
      // todo -> doing or done
      console.log('todo drag end:', dragged)

      if (dragged.target === 'doing') card[0].type = 2
      if (dragged.target === 'done') card[0].type = 3
    } else if (dragged.current === 'doing' && dragged.target !== 'doing') {
      // doing -> done or todo
      console.log('doing drag end:', dragged)

      if (dragged.target === 'done') card[0].type = 3
      if (dragged.target === 'todo') card[0].type = 1
    } else if (dragged.current === 'done' && dragged.target !== 'done') {
      // done -> doing or todo
      console.log('done drag end:', dragged)

      if (dragged.target === 'doing') card[0].type = 2
      if (dragged.target === 'todo') card[0].type = 1
    } else {
      console.log('drag end else!!!!!!!:', dragged)
    }
    setTodos((_prev) => [..._prev, card[0]])
    setDragged({ id: 0, current: 'todo', target: 'todo' })
    setIsTodo(false)
    setIsDoing(false)
    setIsDone(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // preventDefaultをすることでCardの動きがcurrentに戻る動作（戻ってからtargetに配置される）を防ぐ
    e.preventDefault()
    // TODO: currentを'todo' | 'doing' | 'done'に縛る方法（現状はstring）
    const current = e.currentTarget.className.split(' ')[0]
    console.log('drag over:', current)

    if (current === 'todo' || current === 'doing' || current === 'done') {
      setDragged((_prev) => ({ ..._prev, target: current }))
    }

    // TODO: switch & never で縛る
    if (current === 'todo') {
      setIsTodo(true)
    } else if (current === 'doing') {
      setIsDoing(true)
    } else if (current === 'done') {
      setIsDone(true)
    } else {
      console.log('drag over error!!:', current)
    }
  }

  const styleMain =
    'w-72 h-[80vh] mx-4 flex flex-col wjustify-center items-center rounded-xl overflow-y-auto'
  const styleActive = 'bg-blue-500'
  const styleInactive = 'bg-blue-300'

  const handleClick = () => {
    setTodos([...todos, { id: 4, title: 'todo title4', type: 1 }])
  }

  return (
    <>
      <div className="flex h-[90vh] w-screen m-10">
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
          <Cards title="ToDo" cards={todos.filter((todo) => todo.type === 1)} />
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
          <Cards
            title="Doing"
            cards={todos.filter((todo) => todo.type === 2)}
          />
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
          <Cards title="Done" cards={todos.filter((todo) => todo.type === 3)} />
        </div>
        <button
          className=" border-0 h-12 w-64 rounded-xl bg-purple-300 hover:bg-purple-600"
          onClick={handleClick}
        >
          Card Create
        </button>
      </div>
    </>
  )
}

export default Main
