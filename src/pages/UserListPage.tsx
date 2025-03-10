import { ReactElement } from 'react'
import React from 'react'
import UserList from '../components/user/userlist'
import Header from '../components/Header/header';

function UserListPage(): ReactElement {
  return (
  <div>
    <Header/>
    <UserList/>
  </div>
  );
}

export default UserListPage