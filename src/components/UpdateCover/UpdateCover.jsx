import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import Input from '../Input/Input.jsx'
import { FaSpinner } from 'react-icons/fa'
import UserProfileHook from '../../Hooks/UserProfileHook.jsx'
import toast from 'react-hot-toast'

export default function UpdateCover() {
  const queryClient = useQueryClient();

  


  function CallApiUpdateCover(values) {

    let formData = new FormData();
    formData.append('photo', values.photo[0]);

    console.log(formData , 'formData');
    axios.put(`https://linked-posts.routemisr.com/users/upload-photo`, formData, {
      headers: {
        token: localStorage.getItem('UserToken')
      }
    })

  }

  const { register, handleSubmit, formState } = useForm(
    {
      defaultValues: { 
        photo: "" 
      }
      
    }
  )





  const { mutate: CallApi, isPending } = useMutation(
    {
      mutationFn: CallApiUpdateCover,
    
    }

  )

  function SubmitUpdateCover(values) {
    CallApi(values);
    queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    toast.success('Cover updated successfully')
   
  }

  return (
    <form 
    onSubmit={handleSubmit(SubmitUpdateCover)}
    
    className='transition-all items-center justify-center md:justify-start md:items-start duration-300 ease-in-out w-full flex flex-col gap-2 mt-10 mb-10'>
      <h3 className='text-white/70 text-xl font-bold'>Update Cover</h3>


      <Input type='file'


        optionsHookForm={register('photo')} />
      <button type='submit' disabled={isPending} className='cursor-pointer text-white p-3 rounded-md w-full bg-[#000000] hover:bg-[#333333] transition-colors flex items-center justify-center gap-2'>{isPending ? <FaSpinner className="animate-spin text-white" /> : 'Update Cover'}</button>
    
    {
      formState.errors.photo && <p className='text-red-500'>{formState.errors.photo.message}</p>
    }

    </form>
  )
}
