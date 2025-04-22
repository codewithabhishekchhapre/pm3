import React, { useState } from 'react'

function Hello() {

     const [count,setcount]=useState(0);
     const [name,setname]=useState("user")

     function abc(){
          setcount(count+1)
          console.log(count)
          // alert(`The sum of ${a} and ${b} is ${a+b}`)
     }
     function xyz(e){
          setname(e.target.value)
          console.log(e.target.value,e.target.name)
     }

  return (
    <div>
     <h1>Hello {count} user</h1>
     <h2>username: {name}</h2>
     <input type="text" className='border' name='username' onChange={(e)=>{xyz(e)}} />
     <input type="text" className='border' name='password' onChange={(e)=>{xyz(e)}} />
     <button className="border px-2 py-1 " onClick={()=>{abc()}}>Click me</button>
    </div>
  )
}

export default Hello