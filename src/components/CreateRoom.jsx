import { useState } from "react"
import { useEffect } from "react"
import { client } from "./common/client"

export const CreateRoom=()=>{
    const [users,setUsers]=useState()
    const [page,setPage]=useState(1);
    const num=3;
    const [allUsers,setAllUsers]=useState();
    const [allPages,setAllPages]=useState();
    const [array,setArray]=useState([]);

    useEffect(()=>{
        client.get("/users"+"/"+num+"?"+page)
            .then(async(res)=>{
                setUsers(res.data);
            })
    },[]);

    useEffect(()=>{
        client.get("/allusers")
            .then(async(res)=>{
                setAllUsers(res.data);
            })
    },[]);

    useEffect(()=>{
        if(allUsers && allUsers){
            setAllPages(parseInt(allUsers.length/num)+1)
        }
    },[allUsers]);

    async function Next(){
        setPage(prev=>prev+1);
        client.get("/users"+"/"+num+"?pages="+page)
        .then(async(res)=>{
            setUsers(res.data);
        })
    }

    useEffect(()=>{
        for(let i=1;i<=allPages;i++){
            array.push(i);
            setArray(array);
        }
    },[allPages]);

    // console.log(array)

    async function Change(i){
        await client.get("users"+"/"+num+"?pages="+i)
            .then(async(res)=>{
                setUsers(res.data)
            })
    }

    return(
        <div>
            {
                users && users.map((item,i)=>{
                    return(
                        <div key={i}>{item.email}</div>
                    )
                })
            }
            <button onClick={()=>Next()}>next</button>
            {
                array && array.map((item,i)=>{
                    return(
                        <div key={i} onClick={()=>Change(i+1)}>{item}</div>
                    )
                })
            }
        </div>
    )
}