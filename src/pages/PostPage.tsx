import React, { ReactElement } from 'react';
import Header from '../components/Header/header';
import PostList from '../components/effect/postlist';


function Postpage(): ReactElement {
    return (
      <div className="">
        <Header/>
        <PostList/>
        
      </div>
    )
  }
  
export default Postpage;