import { useForm } from "react-hook-form";
import Input from "../Input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaSpinner } from "react-icons/fa";


export default function CommentForm({ postId }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      content: '',
      post: postId
    }
  });

  function CallApiSubmitComment(values) {
    return axios.post(`https://linked-posts.routemisr.com/comments`, values, {
      headers: {
        token: localStorage.getItem('UserToken')
      },
    })
  }

  const { mutate: submitComment, isPending} = useMutation({
    mutationFn: CallApiSubmitComment,
    onSuccess: (res) => {
      toast.success(res.data.message);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      reset();
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || 'Failed to submit comment');
    }
  });

  function handleSubmitForm(values) {
    submitComment(values);
  }




  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="flex w-full md:w-1/2 justify-end"
    >
      <div className="relative w-full">
        <Input
          TypeInput="text"
          optionsHookForm={register('content', { required: true })}
          className="pr-28 bg-white/5 focus:bg-white/15 placeholder:text-white/70 backdrop-blur-sm"
          placeholder="Add a comment"
        />
        <button
          type="submit"
          disabled={isPending}
          className="absolute cursor-pointer top-1/2 -translate-y-1/2 right-1 px-4 py-1.5 rounded-full bg-blue-500 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-400 transition"
        > 
          {isPending ? <FaSpinner className="animate-spin text-white" /> : 'Send'} 
        </button>
      </div>
    </form>
  );
}