import React from "react"

export default function CompareMode({ element1, element2, onClose }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Compare Elements</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-xl font-semibold">{element1.name}</h3>
          <p>
            <strong>Symbol:</strong> {element1.symbol}
          </p>
          <p>
            <strong>Atomic Number:</strong> {element1.atomicNumber}
          </p>
          <p>
            <strong>Mass:</strong> {element1.mass}
          </p>
          <p>
            <strong>Category:</strong> {element1.category}
          </p>
          <p>
            <strong>State:</strong> {element1.state}
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold">{element2.name}</h3>
          <p>
            <strong>Symbol:</strong> {element2.symbol}
          </p>
          <p>
            <strong>Atomic Number:</strong> {element2.atomicNumber}
          </p>
          <p>
            <strong>Mass:</strong> {element2.mass}
          </p>
          <p>
            <strong>Category:</strong> {element2.category}
          </p>
          <p>
            <strong>State:</strong> {element2.state}
          </p>
        </div>
      </div>
      <button onClick={onClose} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Close Comparison
      </button>
    </div>
  )
}

