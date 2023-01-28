import jwt_decode from "jwt-decode"
import { Link } from "react-router-dom";

export const Home=()=>{
    const token=localStorage.getItem("token");
    const decodedToken=jwt_decode(token);

    const user=decodedToken.existingUser;

    console.log(user)
    return(
        <div>
            <div>{user.username}</div>
            <div>{user.email}</div>

            <div>
                <input placeholder="Enter room code"/>
                <button>Search for rooms</button>
            </div>

            <div>
                <Link to="/createroom">Create room</Link>
            </div>
            
        </div>
    )
}