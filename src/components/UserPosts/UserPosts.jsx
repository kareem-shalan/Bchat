import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import LoadingButtons from '../LoadingButtons/LoadingButtons.jsx'
import { AiOutlineLike } from 'react-icons/ai';
import {jwtDecode} from 'jwt-decode';

export default function UserPosts() {
  const [showComments, setShowComments] = useState(false)
 
    const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return diffInHours + 'h ago';
    } else if (diffInDays < 7) {
      return diffInDays + 'd ago';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  
    const token = localStorage.getItem('UserToken')
    const decoded = jwtDecode(token)
    const IDUser = decoded.user
    console.log(IDUser);

  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${IDUser}/posts?limit=2`, {
      headers: {
        token: localStorage.getItem('UserToken')
      }
    })
  }


  const { data, isLoading, error } = useQuery({
    queryKey: ['userPosts'],
    queryFn: getUserPosts,
    select: (data) => data.data.posts,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 8 * 1000, //8 seconds

  })

  if (isLoading) {
    return <div className='flex items-center justify-center '> <LoadingButtons /></div>
  }

  if (error) {
    return <div className='text-red-500 flex items-center justify-center h-screen'>{error.message}</div>
  }
  return (
    <div className="max-w-2xl  mx-auto space-y-6 md:w-1/2 xl:w-full  w-full  ">
      {data?.map((post, index) => (
        <article
          key={index}
          className="bg-[#282828] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border "
        >
          <header className="p-4 flex items-center   gap-3 ">
            <img
              src={post.user?.photo || 'https://linked-posts.routemisr.com/uploads/default-profile.png'}
              alt={post.user?.name}
              className="w-12 h-12 rounded-full object-cover ring-6 ring-[#1A1A1A]"
            />
            <div className="  ">
              <h2 className="font-semibold text-white">{post.user?.name || 'Anonymous'}</h2>
              <time className="text-xs text-[#FFFD02]">{formatDate(post.createdAt)}</time>
            </div>
          </header>

          <div className="p-4">
            {post.body && (
              <p className="text-white text-start leading-relaxed mb-4 whitespace-pre-wrap">
                {post.body}
              </p>
            )}

            {post.image && (
              <img
                src={post.image}
                alt="Post content"
                className="w-full rounded-xl object-cover max-h-96 mb-4"
              />
            )}

            <footer className="  flex  items-center gap-6 pt-4 border-t border-gray-100 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg
                  onClick={() => setShowComments(!showComments)}
                  className="w-5 h-5 cursor-pointer text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {/* comments+ likes */}
                <div className="flex items-center justify-between
                   gap-2 w-full  mb-1">
                  <span
                    onClick={() => setShowComments(!showComments)}
                    className="font-medium text-white cursor-pointer">{post.comments?.length || 0} comments</span>

                  <span className="font-medium text-blue-500 flex items-center gap-1 justify-center">{post.likes?.length || 0} <AiOutlineLike /></span>
                </div>
              </div>


            </footer>
            {/* show comments */}
            <div className={`flex flex-col gap-2 mt-2 ${showComments ? 'block' : 'hidden'}`}>
              {post.comments?.slice(0, 10).map((comment, index) => (
                <div key={index} className="flex items-center gap-2">
                  {post.image && (
                    <img
                      src={post.user?.photo || 'https://linked-posts.routemisr.com/uploads/default-profile.png'}
                      alt={post.user?.name}
                      className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100"
                    />
                  )}
                  <p className='bg-amber-300/40 py-3 px-6 min-w-[400px] rounded-full'>
                    <span className=' font-extrabold text-black '>

                      {comment?.commentCreator?.name}
                    </span> :
                    <span className='font-mono ms-2 text-black/60'>
                      {comment?.content}
                    </span>

                  </p>

                </div>
              ))}
            </div>
          </div>
        </article>
      ))}

      {!data || data.length === 0 && (
        <div className="text-center py-12">
          <p className="text-red-500 text-lg">No posts found go and create one</p>
        </div>
      )}
    </div>
  )
}
