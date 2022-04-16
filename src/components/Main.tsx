import { useMain } from '../hooks/useMain'
import Board from './Board'
import { BoardType } from '../types'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectBoards,
  setBoardIsActive,
  setAllBoardIsActiveFlase,
} from '../features/board/board.Slice'
import {
  selectTodos,
  setTodoBoardId,
  addTodo,
} from '../features/todo/todoSlice'

const Main = () => {
  const dispatch = useDispatch()
  const boards = useSelector(selectBoards)
  const todos = useSelector(selectTodos)
  const { dragged, setDragged } = useMain()

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('on drag:', e.currentTarget.className.split(' ')[0])
    // TODO: currentをboards.titleにユニオン型で縛る（現状はstring）
    const current = e.currentTarget.className.split(' ')[0]
    if (boards.some((board: BoardType) => board.title === current))
      setDragged((_prev) => ({
        ..._prev,
        id: Number((e.target as HTMLDivElement).id),
        current: current,
      }))
  }

  const handleDragEnd = () => {
    if (dragged.current !== dragged.target) {
      console.log('drag end:', dragged.current, dragged.target)
      const board = boards.find(
        (board) => board.title === dragged.target
      ) as BoardType
      dispatch(setTodoBoardId({ id: board.id, dragged }))
    } else {
      // TODO: board内の要素の入れ替えをここに実装する
      console.log('drag end else!!!!!!!:', dragged)
    }
    setDragged({ id: 0, current: 'todo', target: 'todo' })
    dispatch(setAllBoardIsActiveFlase())
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    // preventDefaultをすることでCardの動きがcurrentに戻る動作（戻ってからtargetに配置される）を防ぐ
    e.preventDefault()
    // TODO: currentを'todo' | 'doing' | 'done'に縛る方法（現状はstring）
    const current = e.currentTarget.className.split(' ')[0]
    console.log('drag over:', current, e.screenX, e.screenY)

    // TODO: boardsを使ってcurrentと付き合わせる
    if (current === 'todo' || current === 'doing' || current === 'done') {
      setDragged((_prev) => ({ ..._prev, target: current }))
    }

    if (boards.filter((board: BoardType) => board.title === current)) {
      const board = boards.filter(
        (board: BoardType) => board.title === current
      )[0]
      dispatch(setBoardIsActive({ id: board.id, isActive: true }))
    }
  }

  const handleOnLeave = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(`${e.currentTarget.className.split(' ')[0]} drag leave`)
    const current = e.currentTarget.className.split(' ')[0]
    const board = boards.filter(
      (board: BoardType) => board.title === current
    )[0]
    dispatch(setBoardIsActive({ id: board.id, isActive: false }))
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

    dispatch(
      addTodo({
        id: maxId + 1,
        title: `task title${maxId + 1}`,
        body: `task body${maxId + 1}`,
        boardId: 1,
        orderId: maxOrderId + 1,
      })
    )
  }

  return (
    <div className="flex w-scree">
      <div className="flex m-8">
        {boards.map((board) => (
          <Board
            key={board.id}
            board={board}
            handleOnDrag={handleOnDrag}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleOnLeave={handleOnLeave}
          />
        ))}
        <div>
          <button
            className=" border-0 h-12 w-56 rounded-xl bg-pink-200 hover:bg-pink-400"
            onClick={handleClick}
            data-testid="card-create-button"
          >
            Card Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default Main
