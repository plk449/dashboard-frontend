import { useState } from 'react'
import { FaBookmark, FaShareAlt, FaFlag } from 'react-icons/fa'
import api from '../../services/api'
import ShareModal from './ShareButton'

export default function FeedItem({ item }) {
  const [isSaved, setIsSaved] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)

  const handleSave = async () => {
    try {
      await api.post('/feed/save', { itemId: item._id },
          {withCredentials:true}
      )
      setIsSaved(true)
      // console.log("done");
      
    } catch (err) {
      console.error('Save failed:', err)
    }
  }

   const handleShear = async () => {
    try {
      await api.post('/feed/shear', { itemId: item._id },
          {withCredentials:true}
      )
      // setIsSaved(true)
       setShowShareModal(true)
      console.log("done");
      
    } catch (err) {
      console.error('Save failed:', err)
    }
  }

  //save as read
  const handleViewOriginal = async (e) => {
    e.preventDefault(); // prevent the default link navigation for now
   

  try {
    await api.patch(`/feed/${item._id}/read`); // adjust route as needed
  } catch (err) {
    console.error('Mark as read failed:', err);
  } finally {
    // open the original URL after the API call
    window.open(item.url, '_blank', 'noopener,noreferrer');
  }
};


  const handleReport = async () => {
    try {
      await api.post('/feed/report', { itemId: item._id }, {
        withCredentials:true
      })
      alert('Content reported to admins')
    } catch (err) {
      console.error('Report failed:', err)
    }
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded-md">
              {item.source}
            </span>
            <h3 className="mt-2 text-lg font-medium">{item.title || item.content.substring(0, 80)}...</h3>
            <p className="mt-1 text-sm text-gray-600">
              By {item.author} • {new Date(item.date).toLocaleDateString()}
            </p>
            <a 
              href={item.url} 
              target="_blank" 
              onClick={handleViewOriginal}
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-blue-500 hover:underline"
            >
              View original
            </a>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className={`p-2 rounded-full ${isSaved ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
              aria-label="Save"
            >
              <FaBookmark />
            </button>
            <button
              onClick={handleShear}
              className="p-2 text-gray-400 hover:text-blue-500 rounded-full"
              aria-label="Share"
            >
              <FaShareAlt />
            </button>
            <button
              onClick={handleReport}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full"
              aria-label="Report"
            >
              <FaFlag />
            </button>
          </div>
        </div>
      </div>

      {showShareModal && (
        <ShareModal 
          url={item.url} 
          onClose={() => setShowShareModal(false)} 
        />
      )}
    </>
  )
}