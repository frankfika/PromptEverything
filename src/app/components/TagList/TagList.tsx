'use client'

import React, { useEffect, useState } from 'react'
import { api, Tag } from '../../services/api'

interface TagListProps {
  selectedTags: string[];
  onTagToggle: (tag: string, id: number) => void;
}

export const TagList: React.FC<TagListProps> = ({ 
  selectedTags, 
  onTagToggle 
}) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const tagsData = await api.getTags(10);
        console.log('TagList: Fetched tags:', tagsData); // 调试日志
        setTags(tagsData);
      } catch (error) {
        console.error('TagList: Error fetching tags:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (isLoading) {
    return <div className="text-center py-4">Loading tags...</div>;
  }

  return (
    <div className="mb-4 sm:mb-8 mt-4">
      <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
        {tags && tags.length > 0 ? (
          tags.map((tag) => (
            <button
              key={tag.id}
              onClick={() => onTagToggle(tag.name, tag.id)}
              className={`
                px-4 py-2
                text-sm font-medium
                transition-all duration-200
                border-2 border-black
                cursor-pointer
                ${
                  selectedTags.includes(tag.name)
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-50'
                }
              `}
            >
              {tag.name}
            </button>
          ))
        ) : (
          <div className="text-gray-500">No tags available</div>
        )}
      </div>
    </div>
  )
}

export default TagList