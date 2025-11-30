import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function UserProfileHook() {

function getUserProfile() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
        headers: {
            token: localStorage.getItem('UserToken')
        }
    })
}

const { data, isLoading, error } = useQuery(
    {
        queryKey: ['userProfile'],
        queryFn: getUserProfile,
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 8*1000, //8 seconds
        
        
    }
)
    
  return { data: data?.data?.user, isLoading, error }
}
export { UserProfileHook  }