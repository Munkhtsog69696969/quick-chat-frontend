import { useRef } from "react"
import { client } from "./common/client"

export const Login=()=>{
    const email=useRef();
    const password=useRef();

    async function Login(){
        const emailValue=email.current.value;
        const passwordValue=password.current.value;

        await client.post("/login",{email:emailValue , password:passwordValue})
            .then(async(res)=>{
                console.log(res.data);
                if(res.data!="Wrong username or password." && res.data!="User doesnt exist."){
                    localStorage.setItem("token" , res.data);
                }
            }).catch((err)=>{
                console.log(err);
            })
    }

    return(
        <div>
            <input placeholder="Email" ref={email}/>
            <input placeholder="Password" ref={password}/>
            <button onClick={()=>Login()}>Log in</button>
        </div>
    )
}