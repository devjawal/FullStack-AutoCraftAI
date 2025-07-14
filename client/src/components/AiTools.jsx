import React from 'react'
import { AiToolsData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AiTools = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 bg-neutral-900 text-white relative">
      

      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold text-white">Powerful <span className="text-[#00FFA3]">AI Tools</span></h2>
        <p className="text-gray-400 max-w-lg mx-auto mt-2">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.
        </p>
      </div>

      <div className="flex flex-wrap mt-12 justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-8 m-4 max-w-xs rounded-xl bg-neutral-800 hover:bg-neutral-700 shadow-md border border-neutral-700 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon
              className="w-12 h-12 p-3 text-white rounded-xl mb-4"
              style={{ background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})` }}
            />
            <h3 className="mb-2 text-lg font-semibold text-white">{tool.title}</h3>
            <p className="text-gray-400 text-sm">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AiTools
