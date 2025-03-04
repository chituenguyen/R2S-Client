import { ReactElement, useState } from 'react'

function Modal({themTenFunction}: {themTenFunction:(name: string) => void}){
  const [nameCuaInput, setNameCuaInput] = useState<string>('');
  console.log(nameCuaInput);
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-4 rounded-md'>
        <div>Modal</div>
        <input id='name' type="text" value={nameCuaInput} onChange={(e) => setNameCuaInput(e.target.value)} className='border-2 border-gray-300 rounded-md p-2' />
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick = {() => themTenFunction(nameCuaInput)}>Add</button>
      </div>
    </div>
  )
}

function Home(): ReactElement {
  const [user, setUser] = useState<{id: string, name: string}[]>([{
    id: '1',
    name: 'John Doe'
  }, {
    id: '2',
    name: 'Jane D'
  }]);
  // const [name, setName] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  // const addUser = (name: string) => {
  //   setUser([...user, {id:String(Math.random()), name: name}]);
  // }
  const themTen = (nameNhapVao: string) => {
    setUser([...user, {id: String(Math.random()), name: nameNhapVao}])
  }
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold text-center mb-6 text-red-500">My To Do List</h1>
    
    </div>
      
  )
}

export default Home
