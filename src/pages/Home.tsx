import { ReactElement, useState } from "react"
import { UseDispatch, useSelector } from "react-redux"

function Modal({
  themViecFunction,
  resetViecFunction,
  xoaViecFunction
}: {
  themViecFunction: (title: string) => void
  resetViecFunction: () => void
  xoaViecFunction: (id: number) => void
}) {
  const [titleCuaInput, setTitleCuaInput] = useState<string>("")
  console.log(titleCuaInput)
  return (
    <div>
      <div className="text-center text-lg text-bold text-red-500">
        <p>My Todo List</p>
      </div>
      <div className="bg-white p-4 rounded-md flex">
        <input
          id="title"
          type="text"
          value={titleCuaInput}
          onChange={(e) => setTitleCuaInput(e.target.value)}
          className="border-2 border-gray-300 rounded-md p-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => themViecFunction(titleCuaInput)}
        >
          Add
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => resetViecFunction()}
        >
          Reset
        </button>
      </div>
    </div>
  )
}

function Home(): ReactElement {
  const [todo, setTodo] = useState<{ id: number; title: string }[]>([
    {
      id: 1,
      title: "Di choi"
    },
    {
      id: 2,
      title: "choi game"
    }
  ])
  // const [name, setName] = useState<string>('');
  // const [openModal, setOpenModal] = useState<boolean>(false)
  // const addUser = (name: string) => {
  //   setUser([...user, {id:String(Math.random()), name: name}]);
  // }
  const themViec = (titleNhapVao: string) => {
    if (titleNhapVao == "") {
      return
    }
    setTodo([...todo, { id: String(Math.random()), title: titleNhapVao }])
  }

  const xoaViec = (id: string) => {
    setTodo(todo.filter((todo) => todo.id !== id))
  }

  const resetViec = () => {
    setTodo([])
  }

  return (
    <div className="">
      <ul>
        <li class="w-[200px] h-[100px]">
          <Modal themViecFunction={themViec} resetViecFunction={resetViec} />
        </li>
        <li className="ml-4 w-[250px] relative">
          {todo.map((todo) => (
            <div className="border my-3 h-9 rounded-sm shadow-lg" key={todo.id}>
              {todo.title}
              <button
                onClick={() => xoaViec(todo.id)}
                className="absolute right-0 w-10 h-9 bg-emerald-400"
              >
                X
              </button>
            </div>
          ))}
        </li>
      </ul>
    </div>
  )
}

export default Home
