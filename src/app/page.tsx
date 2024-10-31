'use client'

import React, { useState, useEffect } from 'react'
import { useScroll } from 'framer-motion'
import { Header } from './components/Header/Header'
import { TagList } from './components/TagList/TagList'
import { ProductGrid } from './components/ProductGrid/ProductGrid'
import { Toast } from './components/Toast/Toast'
import { TechBackground } from './components/Background/TechBackground'
import { Footer } from './components/Footer/Footer'
import ProductDialog from './components/ProductGrid/ProductDialog'
import { Product } from './types'
import { products } from '../data/products'

const tags = [
  'AI', 'Blockchain', 'IoT', 'Quantum', 'Nanotech', 'Biotech', 'Robotics', 'VR/AR'
]

const ITEMS_PER_PAGE = 9;

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isScrolled, setIsScrolled] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const { scrollY } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsScrolled(latest > 50)
    })
    return () => unsubscribe()
  }, [scrollY])

  const handleTagToggle = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
    setCurrentPage(1) // Reset page when tags change
  }

  const handleCopy = () => {
    if (selectedProduct) {
      navigator.clipboard.writeText(selectedProduct.content)
        .then(() => {
          setShowToast(true)
          setTimeout(() => setShowToast(false), 3000)
        })
        .catch(err => {
          console.error('Failed to copy: ', err)
        })
    }
  }

  const filteredProducts = products.filter(product => {
    const tagMatch = selectedTags.length === 0 || 
      selectedTags.some(tag => product.tags.includes(tag))
    const searchMatch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    return tagMatch && searchMatch
  })

  const paginatedProducts = filteredProducts.slice(0, currentPage * ITEMS_PER_PAGE)

  const loadMore = () => {
    setCurrentPage(prev => prev + 1)
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen text-black font-sans relative overflow-hidden pt-[120px] flex flex-col">
        <TechBackground />
        <Header isScrolled={isScrolled} searchTerm={searchTerm} onSearch={setSearchTerm} />
        
        <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
          <TagList 
            tags={tags} 
            selectedTags={selectedTags} 
            onTagToggle={handleTagToggle} 
          />
          <ProductGrid 
            products={paginatedProducts}
            onProductSelect={setSelectedProduct}
          />
          
          {/* Load More Button */}
          {paginatedProducts.length < filteredProducts.length && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                Load More
              </button>
            </div>
          )}
        </main>

        <Footer />
      </div>

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
