import { useState } from 'react'
import { FaTimes, FaCopy, FaTwitter, FaLinkedin } from 'react-icons/fa'

export default function ShareModal({ url, onClose }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareToTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, '_blank')
  }

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Share Content</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-700">
            <FaTimes />
          </button>
        </div>
        <div className="mb-4">
          <div className="flex items-center border rounded p-2">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 outline-none"
            />
            <button
              onClick={handleCopy}
              className="ml-2 p-2 text-blue-500 hover:text-blue-700"
              title="Copy link"
            >
              <FaCopy />
            </button>
          </div>
          {copied && <p className="text-green-500 text-sm mt-1">Link copied!</p>}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={shareToTwitter}
            className="p-3 bg-blue-400 text-white rounded-full hover:bg-blue-500"
            aria-label="Share on Twitter"
          >
            <FaTwitter size={20} />
          </button>
          <button
            onClick={shareToLinkedIn}
            className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            aria-label="Share on LinkedIn"
          >
            <FaLinkedin size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}