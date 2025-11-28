import axios from 'axios';
import React, { createContext, useState } from 'react'

const PostContext = createContext();

export default function PostContextProvider(props) {

     const [Post, setPost] = useState([]);
    const [Loading, setLoading] = useState(false);

    function getPosts() {
        setLoading(true);
        axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
            headers: {
                token: localStorage.getItem('UserToken')


            }
        }).then((res) => {

          
            if (res.data.message === "success") {
                return setPost(res.data.posts);
            }

        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            setLoading(false);
        })
    }


    return (
        <PostContext.Provider value={{ getPosts  ,Post, Loading}}>
            {props.children}
        </PostContext.Provider>
    )
}

export { PostContextProvider, PostContext };