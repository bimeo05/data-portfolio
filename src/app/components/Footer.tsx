'use client'

import { FaFacebook, FaInstagram, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

const socialLinks = [
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/tbimeo/", label: "LinkedIn" },
  { icon: FaGithub, url: "https://github.com/bimeo05", label: "GitHub" },
  { icon: FaEnvelope, url: "mailto:thuanduc911@gmail.com", label: "Email" }
]

export function Footer() {
  return (
    <footer className="py-10 border-t border-[#2a2a2a] font-mono">
      <div className="flex justify-center space-x-8 mb-6">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white
                     hover:scale-110 active:scale-90 transition-all duration-200"
            aria-label={social.label}
          >
            <social.icon className="w-6 h-6" />
          </a>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} Aatos Pham. All rights reserved.
        </p>
        <p className="text-xs text-gray-500 mt-1">
          BSc. International Biz & MSc. Biz Analytics @ Aalto University
        </p>
      </div>
    </footer>
  )
} 