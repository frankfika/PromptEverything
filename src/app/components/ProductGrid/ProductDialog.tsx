'use client'

import React from 'react'
import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from 'framer-motion'
import { Product } from '../..'

interface ProductDialogProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onCopy: () => void;
}

export const ProductDialog: React.FC<ProductDialogProps> = ({
  product,
  isOpen,
  onClose,
  onCopy
}) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog 
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative z-50"
          open={isOpen} 
          onClose={onClose}
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel 
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 } as any}
              className="relative bg-white max-w-4xl w-full mx-4 p-8 shadow-xl border-2 border-black rounded-lg"
            >
              <button
                onClick={onClose}
                className="absolute top-2 right-2 p-2 hover:bg-gray-200 rounded-full transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="flex justify-between items-start mb-4 pr-8">
                <Dialog.Title className="text-2xl font-bold">{product.title}</Dialog.Title>
                <span className="bg-black text-white text-sm px-3 py-1 rounded-full">
                  {product.copies} copied
                </span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-200 text-black text-xs px-2 py-1 rounded-full border border-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 mb-6 border-b border-gray-200 pb-4">
                {product.description}
              </p>
              
              <div className="bg-gray-100 overflow-hidden border-2 border-black rounded-lg">
                <div className="flex items-center justify-between bg-white px-6 py-3 border-b-2 border-black">
                  <span className="text-sm font-semibold">Prompts</span>
                  <button
                    onClick={onCopy}
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
                  {product.content}
                </pre>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}

export default ProductDialog 