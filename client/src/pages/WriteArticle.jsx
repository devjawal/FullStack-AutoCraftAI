import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: 'Short (500–800 words)' },
    { length: 1200, text: 'Medium (800–1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post(
        '/api/ai/generate-article',
        { prompt, length: selectedLength.length },
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      data.success ? setContent(data.content) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-6 bg-neutral-900 text-white flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-screen-lg flex flex-col lg:flex-row gap-6">
        {/* Left: Form */}
        <form onSubmit={onSubmitHandler} className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#00FFA3]">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-semibold">AI Article Writer</h2>
          </div>

          <div>
            <label className="text-sm">Topic</label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full mt-1 p-2 rounded-md bg-black/40 border border-gray-700 placeholder-gray-400 text-white"
              placeholder="e.g. The future of artificial intelligence..."
              required
            />
          </div>

          <div>
            <label className="text-sm">Length</label>
            <div className="flex flex-wrap gap-2 mt-2">
              {articleLength.map((item, idx) => (
                <span
                  key={idx}
                  onClick={() => setSelectedLength(item)}
                  className={`px-4 py-1 rounded-full text-xs cursor-pointer border transition ${
                    selectedLength.text === item.text
                      ? 'bg-[#00FFA3] text-black font-semibold'
                      : 'text-gray-400 border-gray-600 hover:bg-gray-800'
                  }`}
                >
                  {item.text}
                </span>
              ))}
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-semibold py-2 rounded-md hover:brightness-110 transition"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin" />
            ) : (
              <Edit className="w-4 h-4" />
            )}
            Generate Article
          </button>
        </form>

        {/* Right: Output */}
        <div className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 min-h-[300px] max-h-[600px] overflow-y-auto">
          <div className="flex items-center gap-2 text-[#00FFA3] mb-3">
            <Edit className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Generated Article</h2>
          </div>

          {!content ? (
            <div className="flex flex-col items-center justify-center text-gray-500 h-full gap-2">
              <Edit className="w-8 h-8" />
              <p className="text-sm text-center">Enter a topic and click “Generate Article” to begin</p>
            </div>
          ) : (
            <div className="reset-tw text-sm leading-relaxed text-gray-300 mt-2">
              <Markdown>{content}</Markdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
