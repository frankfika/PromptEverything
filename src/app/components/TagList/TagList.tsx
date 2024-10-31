'use client'

import React from 'react'

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
    <div className="relative z-10 mb-4 sm:mb-8 mt-4">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`
              relative z-10
              px-4 py-2
              text-sm font-medium
              transition-all duration-200
              border-2 border-black
              cursor-pointer
              ${
                selectedTags.includes(tag)
                  ? 'bg-black text-white'
                  : 'bg-white text-black hover:bg-gray-50'
              }
            `}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagList