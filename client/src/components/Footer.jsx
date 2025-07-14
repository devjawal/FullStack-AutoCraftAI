import React from 'react'
import { assets } from '../assets/assets'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  return (
    <div className="bg-gradient-to-b from-neutral-950 to-neutral-800 text-gray-400 p-3">
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 w-full">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-t border-gray-600/30 p-3">
          
          {/* Left: Logo + Description */}
          <div className="md:max-w-96">
            <img className="h-6 " src={assets.autoCraft} alt="logo"/>
            <p className="mt-6 text-sm">
              Experience the power of AI with AutoCraft AI.<br />
              Tools for blog titles, article writing, image cleanup, and resume reviews — all AI-powered to streamline your workflow.
            </p>
          </div>

          {/* Right: Links and Contact Info */}
          <div className="flex-1 flex flex-col gap-6 md:items-end">

            {/* Navigation Links (horizontal) */}
            <div className="flex gap-6 flex-wrap justify-start md:justify-end text-sm">
              <a href="#" className="hover:text-white transition">Home</a>
              <a href="#" className="hover:text-white transition">About Us</a>
              <a href="#" className="hover:text-white transition">Contact</a>
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
            </div>

            {/* Contact Info (column) */}
            <div className="flex flex-col gap-3 text-sm items-start md:items-end">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-white" />
                <a href="mailto:devkaranjawal30@gmail.com">devkaranjawal30@gmail.com</a>
              </div>
              <div className="flex items-center gap-2">
                <FaPhoneAlt className="text-white" />
                <a href="tel:9167515419">+91 9167515419</a>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-white" />
                <span>Mumbai, Maharashtra</span>
              </div>
              <div className="flex gap-4 mt-1 text-lg">
                <a href="https://www.linkedin.com/in/devkaran-jawal/" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="hover:text-white" />
                </a>
                <a href="https://github.com/devjawal" target="_blank" rel="noopener noreferrer">
                  <FaGithub className="hover:text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div>
          <p className="pt-4 text-center text-xs md:text-sm text-gray-500">
            Copyright 2025 © Devkaran Jawal. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
