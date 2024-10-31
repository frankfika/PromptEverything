'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import PromptDialog from '../PromptDialog'

const PromptButtons = () => {
  const [dialogType, setDialogType] = useState<'text' | 'image' | null>(null);

  return (
    <>
      <div className="flex justify-center gap-4 mb-6">
        <motion.button
          onClick={() => setDialogType('text')}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-400 to-indigo-400 
                     text-white rounded-lg shadow-md hover:shadow-lg 
                     transition-all duration-300 flex items-center gap-2
                     border border-white/20 backdrop-blur-sm"
        >
          <span className="text-lg">✍️</span>
          <span className="text-sm font-medium">Prompt Writer (Text2Text)</span>
        </motion.button>

        <motion.button
          onClick={() => setDialogType('image')}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="px-5 py-2.5 bg-gradient-to-r from-rose-400 to-orange-400 
                     text-white rounded-lg shadow-md hover:shadow-lg 
                     transition-all duration-300 flex items-center gap-2
                     border border-white/20 backdrop-blur-sm"
        >
          <span className="text-lg">🎨</span>
          <span className="text-sm font-medium">Prompt Writer (Text2Image)</span>
        </motion.button>
      </div>

      <PromptDialog
        isOpen={dialogType !== null}
        onClose={() => setDialogType(null)}
        type={dialogType || 'text'}
      />
    </>
  )
}

export default PromptButtons