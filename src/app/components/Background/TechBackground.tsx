'use client'

import React from 'react'
import { motion } from 'framer-motion'

export const TechBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      {/* 基础渐变背景 */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* 主背景渐变 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />
        
        {/* 网格背景 */}
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.1) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(0,0,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* 柔和光效 */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-200 rounded-full filter blur-[100px] opacity-20" />
        </div>
      </motion.div>
    </div>
  )
}

export default TechBackground 