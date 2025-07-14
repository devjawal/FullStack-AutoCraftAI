import { Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (object.split(' ').length > 1) return toast.error('Enter only one object name');

      const formData = new FormData();
      formData.append('image', input);
      formData.append('object', object);

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      data.success ? setContent(data.content) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-wrap items-start justify-center gap-6 p-6 text-white bg-neutral-950 min-h-[calc(100vh-64px)]">
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg bg-neutral-900 border border-neutral-800 p-6 rounded-xl"
      >
        <div className="flex items-center gap-2 text-[#00FFA3] mb-4">
          <Sparkles className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Object Removal</h2>
        </div>

        <label className="text-sm">Upload Image</label>
        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full mt-2 mb-4 p-2 rounded-md bg-black/40 border border-gray-700 placeholder-gray-400 text-white"
          required
        />

        <label className="text-sm">Object Name</label>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={2}
          className="w-full mt-2 p-2 rounded-md bg-black/40 border border-gray-700 text-white text-sm"
          placeholder="e.g., watch"
          required
        />

        <button
          disabled={loading}
          className="w-full mt-4 flex justify-center items-center gap-2 bg-gradient-to-r from-[#00FFA3] to-[#00FFA3] text-black font-semibold py-2 rounded-md hover:brightness-110 transition"
        >
          {loading ? (
            <span className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
          ) : (
            <>
              <Scissors className="w-4 h-4" />
              Remove Object
            </>
          )}
        </button>
      </form>

      {/* Right Column */}
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 p-6 rounded-xl min-h-96 flex items-center justify-center">
        {!content ? (
          <div className="text-gray-500 text-center flex flex-col items-center gap-3">
            <Scissors className="w-8 h-8" />
            <p>Upload an image and enter object name to remove</p>
          </div>
        ) : (
          <img src={content} alt="output" className="w-full rounded-md" />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
