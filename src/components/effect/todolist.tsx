import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import type { User } from '../../redux/types/user.types';
import { addTodo,deleteTodo,resetTodos } from '../../redux/slices/userSlice';
import { FaTrash } from 'react-icons/fa';


const TodoList: React.FC = () => {
    const dispatch = useAppDispatch();
      const { users, loading, error } = useAppSelector((state) => state.users);
      console.log(users, loading, error); 
      
    const [inputEmail, setInputEmail] = useState('');
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
        setInputEmail(e.target.value);
    }

    const [inputtitle, setInputtitle] = useState('');
    const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputtitle(e.target.value);
        console.log(inputtitle);
    };
    console.log( inputtitle);
    const handleAddTodo = () => {
        console.log( inputtitle);
        if (inputtitle.trim() && inputEmail.trim()) {
          dispatch(addTodo({email:inputEmail,title:inputtitle}));
          ;
          setInputtitle('');
          setInputEmail('');    
        }
      };
   
    const handleDeleteTodo = (id: number) => {
        dispatch(deleteTodo(id));
    };
    // const handleReset = () => {
    //     dispatch(resetTodos());
    // };
    // Skeleton component   
    const Skeleton = () => (    
        <div className="animate-pulse">      
            {[1, 2, 3, 4, 5].map((index) => (        
                <div key={index} className="mb-4 p-4 border rounded-lg bg-white">          
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>          
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>          
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>        
                </div>      
            ))}    
        </div>  
    );

    const ErrorMessage = () => (  
        <div className="p-4 text-red-500 bg-red-100 rounded-lg">    
            <p className="text-center">{error}</p>  
        </div>
    );
   
    const UserCard: React.FC<{ user: User }> = ({ user }) => (
        <div className="p-4 border rounded-lg bg-white hover:shadow-md transition-shadow">
            <h1 className="text-xl font-bold">{user.email}</h1>
            <p className="text-gray-600">{user.title}</p>
            <FaTrash onClick={() => handleDeleteTodo(user.id)}/>
        </div>
      );
    return (
        <div>
            {/* <button onClick={handleReset} className='bg-gray-500 ring-0 shadow'>Reset</button> */}
            <input type="text" value={inputEmail} placeholder='Email' onChange={handleInputChange} className='bg-gray-500 ring-0 shadow'/>
            <input type="text" value={inputtitle} placeholder='Title' onChange={handleInputTitle} className='bg-gray-500 ring-0 shadow'/>
            <button onClick={handleAddTodo}>Add Todo</button>
            <div className="space-y-4">
            <h1 className="text-2xl font-bold mb-6">Todo List</h1>
            {loading ? (
                <Skeleton />
                ) : error ? (
            <ErrorMessage />
                ) : (
            users.map(user => (
              <UserCard key={user.id} user={user} />
            ))
            )}
        </div>
        </div>
        
    );
}

export default TodoList;