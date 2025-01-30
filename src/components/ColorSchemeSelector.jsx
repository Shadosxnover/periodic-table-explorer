import React from "react"

const colorSchemes = ["default", "red", "blue", "green", "purple", "orange"]

export default function ColorSchemeSelector({ onChange }) {
  return (
    <select
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
    >
      {colorSchemes.map((scheme) => (
        <option key={scheme} value={scheme}>
          {scheme.charAt(0).toUpperCase() + scheme.slice(1)} Scheme
        </option>
      ))}
    </select>
  )
}

