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
    <div className="">
      <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={() => setOpenModal(true)}>Open</button>
      {user.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}

      {openModal ? <Modal themTenFunction={themTen}/> : null}
    </div>
  )
}

export default Home
