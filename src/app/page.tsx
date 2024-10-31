'use client'

import React, { useState, useEffect } from 'react'
import { useScroll } from 'framer-motion'

// Components
import { Header } from '@/app/components/Header/Header'
import { TagList } from '@/app/components/TagList/TagList'
import { ProductGrid } from '@/app/components/ProductGrid/ProductGrid'
import { Toast } from '@/app/components/Toast/Toast'
import { TechBackground } from '@/app/components/Background/TechBackground'
import { Footer } from '@/app/components/Footer/Footer'
import ProductDialog from '@/app/components/ProductGrid/ProductDialog'

// Types and Data
import { Product } from '@/app/types'
import { products } from '@/data/products'

// Constants
const TAGS = ['AI', 'Blockchain', 'IoT', 'Quantum', 'Nanotech', 'Biotech', 'Robotics', 'VR/AR']
const ITEMS_PER_PAGE = 6

export default function Home() {
  // State
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)

  // Hooks
  const { scrollY } = useScroll()

  // Effects
  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  // Handlers
  const handleTagToggle = (tagName: string, tagId: number) => {
    console.log('Tag clicked:', tagName, 'ID:', tagId);
    setSelectedTags(prev => {
      if (prev.includes(tagName)) {
        return prev.filter(t => t !== tagName);
      } else {
        return [...prev, tagName];
      }
    });
    setCurrentPage(1);
  };

  const handleCopy = async () => {
    if (!selectedProduct) return

    try {
      await navigator.clipboard.writeText(selectedProduct.content)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Data filtering
  const filteredProducts = products.filter(product => {
    const tagMatch = selectedTags.length === 0 || 
      selectedTags.some(tag => product.tags.includes(tag))
    const searchMatch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return tagMatch && searchMatch
  })

  const paginatedProducts = filteredProducts.slice(0, currentPage * ITEMS_PER_PAGE)

  return (
    <>
      <div className="relative bg-gray-100 min-h-screen text-black font-sans overflow-hidden pt-[120px] flex flex-col">
        <TechBackground />
        
        {/* Header */}
        <Header 
          isScrolled={isScrolled} 
          searchTerm={searchTerm} 
          onSearch={setSearchTerm} 
        />
        
        {/* Main Content */}
        <main className="relative z-10 container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <TagList 
            selectedTags={selectedTags} 
            onTagToggle={handleTagToggle} 
          />
          
          <ProductGrid 
            products={paginatedProducts}
            onProductSelect={setSelectedProduct}
          />
          
          {/* Load More Button */}
          {filteredProducts.length > ITEMS_PER_PAGE && currentPage * ITEMS_PER_PAGE < filteredProducts.length && (
            <div className="text-center mt-8 mb-8">
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="relative z-10 px-8 py-3 bg-black text-white text-lg font-medium
                         rounded-lg hover:bg-gray-800 transition-all duration-300 
                         shadow-md hover:shadow-xl transform hover:-translate-y-1"
              >
                Load More
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>

      {/* Modals and Notifications */}
      <ProductDialog 
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onCopy={handleCopy}
      />

      <Toast 
        message="Content copied to clipboard!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)}
      />
    </>
  )
}
