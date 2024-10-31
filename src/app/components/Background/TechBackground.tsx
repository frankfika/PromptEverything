'use client'

import React from 'react'

export const TechBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <div className="absolute inset-0">
        {/* 基础渐变背景 */}
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
      </div>
    </div>
  )
}

export default TechBackground