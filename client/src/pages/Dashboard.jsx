import React, { useEffect, useState } from 'react'
import { Gem, Sparkles } from 'lucide-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import CreationItem from '../components/CreationItem'
import axios from 'axios'
import toast from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

const Dashboard = () => {
  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` },
      })
      data.success ? setCreations(data.creations) : toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-6 bg-neutral-900 text-white flex flex-col items-center overflow-y-auto">
      <div className="flex flex-wrap gap-4 mb-8 max-w-screen-lg w-full">
        {/* Total Creations */}
        <div className="flex justify-between items-center flex-1 min-w-[260px] p-4 px-6 bg-white/10 border border-neutral-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-400">Total Creations</p>
            <h2 className="text-xl font-semibold">{creations.length}</h2>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#3588F2] to-[#0BB0D7] text-white rounded-lg flex items-center justify-center">
            <Sparkles className="w-5" />
          </div>
        </div>

        {/* Plan */}
        <div className="flex justify-between items-center flex-1 min-w-[260px] p-4 px-6 bg-white/10 border border-neutral-700 rounded-xl">
          <div>
            <p className="text-sm text-gray-400">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="premium" fallback="Free">Premium</Protect>
            </h2>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-[#FF61C5] to-[#9E53EE] text-white rounded-lg flex items-center justify-center">
            <Gem className="w-5" />
          </div>
        </div>
      </div>

      <div className="max-w-screen-lg w-full space-y-4">
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-purple-500 border-t-transparent"></div>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-200 mb-2">Recent Creations</h3>
            {creations.map((item) => <CreationItem key={item.id} item={item} />)}
          </>
        )}
      </div>
    </div>
  )
}

export default Dashboard
