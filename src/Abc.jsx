import React from 'react'
import { useState } from 'react';
import Hello from './components/batch_react/Hello';
import Login from "./Login"

function App() {
  // const [count,setcount]=useState([]);
  // var list=["home","about","contact"]
  // function abc(){
  //  setcount(["jay","ram"])
  // }

  // function getvalue(e){
  //   console.log(e.target.value,e.target.name)
  // }
  // function submit(e){
  //   e.preventDefault()
  //   alert("form submitted")
  // }

  var navbar=["home","about","contact","services","career"]

  return (
    
    <>
<ul>

    {
      navbar.map(function(value){
        return <li>{value}</li>
      })
    }
</ul>

    {/* <Hello/> */}
    {/* <Login/> */}

    {/* <ul>
      {list.map(function(item,index,arr){
        return <li key={index}>{item}</li>
      })}
    </ul>


    <form onSubmit={submit} action="">

    <input type="text" name='username' onChange={(e)=>{console.log(e.target.value)}} />
    <input type="text" name='password' onChange={(e)=>{getvalue(e)}} />
    <h1 className='font-bold text-2xl'>{count[0]}</h1>
    <button type='submit' onClick={()=>{abc()}}>click me</button>
    </form> */}
    </>

  )
}

// export default App