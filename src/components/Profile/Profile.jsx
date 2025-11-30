import React, { useState } from 'react'
import UserProfileHook from '../../Hooks/UserProfileHook.jsx'
import EditeButton from '../EditeButton/EditeButton.jsx'
import LoadingButtons from '../LoadingButtons/LoadingButtons.jsx'
import { Link, NavLink } from 'react-router-dom'
import ratioProfile from '../../../public/ratioProfile.png'
import Input from '../Input/Input.jsx'
import UserPosts from './../UserPosts/UserPosts';
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import z from 'zod'
import axios from 'axios'
import toast from 'react-hot-toast'
import { FaSpinner } from 'react-icons/fa'
import { zodResolver } from '@hookform/resolvers/zod'
import UpdateCover from './../UpdateCover/UpdateCover';
export default function Profile() {
  let { data, isLoading, error } = UserProfileHook()
  const [ShowEditeInputs, setShowEditeInputs] = useState(false)
  const [ShowPosts, setShowPosts] = useState(false)


  const updatePssSchema = z.object(
    {
      "password": z.string().min(8, { message: 'Password must be at least 8 characters' }),
      "newPassword": z.string().min(8, { message: 'New Password must be at least 8 characters' }),
    }

  )

  let { register, handleSubmit, formState } = useForm(
    {
      defaultValues: {
        "password": "",
        "newPassword": ""
      },
      resolver: zodResolver(updatePssSchema)
    }
  )
  function CallApiUpdatePss(values) {
    return axios.patch(`https://linked-posts.routemisr.com/users/change-password
`, values, {
      headers: {
        token: localStorage.getItem('UserToken')
      }
    })
  }

  const { mutate: CallApi, isPending } = useMutation(

    {
      mutationFn: CallApiUpdatePss,
      onSuccess: (res) => {
        toast.success(res.data.message);
      },
      onError: (err) => {
        toast.error(err.response?.data?.error || 'Failed to update password');
        console.log(err.response?.data?.error);
      }
    }
  )


  function handleSubmitUpdatePss(values) {
    CallApi(values);
  }




  if (isLoading) {
    return <div className='flex items-center justify-center '> <LoadingButtons /></div>
  }

  if (error) {
    return <div className='text-red-500 flex items-center justify-center h-screen'>{error.message}</div>
  }


  return (
    <>
      <main className='flex items-center justify-between w-full  md:h-full gap-4 mb-4 flex-col md:flex-row py-4 '>


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

        <div className='w-full   '>


          <div className='flex items-center justify-between flex-col '>


            <div className='w-full   '>
              <ul className='w-[80%]  flex items-center justify-between 
  text-amber-500 font-bold text-xl gap-2 mb-2 mx-auto'>
                <NavLink to='/home' className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-300'
                    : 'text-white'
                }>

                  <p>Home</p>
                </NavLink>
                <NavLink to='/' className={({ isActive }) =>
                  isActive
                    ? 'text-yellow-300'
                    : 'text-white'
                }>

                  <p>Posts</p>
                </NavLink>



              </ul>
            </div>
            {/* profile ratio */}
            <div className='w-full h-full'>
              <img src={ratioProfile} alt="ratioProfile" className='w-full h-full object-cover ' />
            </div>

            {/* INPUTS EDITEING */}


            <form
              onSubmit={handleSubmit(handleSubmitUpdatePss)}
              className={`p-4 md:p-0 transition-all items-center justify-center md:justify-start md:items-start duration-300 ease-in-out w-full flex flex-col gap-2 mt-10 ${ShowEditeInputs ? 'opacity-100' : 'opacity-0'}`}>
              <h3 className='text-white/70 text-xl font-bold'>Update Password</h3>
              <Input
                optionsHookForm={register('password', { required: true })}
                type='password'
                placeholder='Old Password'

              />
              {formState.errors.password && <p className='text-red-500'>{formState.errors.password.message}</p>}
              <Input
                optionsHookForm={register('newPassword', { required: true })}
                type='password'
                placeholder='New Password'
              />
              {formState.errors.newPassword && <p className='text-red-500'>{formState.errors.newPassword.message}</p>}
              <button type='submit' disabled={isPending} className='cursor-pointer text-white p-3 rounded-md w-full bg-[#000000] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2'>{isPending ? <FaSpinner className="animate-spin text-white" /> : 'Update Password'}</button>

            </form>
            {/* Update Cover Image */}
            <div

              className={`w-full h-full p-4 md:p-0 ${ShowEditeInputs ? 'block' : 'hidden'}`}>
              <UpdateCover />
            </div>

          </div>

          <div

            onClick={() => setShowPosts(!ShowPosts)}

            className=' w-[90%] mx-auto  md:w-full h-full text-center bg-white/10 rounded-xl p-4  cursor-pointer'>
            <p className={` w-full h-full transition-all duration-300 ease-in-out ${ShowPosts ? 'text-yellow-300' : 'text-white '}`}> Posts</p>


          </div>
        </div>


      </main>



      {/* Posts User Heard */}



      {/*    Posts User Body */}
      <div className={` flex items-center justify-start w-full  transition-all  duration-300 ease-in-out mt-4 ${ShowPosts ? 'hidden' : ' block '}`}>
        <UserPosts />
      </div>

    </>


  )
}
