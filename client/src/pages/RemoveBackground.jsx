import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const RemoveBackground = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const formData = new FormData()
      formData.append('image', input)

      const { data } = await axios.post('/api/ai/remove-image-background', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })

      data.success ? setContent(data.content) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-6 bg-neutral-900 text-white flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-screen-lg flex flex-col lg:flex-row gap-6">
        {/* Left Form Section */}
        <form onSubmit={onSubmitHandler} className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#FF4938]">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Background Removal</h2>
          </div>

          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="image/*"
            className="w-full p-2 rounded-md bg-black/40 border border-gray-700 text-white text-sm"
            required
          />
          <p className="text-xs text-gray-400">Supports JPG, PNG and other image formats</p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white font-semibold py-2 rounded-md hover:brightness-110 transition"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
            ) : (
              <Eraser className="w-4 h-4" />
            )}
            Remove Background
          </button>
        </form>

        {/* Right Output Section */}
        <div className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 min-h-[300px]">
          <div className="flex items-center gap-2 text-[#FF4938] mb-3">
            <Eraser className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Processed Image</h2>
          </div>

          {!content ? (
            <div className="flex flex-col items-center justify-center text-gray-500 h-full gap-2">
              <Eraser className="w-8 h-8" />
              <p className="text-sm text-center">Upload an image and click “Remove Background” to begin</p>
            </div>
          ) : (
            <img src={content} alt="result" className="mt-3 w-full h-auto rounded" />
          )}
        </div>
      </div>
    </div>
  )
}

export default RemoveBackground
