// import React, { useState, useEffect } from 'react';

// function UserList() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
  
//     useEffect(() => {
//       fetch('https://jsonplaceholder.typicode.com/users')
//         .then((response) => {
//           if (!response.ok) {
//             throw new Error('Network response was not ok');
//           }
//           return response.json();
//         })
//         .then((data) => {
//           setUsers(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           setError(error);
//           setLoading(false);
//         });
//     }, []);
  
//     if (loading) {
//       return <p>Loading...</p>;
//     }
  
//     if (error) {
//       return <p>Error: {error.message}</p>;
//     }
  
//     return (
//       <div>
//         <div className='flex grid grid-cols-3 gap-4'>
//                 <p>Name</p>
//                 <p >Email</p>
//                 <p>Phone</p>
//             </div>
//         <ul>
//           {users.map((user) => (
//             <div className='flex grid grid-cols-3 gap-4'>
//                 <li key={user.id}>{user.name}</li>
//                 <li key={user.id}>{user.email}</li>
//                 <li key={user.id}>{user.phone}</li>
//             </div>
            
//           ))}
//         </ul>
//       </div>
//     );
//   }
  
//   export default UserList;