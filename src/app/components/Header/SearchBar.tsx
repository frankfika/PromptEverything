'use client'

import React from 'react'

interface SearchBarProps {
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  searchTerm = '', 
  onSearch = () => {} 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSubmit} className="w-full mt-2 sm:mt-0 relative mb-4">
      <div className="flex items-center border-2 border-black bg-white relative">
        <span className="pl-2 text-xl font-bold">$</span>
        <input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full p-2 bg-transparent focus:outline-none text-base"
        />
        <button
          type="submit"
          className="p-2 text-black hover:text-gray-600 transition-colors duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  )
}

export default SearchBar 