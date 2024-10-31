'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Product } from '../..'

interface ProductCardProps {
  product: Product;
  index: number;
  onClick: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  onClick
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      whileHover={{ 
        scale: 1.03, 
        boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
        transition: { duration: 0.2 }
      }}
      className="bg-white overflow-hidden shadow-md cursor-pointer border-2 border-black hover:shadow-lg transition-all duration-300 relative flex flex-col h-[200px] sm:h-[220px]"
      onClick={() => onClick(product)}
    >
      <div className="absolute top-0 left-0 w-full h-[0.5px] bg-black"></div>
      <div className="absolute top-0 left-0 w-[0.5px] h-full bg-black"></div>
      <div className="absolute bottom-0 right-0 w-full h-[0.5px] bg-black"></div>
      <div className="absolute bottom-0 right-0 w-[0.5px] h-full bg-black"></div>
      <div className="p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold truncate">{product.title}</h3>
          <span className="bg-black text-white text-xs px-2 py-1 rounded-full border border-white whitespace-nowrap ml-2">
            {product.copies} copied
          </span>
        </div>
        <p className="text-sm mb-4 flex-grow overflow-hidden leading-relaxed" style={{
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical'
        }}>
          {product.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {product.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 text-black text-xs px-2 py-1 border border-black">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ProductCard