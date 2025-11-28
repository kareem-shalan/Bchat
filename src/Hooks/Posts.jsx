import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function usePosts() {



    function getPosts() {
    return    axios.get(`https://linked-posts.routemisr.com/posts?limit=50`, {
            headers: {
                token: localStorage.getItem('UserToken')
            }
        })

    }


    const { data, isLoading, error } = useQuery(
        {
            queryKey: ['posts'],
            queryFn: getPosts,
            staleTime: 1000 * 60 * 5, // 5 minutes
            gcTime: 8*1000, //8 seconds
            
            
        }
    )







    return { data: data?.data?.posts, isLoading, error }
}



export { usePosts }