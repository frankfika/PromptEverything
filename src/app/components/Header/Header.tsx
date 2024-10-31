'use client'

import React from 'react'
import { motion } from 'framer-motion'
import SearchBar from './SearchBar'

interface HeaderProps {
  isScrolled: boolean;
  searchTerm?: string;
  onSearch?: (term: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isScrolled,
  searchTerm = '',
  onSearch = () => {}
}) => {
  return (
    <motion.header 
      className="border-b-[8px] border-black border-double fixed top-0 left-0 right-0 z-20 bg-white transition-all duration-300"
      animate={{ height: isScrolled ? '80px' : '120px' }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col justify-between items-center h-full py-2 sm:py-4">
          <div className="flex flex-col sm:flex-row items-center w-full justify-between">
            <motion.h1 
              className="font-bold relative text-2xl sm:text-3xl mb-2 sm:mb-0"
              animate={{ fontSize: isScrolled ? '1.5rem' : '2rem' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                PromptLib
              </span>
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-black"></span>
              <span className="absolute -bottom-2 left-0 w-3/4 h-[0.5px] bg-black"></span>
            </motion.h1>
            <motion.p 
              className="text-xs sm:text-sm font-semibold bg-black text-white px-2 sm:px-3 py-1 rounded-full border-2 border-white shadow-md mb-2 sm:mb-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              No login or registration required!
            </motion.p>
          </div>
          <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
        </div>
      </div>
    </motion.header>
  )
}

export default Header 