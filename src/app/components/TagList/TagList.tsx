'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TagListProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export const TagList: React.FC<TagListProps> = ({ 
  tags, 
  selectedTags, 
  onTagToggle 
}) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="mb-4 sm:mb-8 mt-4"
    >
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {tags.map((tag) => (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagToggle(tag)}
            className={`
              px-4 py-2
              text-sm font-medium
              transition-all duration-200
              border-2 border-black
              ${
                selectedTags.includes(tag)
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-50'
              }
            `}
          >
            {tag}
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

export default TagList 