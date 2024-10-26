'use client'

import { useState, useEffect } from 'react'
import { Dialog } from '@headlessui/react'
import { products } from '../data/products'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

// 添加 Toast 组件定义
interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="bg-[#8E9AAF] text-white px-6 py-3 rounded-lg shadow-lg">
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
          ✕
        </button>
      </div>
    </div>
  );
};

const tags = [
  'AI', 'Blockchain', 'IoT', 'Quantum', 'Nanotech', 'Biotech', 'Robotics', 'VR/AR'
]

const ITEMS_PER_PAGE = 9; // 3 rows x 3 columns

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [showToast, setShowToast] = useState(false)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = scrollY.onChange(latest => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Searching for:', searchTerm, 'with tags:', selectedTags)
  }

  const handleTagToggle = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(tag => tag !== tagName)
        : [...prev, tagName]
    )
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

  const filteredProducts = products.filter(product => 
    selectedTags.length === 0 || selectedTags.some(tag => product.tags.includes(tag))
  )

  const paginatedProducts = filteredProducts.slice(0, currentPage * ITEMS_PER_PAGE);

  const loadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen text-black font-sans relative overflow-hidden pt-[120px] flex flex-col">
        {/* Add new tech background */}
        <div className="absolute inset-0 z-0">
          <div className="tech-background"></div>
        </div>
        
        {/* Existing background */}
        <div className="absolute inset-0 z-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        
        <div className="relative z-10 flex-grow">
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
                <form onSubmit={handleSearch} className="w-full mt-2 sm:mt-0 relative mb-4"> {/* Added mb-4 for bottom margin */}
                  <div className="flex items-center border-2 border-black bg-white relative">
                    <span className="pl-2 text-xl font-bold">$</span>
                    <input
                      type="text"
                      placeholder="Search prompts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
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
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-black"></div>
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black"></div>
                </form>
              </div>
            </div>
          </motion.header>

          <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mb-4 sm:mb-8 mt-4" // Added mt-4 for top margin
            >
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center">
                {tags.map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTagToggle(tag)}
                    className={`px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base transition-all duration-200 border-2 ${
                      selectedTags.includes(tag)
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-black border-black hover:bg-gray-100'
                    }`}
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {paginatedProducts.map((product, index) => (
                <motion.div 
                  key={product.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.03, 
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    transition: { duration: 0.2 }
                  }}
                  className="bg-white overflow-hidden shadow-md cursor-pointer border-2 border-black hover:shadow-lg transition-all duration-300 relative flex flex-col h-[200px] sm:h-[220px]"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="absolute top-0 left-0 w-full h-[0.5px] bg-black"></div>
                  <div className="absolute top-0 left-0 w-[0.5px] h-full bg-black"></div>
                  <div className="absolute bottom-0 right-0 w-full h-[0.5px] bg-black"></div>
                  <div className="absolute bottom-0 right-0 w-[0.5px] h-full bg-black"></div>
                  <div className="p-5 flex flex-col h-full"> {/* Increased padding */}
                    <div className="flex justify-between items-start mb-3"> {/* Increased margin-bottom */}
                      <h3 className="text-lg font-bold truncate">{product.title}</h3>
                      <span className="bg-black text-white text-xs px-2 py-1 rounded-full border border-white whitespace-nowrap ml-2">
                        {product.copies} copied
                      </span>
                    </div>
                    <p className="text-sm mb-4 flex-grow overflow-hidden leading-relaxed" style={{ // Increased line-height
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
              ))}
            </motion.div>

            {paginatedProducts.length < filteredProducts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300"
                >
                  Load More
                </button>
              </div>
            )}
          </main>

          {/* Add copyright information at the bottom of the page */}
          <div className="text-xs text-gray-500 py-4 text-center border-t border-gray-200 mt-8">
            © 2023 PromptLib | All rights reserved
          </div>

          <AnimatePresence>
            {selectedProduct && (
              <Dialog 
                as={motion.div}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-50"
                open={selectedProduct !== null} 
                onClose={() => setSelectedProduct(null)}
              >
                <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel 
                    as={motion.div}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 } as any}
                    className="relative bg-white max-w-4xl w-full mx-4 p-8 shadow-xl border-2 border-black rounded-lg"
                  >
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    {selectedProduct && (
                      <>
                        <div className="flex justify-between items-start mb-4 pr-8">
                          <Dialog.Title className="text-2xl font-bold">{selectedProduct.title}</Dialog.Title>
                          <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                            {selectedProduct.copies} copied
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {selectedProduct.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full border border-gray-300">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <p className="text-sm text-gray-600 mb-6 border-b border-gray-200 pb-4">{selectedProduct.description}</p>
                        <div className="bg-gray-100 overflow-hidden border-2 border-black rounded-lg">
                          <div className="flex items-center justify-between bg-white px-6 py-3 border-b-2 border-black">
                            <span className="text-sm font-semibold">Prompts</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCopy();
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 3000);
                              }}
                              className="hover:text-gray-600 transition-colors duration-200 flex items-center"
                              title="Copy to clipboard"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                              </svg>
                              Copy
                            </button>
                          </div>
                          <pre className="whitespace-pre-wrap overflow-x-auto font-mono text-sm p-6">
                            {selectedProduct.content}
                          </pre>
                        </div>
                      </>
                    )}
                  </Dialog.Panel>
                </div>
              </Dialog>
            )}
          </AnimatePresence>
        </div>

        {/* Add styles for the new background */}
        <style jsx global>{`
          .tech-background {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
              linear-gradient(to right, rgba(100, 100, 100, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(100, 100, 100, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
            animation: moveBackground 15s linear infinite;
          }

          @keyframes moveBackground {
            0% {
              background-position: 0 0;
            }
            100% {
              background-position: 20px 20px;
            }
          }

          .tech-background::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: radial-gradient(circle at 50% 50%, rgba(0, 100, 255, 0.1), transparent 50%);
            animation: pulse 5s infinite alternate;
          }

          @keyframes pulse {
            0% {
              opacity: 0.5;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </div>

      {/* Move Toast outside of the main component structure */}
      <Toast 
        message="Content copied to clipboard!" 
        isVisible={showToast} 
        onClose={() => setShowToast(false)}
      />
    </>
  )
}
