import { useRef } from "react"
import { client } from "./common/client"
import { useNavigate } from "react-router-dom";

export const Signup=()=>{
    const username=useRef();
    const email=useRef();
    const password=useRef();
    const isAdmin=useRef(false);
    const navigate=useNavigate();

    async function Signup(){
        const usernameValue=username.current.value;
        const emailValue=email.current.value;
        const passwordValue=password.current.value;
        const isAdminValue=isAdmin.current;

        await client.post("/signup",{username:usernameValue , email:emailValue , password:passwordValue , isAdmin:isAdminValue})
            .then(async(res)=>{
                console.log(res.data);
                if(res.data=="Created new user."){
                    navigate("/login")
                }
            }).catch((err)=>{
                console.log(err);
            })
    }

    function checkBox(){
        isAdmin.current=!isAdmin.current;
    }

    return(
        <div>
            <input placeholder="Username" ref={username}/>
            <input placeholder="Email" ref={email}/>
            <input placeholder="Password" ref={password}/>
            <input type="checkbox" onClick={()=>checkBox()}/>
            <button onClick={()=>Signup()}>Create new user</button>
        </div>
    )
}