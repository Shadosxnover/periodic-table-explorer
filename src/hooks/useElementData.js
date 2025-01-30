import { useMemo } from "react"
import elements from "../data/elements"

export function useElementData(filter, search) {
  return useMemo(() => {
    return elements.filter((element) => {
      const matchesFilter = filter === "all" || element.category.toLowerCase() === filter.toLowerCase()
      const matchesSearch =
        element.name.toLowerCase().includes(search.toLowerCase()) ||
        element.symbol.toLowerCase().includes(search.toLowerCase()) ||
        element.atomicNumber.toString().includes(search)
      return matchesFilter && matchesSearch
    })
  }, [filter, search])
}

import { useMemo } from "react"
import elements from "../data/elements"

export function useElementData(filter, search) {
  return useMemo(() => {
    return elements.filter((element) => {
      const matchesFilter = filter === "all" || element.category.toLowerCase() === filter.toLowerCase()
      const matchesSearch =
        element.name.toLowerCase().includes(search.toLowerCase()) ||
        element.symbol.toLowerCase().includes(search.toLowerCase()) ||
        element.atomicNumber.toString().includes(search)
      return matchesFilter && matchesSearch
    })
  }, [filter, search])
}

