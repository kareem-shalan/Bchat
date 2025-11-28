import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../Context/UserContext.jsx'
import bgProfile from '../../../public/bg-profile.png'

import ButtonView from '../ButtonView/ButtonView.jsx'

export default function UserProfile() {
  let { UserLoggedIn, getUserLoggedIn } = useContext(UserContext)
  useEffect(() => {
    getUserLoggedIn()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ UserLoggedIn ])


  return (
    <>
      <section className='md:hidden relative overflow-hidden rounded-2xl bg-[#282828] text-white px-6 py-8 shadow-2xl mb-6'>
        <div className='absolute top-0 left-0 w-full h-full z-0 opacity-30'>
          <img src={bgProfile} alt="Profile background" className='w-full h-full object-cover' />
        </div>
        <div className='relative flex flex-col items-center text-center gap-4'>
          <div className='w-24 h-24 ring-4 ring-[#1A1A1A] rounded-2xl overflow-hidden'>
            <img src={UserLoggedIn?.photo} alt={UserLoggedIn?.name} className='w-full h-full object-cover' />
          </div>
          <h2 className='text-2xl font-bold'>{UserLoggedIn?.name}</h2>
          <p className='text-sm text-white/70'>{UserLoggedIn?.email}</p>
          <article className='bg-white/10 rounded-xl px-4 py-3 text-sm leading-relaxed'>
            <p>
              ✨ Hello I'm
              <span className='text-blue-400 mx-1 font-semibold'>
                {UserLoggedIn?.name}
              </span>
              Full Stack Developer ✨
            </p>
          </article>
          <div className='w-full'>
            <ButtonView text='View Profile' link='/profile' />
          </div>
        </div>
      </section>

      <main className='hidden md:flex w-[25%] justify-start items-center'>


        <section className='rounded-2xl   min-w-[373px] min-h-[388px] relative bg-linear-to-l from-black to-white/10 flex flex-col items-center justify-center'>
          <div className='absolute top-0 left-0 w-full h-full z-0'>
            <img src={bgProfile} alt="" />
          </div>
          <div
            className='self-stretch rounded-2xl translate-y-[50%]  min-w-[375px] min-h-[322px] bg-[#282828] z-10 '
          >

            <div className='w-[135px] ring-8 ring-[#1A1A1A] h-[135px] rounded-xl absolute top-[-20%] left-[50%] translate-x-[-50%] overflow-hidden ' >
              <img src={UserLoggedIn?.photo} alt={UserLoggedIn?.name} className='w-full h-full object-cover ' />
            </div>

            {/* user name and email */}

            <div className='text-center relative top-[100px]'>
              <h2 className='text-2xl font-bold text-white'>{UserLoggedIn?.name}</h2>
              <p className='text-sm text-white/50'>{UserLoggedIn?.email}</p>


              <article className='relative mt-3 flex flex-col items-center justify-end  rounded-2xl'>
                <h3 className='text-white text-xl font-bold text-center'  >
                  ✨  Hello I'm
                  <span className='text-blue-500 mx-2 text-xl font-bold'>
                    {UserLoggedIn?.name}

                  </span>
                  Full Stack Developer ✨
                </h3>

              </article>



<div className='mt-4'>
  <ButtonView text='View Profile' link='/profile' />
</div>

            </div>






          </div>



        </section>




      </main>


    </>
  )
}
