import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaSpinner, FaImage, FaTimes } from 'react-icons/fa';
import UserProfileHook from '../../Hooks/UserProfileHook.jsx';

export default function CreatePost() {
  const queryClient = useQueryClient();
  const { data: userData } = UserProfileHook();
  const [imagePreview, setImagePreview] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
    defaultValues: {
      body: '',
      image: null
    }
  });

  const imageFile = watch('image');

  // Handle image preview
  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(imageFile[0]);
    } else {
      setImagePreview(null);
    }
  }, [imageFile]);

  function createPost(values) {
    const formData = new FormData();
    formData.append('body', values.body);
    if (values.image && values.image[0]) {
      formData.append('image', values.image[0]);
    }

    return axios.post('https://linked-posts.routemisr.com/posts', formData, {
      headers: {
        token: localStorage.getItem('UserToken'),
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  const { mutate: submitPost, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      toast.success(res.data.message || 'Post created successfully!');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      reset();
      setImagePreview(null);
      setIsExpanded(false);
    },
    onError: (err) => {
      toast.error(err.response?.data?.error || 'Failed to create post');
    }
  });

  function handleFormSubmit(values) {
    if (!values.body?.trim() && !values.image?.[0]) {
      toast.error('Please add some content or an image');
      return;
    }
    submitPost(values);
  }

  function handleRemoveImage() {
    reset({ body: watch('body'), image: null });
    setImagePreview(null);
  }

  return (
    <article className="bg-[#282828] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-white/10">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <header className="p-4 flex items-center gap-3 border-b border-white/10">
          <img
            src={userData?.photo || 'https://linked-posts.routemisr.com/uploads/default-profile.png'}
            alt={userData?.name || 'User'}
            className="w-12 h-12 rounded-full object-cover ring-4 ring-[#1A1A1A]"
          />
          <div className="flex-1">
            <h2 className="font-semibold text-white">{userData?.name || 'Anonymous'}</h2>
            <p className="text-xs text-white/60">What's on your mind?</p>
          </div>
        </header>

        <div className="p-4 space-y-4">
          <div className="relative">
            <textarea
              {...register('body', {
                maxLength: {
                  value: 1000,
                  message: 'Post must be less than 1000 characters'
                }
              })}
              onFocus={() => setIsExpanded(true)}
              placeholder="Share your thoughts..."
              rows={isExpanded ? 4 : 2}
              className="w-full bg-white/5 text-white placeholder:text-white/50 rounded-xl px-4 py-3 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
            />
            {errors.body && (
              <p className="text-red-400 text-xs mt-1">{errors.body.message}</p>
            )}
          </div>

          {imagePreview && (
            <div className="relative group">
              <div className="relative rounded-xl overflow-hidden border-2 border-white/20">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full max-h-96 object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full p-2 transition-all shadow-lg"
                  aria-label="Remove image"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <label className="flex items-center gap-2 cursor-pointer text-white/70 hover:text-white transition-colors">
              <input
                {...register('image')}
                type="file"
                accept="image/*"
                className="hidden"
              />
              <FaImage className="w-5 h-5" />
              <span className="text-sm font-medium">Add Photo</span>
            </label>

            <div className="flex items-center gap-3">
              {isExpanded && (
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    reset();
                    setImagePreview(null);
                  }}
                  className="px-4 py-2 text-white/70 hover:text-white transition-colors text-sm font-medium"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                disabled={isPending || (!watch('body')?.trim() && !imageFile?.[0])}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
              >
                {isPending ? (
                  <>
                    <FaSpinner className="animate-spin" />
                    <span>Posting...</span>
                  </>
                ) : (
                  'Post'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </article>
  );
}
