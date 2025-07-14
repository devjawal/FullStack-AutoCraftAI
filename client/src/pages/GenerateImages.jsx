import React, { useState } from 'react'
import { ImagePlus, Sparkles } from 'lucide-react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const GenerateImages = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post('/api/ai/generate-image', { prompt: input }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
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
        {/* Left: Form */}
        <form onSubmit={onSubmitHandler} className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#00FFA3]">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-semibold">AI Image Generator</h2>
          </div>

          <div>
            <label className="text-sm">Image Prompt</label>
            <textarea
              className="w-full mt-1 p-3 min-h-[100px] rounded-md bg-black/40 border border-gray-700 placeholder-gray-400 text-white resize-none"
              placeholder="e.g. futuristic cityscape at night with neon lights"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-400 to-[#00FFA3] text-black font-semibold py-2 rounded-md hover:brightness-110 transition"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
              : <ImagePlus className="w-4 h-4" />
            }
            Generate Image
          </button>
        </form>

        {/* Right: Output */}
        <div className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 min-h-[300px] flex items-center justify-center">
          {!content ? (
            <div className="text-center text-gray-500">
              <ImagePlus className="w-10 h-10 mx-auto mb-2" />
              <p className="text-sm">Enter a prompt and click “Generate Image” to begin</p>
            </div>
          ) : (
            <img src={content} alt="Generated" className="max-w-full max-h-[400px] rounded-lg shadow-lg" />
          )}
        </div>
      </div>
    </div>
  )
}

export default GenerateImages
