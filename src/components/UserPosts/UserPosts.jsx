import {  useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'
import LoadingButtons from '../LoadingButtons/LoadingButtons.jsx'
import { AiOutlineLike } from 'react-icons/ai';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';

function CommentItem({ comment, post, isCommentOwner, onDelete, queryClient }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment?.content || '')

  const handleUpdateComment = async (commentId) => {
    try {
      await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        content: editContent
      }, {
        headers: {
          token: localStorage.getItem('UserToken')
        }
      })
      queryClient.invalidateQueries({ queryKey: ['userPosts'] })
      setIsEditing(false)
      toast.success('Comment updated successfully')
    } catch {
      toast.error('Failed to update comment')
    }
  }

  return (
    <div className="flex items-center gap-2">
      {post.image && (
        <img
          src={comment?.commentCreator?.photo || post.user?.photo || 'https://linked-posts.routemisr.com/uploads/default-profile.png'}
          alt={comment?.commentCreator?.name}
          className="w-12 h-12 rounded-full object-cover ring-4 ring-blue-100"
        />
      )}
      <div className="flex-1 flex items-center gap-2">
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="bg-amber-300/40 py-3 px-6 min-w-[400px] rounded-full text-black flex-1"
            />
            <button
              onClick={() => handleUpdateComment(comment._id)}
              className="bg-green-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setEditContent(comment?.content || '')
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <p className='bg-amber-300/40 py-3 px-6 min-w-[400px] rounded-full'>
              <span className=' font-extrabold text-black '>
                {comment?.commentCreator?.name}
              </span> :
              <span className='font-mono ms-2 text-black/60'>
                {comment?.content}
              </span>
            </p>
            {isCommentOwner && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(comment._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function UserPosts() {
  const [showComments, setShowComments] = useState(false)
  const queryClient = useQueryClient();

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

  const DeletePost = async (postId) => {
     await axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
      headers: {
        token: localStorage.getItem('UserToken')
      }
    })
    queryClient.invalidateQueries({ queryKey: ['userPosts'] })
    toast.success('Post deleted successfully')
  }


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
    gcTime: 8 * 1000, //8 seconds,



  })

  if (isLoading) {
    return <div className='flex items-center justify-center '> <LoadingButtons /></div>
  }

  if (error) {
    return <div className='text-red-500 flex items-center justify-center h-screen'>{error.message}</div>
  }
  

  return (
    <div className={` space-y-6 flex items-start flex-col   mx-3 w-full mb-10 ${data?.length === 0 ? 'justify-center mx-auto' : 'justify-center'}
    
    `}>
      {data?.map((post, index) => (
        <article
          key={index}
          className="bg-[#282828] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border   "
        >
          <header className="p-4 flex items-center justify-between   gap-3 ">
            <div className="self-start flex items-center gap-2 ">
              <img
                src={post.user?.photo || 'https://linked-posts.routemisr.com/uploads/default-profile.png'}
                alt={post.user?.name}
                className="w-12 h-12 rounded-full object-cover ring-6 ring-[#1A1A1A]"
              />

              <div className='flex flex-col items-start justify-start'>
                <h2 className="font-semibold text-white">{post.user?.name || 'Anonymous'}</h2>
                <time className="text-xs text-[#FFFD02]">{formatDate(post.createdAt)}</time>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => DeletePost(post._id)}
                className='bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer'>Delete</button>
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
              {post.comments?.slice(0, 10).map((comment, index) => {
                const isCommentOwner = comment?.commentCreator?._id === IDUser

                const handleDeleteComment = async (commentId) => {
                  try {
                    await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
                      headers: {
                        token: localStorage.getItem('UserToken')
                      }
                    })
                    queryClient.invalidateQueries({ queryKey: ['userPosts'] })
                    toast.success('Comment deleted successfully')
                  } catch {
                    toast.error('Failed to delete comment')
                  }
                }

                return (
                  <CommentItem 
                    key={comment._id || index}
                    comment={comment}
                    post={post}
                    isCommentOwner={isCommentOwner}
                    onDelete={handleDeleteComment}
                    queryClient={queryClient}
                  />
                )
              })}
            </div>
          </div>
        </article>
      ))}

      {!data || data.length === 0 && (
        <div className="text-center   py-12">
          <p className="text-red-500 text-lg whitespace-nowrap ">No posts found go and create one</p>
        </div>
      )}
    </div>
  )
}
