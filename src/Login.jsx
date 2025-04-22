import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

function Login(){

   const [data,setdata]=useState({})
   const [error,seterror]=useState("");
   const navigetor =useNavigate();
   function getvalue(e){
      var name=e.target.name;
      var value=e.target.value;
      setdata((a)=>({...a,[name]:value}))
   }
   function abc(e){
      e.preventDefault()
      axios.post('https://dummyjson.com/user/login',data)
      .then(res=>{
         if(res){
            alert("login success")
            navigetor("/user")
         }
      })
      .catch(err=>{
         console.log(err.response.data)
         seterror(err.response.data.message)
      })
      console.log(data)
   }

     return (
        <div >
            <h1>Login form</h1>
            <form onSubmit={abc}>
               <input type="text" name="username" className="border" placeholder="enter username" onChange={(e)=>{getvalue(e)}} /><br />
               <input type="text" name="password" className="border" placeholder="enter password" onChange={(e)=>{getvalue(e)}}/>
               <br />
               {error && <p style={{color:"red"}}>{error}</p>}
               <button type="submit" style={{padding:"10px",color:"red"}}>submit</button>
            </form>
        </div>
     )
}
export default Login;