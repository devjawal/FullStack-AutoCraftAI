import { FileText, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const ReviewResume = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('resume', input);

      const { data } = await axios.post('/api/ai/resume-review', formData, {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });

      data.success ? setContent(data.content) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full p-6 bg-neutral-900 text-white flex flex-col items-center overflow-y-auto">
      <div className="w-full max-w-screen-lg flex flex-col lg:flex-row gap-6">
        <form onSubmit={onSubmitHandler} className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 space-y-4">
          <div className="flex items-center gap-2 text-[#00FFA3]">
            <Sparkles className="w-5 h-5" />
            <h2 className="text-xl font-semibold">Resume Review</h2>
          </div>

          <input
            onChange={(e) => setInput(e.target.files[0])}
            type="file"
            accept="application/pdf"
            className="w-full p-2 rounded-md bg-black/40 border border-gray-700 text-white text-sm"
            required
          />
          <p className="text-xs text-gray-400">Upload a PDF resume</p>

          <button
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#00DA83] to-[#009BB3] text-white font-semibold py-2 rounded-md hover:brightness-110 transition"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
              : <FileText className="w-4 h-4" />
            }
            Review Resume
          </button>
        </form>

        <div className="flex-1 bg-neutral-900 rounded-xl border border-neutral-800 p-6 min-h-[300px] max-h-[600px] overflow-y-auto">
          <div className="flex items-center gap-2 text-[#00FFA3] mb-3">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Analysis Results</h2>
          </div>

          {!content ? (
            <div className="flex flex-col items-center justify-center text-gray-500 h-full gap-2">
              <FileText className="w-8 h-8" />
              <p className="text-sm text-center">Upload a resume and click “Review Resume” to begin</p>
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

export default ReviewResume;
