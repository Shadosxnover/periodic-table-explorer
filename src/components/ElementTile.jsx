import React from "react"
import { Tooltip } from "react-tooltip"

const categoryColors = {
  "Alkali Metal": "bg-red-200 dark:bg-red-800",
  "Alkaline Earth Metal": "bg-orange-200 dark:bg-orange-800",
  "Transition Metal": "bg-yellow-200 dark:bg-yellow-800",
  "Post-Transition Metal": "bg-green-200 dark:bg-green-800",
  Metalloid: "bg-teal-200 dark:bg-teal-800",
  Nonmetal: "bg-blue-200 dark:bg-blue-800",
  Halogen: "bg-indigo-200 dark:bg-indigo-800",
  "Noble Gas": "bg-purple-200 dark:bg-purple-800",
  Lanthanide: "bg-pink-200 dark:bg-pink-800",
  Actinide: "bg-rose-200 dark:bg-rose-800",
}

export default function ElementTile({ element, onClick, onKeyDown, colorScheme }) {
  const bgColor =
    colorScheme === "default"
      ? categoryColors[element.category] || "bg-gray-200 dark:bg-gray-800"
      : `bg-${colorScheme}-${(element.atomicNumber % 9) + 1}00`

  return (
    <>
      <div
        className={`${bgColor} p-1 rounded cursor-pointer hover:shadow-lg transition-shadow duration-300 text-center`}
        onClick={() => onClick(element)}
        onKeyDown={onKeyDown}
        role="button"
        tabIndex={0}
        aria-label={`${element.name}, atomic number ${element.atomicNumber}`}
        data-tooltip-id={`element-${element.atomicNumber}`}
        data-tooltip-content={`${element.name} (${element.symbol})`}
      >
        <div className="text-xs">{element.atomicNumber}</div>
        <div className="text-lg font-bold">{element.symbol}</div>
        <div className="text-xs truncate">{element.name}</div>
      </div>
      <Tooltip id={`element-${element.atomicNumber}`} />
    </>
  )
}

