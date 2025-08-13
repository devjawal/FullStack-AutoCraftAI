import React from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { FaGithub, FaLinkedin, FaFileAlt } from 'react-icons/fa';
import { Typewriter } from 'react-simple-typewriter';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-neutral-950 text-white min-h-screen py-24">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold mx-auto leading-tight">
          Welcome to{' '}
          <span className="text-[#00FFA3]">
            <Typewriter
              words={['AutoCraft']}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={180}
              deleteSpeed={100}
              delaySpeed={4500}
            />
          </span>
          <br />
          <span className="text-gray-400 text-lg sm:text-xl font-medium">Created by Devkaran Jawal</span>
        </h1>

        <p className="mt-6 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-sm sm:text-base text-gray-400">
          AutoCraft AI empowers creators with premium tools for blog titles, article writing, background and object removal, and AI-based resume reviews — all in one seamless platform.
        </p>
      </div>

      {/* CTA Button */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate('/ai')}
          className="bg-[#00FFA3] hover:bg-[#00e6a0] text-black font-semibold px-10 py-3 rounded-full text-sm transition duration-300 shadow-md"
        >
          Start creating now
        </button>
      </div>

      {/* Divider */}
      <div className="mt-12 h-px w-full bg-gray-700/40 rounded-full" />

      {/* About Me Section */}
      <div className="text-center mt-10 bg-neutral-900 py-10 px-6 rounded-lg shadow-inner border border-neutral-800">
        <h3 className="text-2xl font-semibold text-white">About Me</h3>
        <p className="text-sm text-gray-400 mt-3 max-w-2xl mx-auto leading-relaxed">
          I’m <strong>Devkaran Jawal</strong>, an aspiring <span className="text-emerald-400 font-medium">Web Developer</span> and <strong>B.Tech CSE (Core)</strong> student, passionate about building scalable and modern full-stack web applications.
          <br /><br />
          I work with the <span className="text-emerald-400 font-medium">MERN Stack</span> and have built various full-stack projects, including an <span className="text-cyan-400 font-medium">EdTech Learning Platform</span> with role-based authentication, video handling with Cloudinary, and a backend powered by Express.js and MongoDB.
          <br /><br />
          This project was a great learning experience where I integrated AI tools using external APIs to offer real-time blog generation, resume review, background/object removal, and more. It strengthened my API design, deployment, and frontend optimization skills.
          <br /><br />
          I continuously work on new projects that explore the intersection of web development and AI-driven tools. To see more of my work, feel free to explore my <span className="text-white font-medium underline">GitHub</span> or connect with me on <span className="text-white font-medium underline">LinkedIn</span>.
        </p>

        {/* Social Icons */}
        <div className="flex justify-center gap-6 mt-6">
          <a
            href="https://github.com/devjawal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="GitHub"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://www.linkedin.com/in/devkaran-jawal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://drive.google.com/file/d/19mC86NLGycJe6DCLAX7gdBI8aT-JouLR/view?usp=drive_link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
            aria-label="Resume"
          >
            <FaFileAlt size={24} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
