import React, { useCallback } from "react"
import { motion } from "framer-motion"
import ElementTile from "./ElementTile"

export default function PeriodicTable({ elements, onElementClick, colorScheme }) {
  const tableLayout = Array(10)
    .fill()
    .map(() => Array(18).fill(null))

  elements.forEach((element) => {
    const row = getRowForElement(element.atomicNumber)
    const col = getColForElement(element.atomicNumber)
    if (row !== -1 && col !== -1) {
      tableLayout[row][col] = element
    }
  })

  const handleKeyDown = useCallback(
    (event, element) => {
      if (event.key === "Enter" || event.key === " ") {
        onElementClick(element)
      }
    },
    [onElementClick],
  )

  const lanthanides = elements.filter(el => el.atomicNumber >= 58 && el.atomicNumber <= 71)
  const actinides = elements.filter(el => el.atomicNumber >= 90 && el.atomicNumber <= 103)

  return (
    <div className="w-full overflow-x-auto overflow-y-hidden scrollbar-hide">
      <div className="min-w-[1200px] p-4 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg">
        <div className="flex gap-4 mb-6">
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg shadow-indigo-500/30 hover:shadow-xl transition-all duration-200"
          >
            By Category
          </motion.button>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl transition-all duration-200"
          >
            By State
          </motion.button>
        </div>
        
        <div 
          className="grid gap-1 mb-8" 
          style={{ 
            gridTemplateColumns: 'repeat(18, minmax(60px, 1fr))',
            gridTemplateRows: 'repeat(7, minmax(60px, 1fr))'
          }}
          role="grid" 
          aria-label="Periodic Table"
        >
          {tableLayout.flat().map((element, index) => (
            <div 
              key={index} 
              className={element ? "" : "invisible"} 
              role="gridcell"
              style={{
                gridColumn: element ? getColForElement(element.atomicNumber) + 1 : 'auto',
                gridRow: element ? getRowForElement(element.atomicNumber) + 1 : 'auto'
              }}
            >
              {element && (
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <ElementTile
                    element={element}
                    onClick={() => onElementClick(element)}
                    onKeyDown={(e) => handleKeyDown(e, element)}
                    colorScheme={colorScheme}
                    tabIndex={0}
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <div className="grid gap-1 mt-4">
          {/* Lanthanides row */}
          <div className="flex gap-1 items-center mb-2">
            <div className="w-[120px] text-right pr-2 text-sm">Lanthanides</div>
            <div className="flex gap-1">
              {lanthanides.map((element) => (
                <motion.div 
                  key={element.atomicNumber}
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }}
                  style={{ width: '60px' }}
                >
                  <ElementTile
                    element={element}
                    onClick={() => onElementClick(element)}
                    onKeyDown={(e) => handleKeyDown(e, element)}
                    colorScheme={colorScheme}
                    tabIndex={0}
                  />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="flex gap-1 items-center">
            <div className="w-[120px] text-right pr-2 text-sm">Actinides</div>
            <div className="flex gap-1">
              {actinides.map((element) => (
                <motion.div 
                  key={element.atomicNumber}
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }}
                  style={{ width: '60px' }}
                >
                  <ElementTile
                    element={element}
                    onClick={() => onElementClick(element)}
                    onKeyDown={(e) => handleKeyDown(e, element)}
                    colorScheme={colorScheme}
                    tabIndex={0}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function getRowForElement(atomicNumber) {
  // 1st row
  if (atomicNumber <= 2) return 0;
  // 2nd row
  if (atomicNumber <= 10) return 1;
  // 3rd row
  if (atomicNumber <= 18) return 2;
  // 4th row
  if (atomicNumber <= 36) return 3;
  // 5th row
  if (atomicNumber <= 54) return 4;
  // 6th row
  if (atomicNumber <= 86) return 5;
  // 7th row
  if (atomicNumber <= 118) return 6;
  // Lanthanides
  if (atomicNumber >= 57 && atomicNumber <= 71) return 8;
  // Actinides
  if (atomicNumber >= 89 && atomicNumber <= 103) return 9;
  return -1;
}

function getColForElement(atomicNumber) {
  if ([1, 3, 11, 19, 37, 55, 87].includes(atomicNumber)) return 0;
  
  if ([4, 12, 20, 38, 56, 88].includes(atomicNumber)) return 1;
  
  if (atomicNumber <= 2) return atomicNumber - 1;
  
  if (atomicNumber === 2) return 17;
  
  if ([5, 13, 31, 49, 81, 113].includes(atomicNumber)) return 12;
  if ([6, 14, 32, 50, 82, 114].includes(atomicNumber)) return 13;
  if ([7, 15, 33, 51, 83, 115].includes(atomicNumber)) return 14;
  if ([8, 16, 34, 52, 84, 116].includes(atomicNumber)) return 15;
  if ([9, 17, 35, 53, 85, 117].includes(atomicNumber)) return 16;
  if ([10, 18, 36, 54, 86, 118].includes(atomicNumber)) return 17;
  
  if (atomicNumber >= 21 && atomicNumber <= 30) return atomicNumber - 18;
  if (atomicNumber >= 39 && atomicNumber <= 48) return atomicNumber - 36;
  if (atomicNumber >= 72 && atomicNumber <= 80) return atomicNumber - 68;
  if (atomicNumber >= 104 && atomicNumber <= 112) return atomicNumber - 100;
  
  if (atomicNumber >= 57 && atomicNumber <= 71) return atomicNumber - 54;
  if (atomicNumber >= 89 && atomicNumber <= 103) return atomicNumber - 86;
  
  return -1;
}

