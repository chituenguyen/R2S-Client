
import Table from '../components/table/Table';
import React, { ReactElement } from 'react';
import Header from '../components/Header/header';
import PostDetail from '../components/effect/postDetail';
import DetailPost from '../components/everydayfresh';




function Home(): ReactElement {
  return (
    <div className="">
      <Header/>
     <div>Home page</div>
     <Table />
      <DetailPost/>
     {/* <PostDetail/> */}
     
    </div>
  )
}

export default Home
