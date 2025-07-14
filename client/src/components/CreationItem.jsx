import React, { useState } from 'react'
import Markdown from 'react-markdown'

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-5 w-full bg-white/10 border border-neutral-700 text-gray-200 rounded-xl cursor-pointer transition hover:border-cyan-400"
    >
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <h2 className="text-base font-semibold">{item.prompt}</h2>
          <p className="text-xs text-gray-400">
            {item.type} • {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <span className="bg-gradient-to-r from-cyan-500 to-emerald-400 text-black font-semibold text-xs px-3 py-1 rounded-full shadow">
          {item.type}
        </span>
      </div>

      {/* Content */}
      {expanded && (
        <div className="mt-4">
          {item.type === 'image' ? (
            <img
              src={item.content}
              alt="generated"
              className="w-full max-w-md rounded-lg border border-neutral-700"
            />
          ) : (
            <div className="mt-2 text-sm text-gray-200 max-h-96 overflow-y-auto prose prose-invert prose-sm">
              <Markdown>{item.content}</Markdown>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CreationItem
