import { useAuth } from '@clerk/clerk-react'
import { Hash, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const BlogTitles = () => {
  const blogCategories = ['General', 'Technology', 'Business', 'Health', 'Lifestyle', 'Education', 'Travel', 'Food']

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`
      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      data.success ? setContent(data.content) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  return (
    <div className="flex-1 w-full p-6 bg-neutral-900 text-white flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-screen-lg flex flex-col lg:flex-row gap-6">
        {/* Input Form */}
        <form onSubmit={onSubmitHandler} className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-emerald-400">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-semibold">AI Blog Title Generator</h2>
          </div>

          <div>
            <label className="text-sm">Keyword</label>
            <input
              type="text"
              className="w-full mt-1 p-2 rounded-md bg-black/40 border border-gray-700 placeholder-gray-400 text-white"
              placeholder="e.g. The future of artificial intelligence..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm">Category</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {blogCategories.map((cat) => (
                <span
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1 rounded-full text-xs cursor-pointer border transition ${
                    selectedCategory === cat
                      ? 'bg-emerald-500 text-black font-semibold'
                      : 'text-gray-400 border-gray-600 hover:bg-gray-800'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold py-2 rounded-md hover:brightness-110 transition"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
              : <Hash className="w-4 h-4" />
            }
            Generate Title
          </button>
        </form>

        {/* Output Section */}
        <div className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 min-h-[300px]">
          <div className="flex items-center gap-2 text-emerald-400 mb-3">
            <Hash className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Generated Titles</h2>
          </div>

          {!content ? (
            <div className="flex flex-col items-center justify-center text-gray-500 h-full gap-2">
              <Hash className="w-8 h-8" />
              <p className="text-sm text-center">Enter a topic and click “Generate Title” to begin</p>
            </div>
          ) : (
            <div className="reset-tw text-sm leading-relaxed text-gray-300 mt-2">
              <Markdown>{content}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BlogTitles
