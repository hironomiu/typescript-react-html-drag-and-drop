import { useMain } from '../hooks/useMain'
import Board from './Board'
import { BoardType } from '../types'
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
    boards,
    setBoards,
  } = useMain()

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('on drag:', e.currentTarget.className.split(' ')[0])
    // TODO: currentを'todo' | 'doing' | 'done'に縛る方法（現状はstring）
    const current = e.currentTarget.className.split(' ')[0]
    if (boards.some((board: BoardType) => board.title === current))
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

    if (dragged.current !== dragged.target) {
      console.log('drag end:', dragged.current, dragged.target)
      const board = boards.find((board) => board.title === dragged.target)
      if (board) card[0].boardId = board.id
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
    console.log('drag over:', current, e.screenX, e.screenY)

    if (current === 'todo' || current === 'doing' || current === 'done') {
      setDragged((_prev) => ({ ..._prev, target: current }))
    }

    // TODO: ここの仕様は途中なので考える
    if (boards.filter((board: BoardType) => board.title === current)) {
      const board = boards.filter(
        (board: BoardType) => board.title === current
      )[0]
      board.isActive = true
      const newBoards = boards.filter(
        (board: BoardType) => board.title !== current
      )
      // console.log(newBoards, board)
      // setBoards((_prev) => [...newBoards, board])
      // console.log(boards)
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

  const handleOnLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`${e.currentTarget.className.split(' ')[0]} drag leave`)
    if (e.currentTarget.className.split(' ')[0] === 'todo') {
      setIsTodo(false)
    } else if (e.currentTarget.className.split(' ')[0] === 'doing') {
      setIsDoing(false)
    } else if (e.currentTarget.className.split(' ')[0] === 'done') {
      setIsDone(false)
    }
  }

  const handleClick = () => {
    // APIから取得するまでArray内のidの最大値を取得し+1しセット
    // TODO: 将来的にはtodoの箇所をtodoをカラムとしidで引けるようにする
    const maxId = Math.max(...todos.map((todo) => todo.id)) | 0
    const maxOrderId =
      Math.max(
        ...todos
          .filter((todo) => todo.boardId === 1)
          .map((todo) => todo.orderId)
      ) | 0
    setTodos([
      ...todos,
      {
        id: maxId + 1,
        title: `todo title${maxId + 1}`,
        body: `todo body${maxId + 1}`,
        boardId: 1,
        orderId: maxOrderId + 1,
      },
    ])
  }

  return (
    <div className="flex  w-scree">
      <div className="flex m-10">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            setBoards={setBoards}
            todos={todos}
            // dragged={dragged}
            // setDragged={setDragged}
            isTodo={isTodo}
            setIsTodo={setIsTodo}
            isDoing={isDoing}
            // setIsDoing={setIsDoing}
            isDone={isDone}
            // setIsDone={setIsDone}
            // handleOnDrag={() => null}
            handleOnDrag={handleOnDrag}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleOnLeave={handleOnLeave}
          />
        ))}
        <button
          className=" border-0 h-12 w-64 rounded-xl bg-pink-200 hover:bg-pink-400"
          onClick={handleClick}
        >
          Card Create
        </button>
      </div>
    </div>
  )
}

export default Main
