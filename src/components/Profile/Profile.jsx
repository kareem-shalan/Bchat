import React, { useState } from 'react'
import UserProfileHook from '../../Hooks/UserProfileHook.jsx'
import EditeButton from '../EditeButton/EditeButton.jsx'
import LoadingButtons from '../LoadingButtons/LoadingButtons.jsx'
import { Link } from 'react-router-dom'
import ratioProfile from '../../../public/ratioProfile.png'
import Input from '../Input/Input.jsx'
import UserPosts from './../UserPosts/UserPosts';
export default function Profile() {
  let { data, isLoading, error } = UserProfileHook()
  const [ShowEditeInputs, setShowEditeInputs] = useState(false)
  const [ShowPosts, setShowPosts] = useState(false)

  if (isLoading) {
    return <div className='flex items-center justify-center '> <LoadingButtons /></div>
  }

  if (error) {
    return <div className='text-red-500 flex items-center justify-center h-screen'>{error.message}</div>
  }

  
  return (
    <>
    <main className='flex items-center justify-between w-full h-[80vh] md:h-full gap-4 mb-10 flex-col md:flex-row'>


      <div className='w-1/2  flex items-center justify-center'>


        <div className='flex flex-col items-center justify-center'>

          <div className='size-[300px] flex rounded-full overflow-hidden ring-4 ring-[#39466da2] shadow-lg shadow-black/50'>
            <img src={data?.photo} alt={data?.name} />
          </div >
          <h2 className='text-3xl text-white/40 font-bold text-center my-4'>{data?.name}</h2>
          <p className='text-xl bg-white/10 rounded-xl px-4 py-3 text-white/70 text-center mb-2'>{data?.email}</p>
          <article className='bg-white/10 rounded-xl px-4 py-3 text-white/70 text-center leading-relaxed'>
            <p>
              ✨ Hello I'm
              <span className='text-blue-400 mx-1 font-semibold'>
                {data?.name}
              </span>
              Full Stack Developer ✨
            </p>
          </article>


          <div
            onClick={() => setShowEditeInputs(!ShowEditeInputs)} className='mt-6'>
            <EditeButton text='Edit Profile' />
          </div>
        </div>


      </div>

      {/* profile nav */}

      <div className='w-1/2  '>


        <div className='flex items-center justify-between flex-col underline'>


          <div className='w-full'>
            <ul className='w-full  flex items-center justify-between 
  text-amber-500 font-bold text-2xl gap-4 mb-2 '>
              <Link to='/home'>

                <p>Home</p>
              </Link>
              <Link to='/'>

                <p>Posts</p>
              </Link>



            </ul>
          </div>
          {/* profile ratio */}
          <div>
            <img src={ratioProfile} alt="ratioProfile" className='w-full h-full object-cover ' />
          </div>

          {/* INPUTS EDITEING */}


          <div className={`transition-all duration-300 ease-in-out w-full flex flex-col gap-2 mt-10 ${ShowEditeInputs ? 'opacity-100' : 'opacity-0'}`}>
            <Input
              type='text'
              placeholder='Name'
              value={data?.name}

            />

            <Input
              type='email'
              placeholder='Email'
              value={data?.email}
            />

            <Input
              type='password'
              placeholder='**********'
              value={data?.password}
            />
          </div>


        </div>


      </div>









    </main>



    {/* Posts User Heard */}

<div

onClick={() => setShowPosts(!ShowPosts)}

className=' w-full h-full text-center bg-white/10 rounded-xl p-4 cursor-pointer'>
    <p className={` w-full h-full transition-all duration-300 ease-in-out ${ShowPosts ? 'text-yellow-300' : 'text-white'}`}> Posts</p>


</div>

{/*    Posts User Body */}
  <div className={` transition-all duration-300 ease-in-out mt-4 ${ShowPosts ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
  <UserPosts/>
  </div>

    </>


  )
}
