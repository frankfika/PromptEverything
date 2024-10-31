'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '../../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  products, 
  onProductSelect 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
    >
      <AnimatePresence>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onClick={onProductSelect}
          />
        ))}
      </AnimatePresence>
      {products.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500">
          No products found matching your criteria
        </div>
      )}
    </motion.div>
  )
}

export default ProductGrid