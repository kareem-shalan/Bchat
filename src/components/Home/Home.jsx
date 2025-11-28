import React, { useContext, useEffect, useState } from 'react'
import { PostContext } from '../../Context/PostContext.jsx'
import { AiOutlineLike } from 'react-icons/ai';
import UserProfile from '../UserProfile/UserProfile.jsx';
import LoadingPage from '../LoadingPage/LoadingPage.jsx';
import { RiMenuFold2Line } from 'react-icons/ri';

export default function Home() {
  let { getPosts, Post, Loading } = useContext(PostContext)
  let [showComments, setShowComments] = useState(false)
  let [SideMenu, setSideMenu] = useState(false)

  const mobileProfilePanelClasses = SideMenu
    ? 'translate-x-0 opacity-100 pointer-events-auto'
    : 'translate-x-full opacity-0 pointer-events-none'

  useEffect(() => {
    getPosts();
    console.log(Post);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [  ]);

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
  if (Loading) {
    return <LoadingPage />
  }

  return (
    <>
      <div className='md:hidden size-10 self-start mt-5 shadow-lg bg-white rounded-full flex items-center justify-center'>
        <RiMenuFold2Line className='text-black text-2xl cursor-pointer' onClick={() => setSideMenu(!SideMenu)} />
      </div>

      {SideMenu && (
        <div
          role="presentation"
          onClick={() => setSideMenu(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      <main className="w-full min-h-screen bg-linear-to-br py-8 px-4 flex justify-between items-start gap-4">

        <section
          className={`self-start transition-all duration-500 ease-out transform fixed inset-y-[20%] right-10 z-50 w-[90%] max-w-sm  shadow-2xl p-5 rounded-l-3xl md:rounded-none md:static md:bg-transparent md:shadow-none md:p-0 md:w-fit md:block xl:sticky xl:top-8 ${mobileProfilePanelClasses} md:translate-x-0 md:opacity-100 md:pointer-events-auto`}
        >
          {SideMenu && (
            <button
              type="button"
              aria-label="Close profile"
              onClick={() => setSideMenu(false)}
              className="md:hidden absolute top-4 right-4 w-9 h-9 rounded-full bg-[#282828] text-white flex items-center justify-center shadow-lg"
            >
              ✕
            </button>
          )}
          <UserProfile />
        </section>


        <div className="max-w-2xl  mx-auto space-y-6 md:w-1/2 xl:w-full  w-full  ">
          {Post?.map((post, index) => (
            <article
              key={index}
              className="bg-[#282828] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border "
            >
              <header className="p-4 flex items-center  gap-3 ">
                <img
                  src={post.user?.photo || 'https://linked-posts.routemisr.com/uploads/default-profile.png'}
                  alt={post.user?.name}
                  className="w-12 h-12 rounded-full object-cover ring-6 ring-[#1A1A1A]"
                />
                <div className="flex-1  ">
                  <h2 className="font-semibold text-white">{post.user?.name || 'Anonymous'}</h2>
                  <time className="text-xs text-[#FFFD02]">{formatDate(post.createdAt)}</time>
                </div>
              </header>

              <div className="p-4">
                {post.body && (
                  <p className="text-white leading-relaxed mb-4 whitespace-pre-wrap">
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

          {!Post || Post.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts yet. Be the first to share something!</p>
            </div>
          )}
        </div>




      </main>
    </>
  )
}
