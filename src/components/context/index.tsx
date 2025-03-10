import { createContext, useContext, useState } from "react";

const name = 'John Doe';
const UserContext = createContext<string>(name);
function DemoUseContext() {
  return (
    <UserContext.Provider value={name}>
      <div>
      DemoUseContext with name: {name}
      <br/>
      <ChildrenComponent/>
    </div>
    </UserContext.Provider>
    
  )
}

function ChildrenComponent(){
  const name = useContext(UserContext);
  return <>
    This is a children component with name: {name}
    <br/>
    <ChilrenComponent2/>
  </>
}

function ChilrenComponent2(){
  const name = useContext(UserContext);
  return <>
    This is a children component 2 with param: {name}
  </>
}

// con cua con cai
// con cua con cua con cai.
export default DemoUseContext
