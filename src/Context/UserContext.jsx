import axios from "axios";
import { createContext, useState } from "react";

let UserContext = createContext();


function UserContextProvider(props) {
    const [Token, setToken] = useState(localStorage.getItem('UserToken'))
    const [UserLoggedIn, setUserLoggedIn] = useState(null)

    function getUserLoggedIn() {
        axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
            headers: {
                token: localStorage.getItem('UserToken')
            }
        }).then((res) => {
            console.log(UserLoggedIn);
            if (res.data.message === "success") {
                setUserLoggedIn(res.data.user)
            }
        }).catch((err) => {
            console.log(err);
        })
    }



    return (
        <UserContext.Provider value={{ Token, setToken , getUserLoggedIn, UserLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    )



}
export { UserContextProvider, UserContext };