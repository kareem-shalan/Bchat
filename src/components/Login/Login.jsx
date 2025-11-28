import React, { useContext, useEffect, useState } from 'react'
import Slider from "react-slick";
import { useForm } from 'react-hook-form'
import ResgisterImg from '../../../public/iconRegister.png'
import ImgForm from '../../../public/bg-registerImag-.png'
import ImgForm2 from '../../../public/bg-registerImag2-.png'
import ImgForm3 from '../../../public/bg-registerImag3-.png'
import ImgForm4 from '../../../public/bg-registerImag4-.png'
import Input from '../Input/Input.jsx'
import { Link, useNavigate } from 'react-router-dom';
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import ErrorMassage from '../ErrorMassage/ErrorMassage.jsx'
import axios from 'axios'
import LoadingButtons from '../LoadingButtons/LoadingButtons.jsx'
import { UserContext } from '../../Context/UserContext.jsx'




const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  initialSlide: 0,
  autoplay: true,
  autoplaySpeed: 2000,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
export default function Login() {
  const { setToken } = useContext(UserContext);


  const [ErrorResponse, setErrorResponse] = useState(null)
  const [Loading, setLoading] = useState(false)

  const schema = z.object(
    {

      email: z
        .email({ message: 'Invalid email address' })
        .min(1, { message: 'Email is required' }),
      password: z
        .string()
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character' })
        .min(8, { message: 'Password must be at least 8 characters' }),

    }
  )
  const navigate = useNavigate();

  let Form = useForm({
    defaultValues: {

      email: '',
      password: '',


    },
    resolver: zodResolver(schema)

  });
  function handelOnSubmit(values) {

    setLoading(true)
    axios.post(`https://linked-posts.routemisr.com/users/signin`, values)
      .then((data) => {
        setLoading(false)
        console.log(data.data.message === 'success');
        if (data.data.message === 'success') {
          navigate('/home');
          localStorage.setItem('UserToken', data.data.token);
          setToken(data.data.token);

        }


      })
      .catch((err) => {
        console.log(err.response.data.error);
        if (err.response.data.error) {
          setErrorResponse(err.response.data.error)
        }
        setLoading(false)
      })
    console.log(values);

  }



  const { register, handleSubmit, formState } = Form;


  useEffect(() => {
    if (ErrorResponse !== null) {
      const timer = setTimeout(() => {
        setErrorResponse(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [ErrorResponse]);


  return (
    <>

      <form


        onSubmit={handleSubmit(handelOnSubmit)}
        className='flex flex-row justify-between text-white bg-black rounded-lg items-stretch w-full max-w-[1440px] h-[600px] mx-auto md:m-0 overflow-hidden' >
        {/* form */}
        <section className='w-[70%] relative bg-linear-to-bl from-[#000000] to-[#666666] rounded-l-lg p-4 overflow-y-auto '>





          {ErrorResponse && (
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-black/70 w-full h-full flex items-center justify-center mx-auto">
              <ErrorMassage message={ErrorResponse} />
            </div>
          )}









          {/* text header + ICON  */}
          <div className='flex items-center gap-2 mb-4'>
            <span className='bg-white rounded-full p-2 flex items-center justify-center'>
              <img src={ResgisterImg} alt="" className='w-5 h-5' />
            </span>
            <h3 className=' 
            animate-pulse transition-all duration-300

            bg-linear-to-l text-transparent bg-clip-text from-[#FFFD02] to-[#999801] text-xl font-bold'>Bchat</h3>
          </div>
          <h1 className='text-xl font-bold text-center mb-4'>Welcome Back</h1>

          {/* inputs */}

          <div className='flex flex-col gap-3 mt-20'>
            <Input
              className='w-full'
              TypeInput='text'
              placeholder='Email' optionsHookForm={register('email')} />
            {formState.errors.email && formState.touchedFields.email && <ErrorMassage message={formState.errors.email.message} />}
            <Input
              className='w-full'
              TypeInput='password' placeholder='Password' optionsHookForm={register('password')} />
            {formState.errors.password && formState.touchedFields.password && <ErrorMassage message={formState.errors.password.message} />}



            <div className='w-full text-end md:whitespace-nowrap '>
              <Link className='text-blue-500 text-sm underline' onClick={() => navigate('/register')}>Don't have an account? Register</Link>
            </div>

          </div>
          {/* buttons */}
          <div className='flex justify-center items-center mt-4'>
            <button className='cursor-pointer text-white p-3 rounded-md w-full bg-[#000000] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2' type='submit'>
              {Loading ? <LoadingButtons /> : 'Login'}

            </button>
          </div>

          <p className='text-center text-sm mt-25'> Copyright 2025 <Link to='https://www.linkedin.com/in/kareem-shalan/' target='_blank' className='text-blue-500'>Kareem-shalan</Link>. All rights reserved.</p>
        </section>

        {/* image */}
        <section className="w-1/2 rounded-r-lg overflow-hidden">

          <Slider {...settings}>

            <div className="h-[700px]">
              <img src={ImgForm} alt="Slide 1" className="w-full h-full object-cover xl:object-fill" />
            </div>
            <div className="h-[700px]">
              <img src={ImgForm2} alt="Slide 2" className="w-full h-full object-cover xl:object-fill" />
            </div>
            <div className="h-[700px]">
              <img src={ImgForm3} alt="Slide 3" className="w-full h-full object-fill" />
            </div>
            <div className="h-[700px] ">
              <img src={ImgForm4} alt="Slide 4" className="w-full h-full object-fill " />
            </div>

          </Slider>





        </section>




      </form>





    </>
  )
}
