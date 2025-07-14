import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get('/api/user/get-published-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post('/api/user/toggle-like-creation', { id }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        toast.success(data.message)
        await fetchCreations()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6 bg-neutral-950 text-white">
      <h1 className="text-2xl font-bold text-[#00FFD1] mb-4">Community Creations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {creations.map((creation, index) => (
          <div key={index} className="relative group overflow-hidden rounded-lg border border-gray-800 bg-gradient-to-br from-[#111827] via-[#1f2937] to-[#111827] shadow-lg hover:shadow-xl transition">
            <img src={creation.content} alt="" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-black/80 to-transparent p-4 group-hover:justify-between text-white transition-all">
              <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer transition ${creation.likes.includes(user.id) ? 'fill-red-500 text-red-600' : 'text-white'}`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-full bg-neutral-950">
      <span className="w-10 h-10 border-4 border-t-transparent border-cyan-400 rounded-full animate-spin"></span>
    </div>
  )
}

export default Community
