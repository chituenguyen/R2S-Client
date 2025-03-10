
import Table from '../components/table/Table';
import React, { ReactElement } from 'react';
import Header from '../components/Header/header';
import PostDetail from '../components/effect/postDetail';




function Home(): ReactElement {
  return (
    <div className="">
      <Header/>
     <div>Home page</div>
     <Table />
     <PostDetail/>
     
    </div>
  )
}

export default Home
