import { useEffect, useState } from 'react'
import { DictionaryContext } from '../context/DictionaryContext'
import { TypesAPI } from '../api/types.api'
import { CategoriesAPI } from '../api/categories.api'
import { TestsAPI } from '../api/tests.api'

export function DictionaryProvider({ children }: { children: React.ReactNode }) {

  const [types, setTypes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [tests, setTests] = useState<any[]>([])

  useEffect(() => {
    async function load() {
      const [typesData, categoriesData, testsData] = await Promise.all([
        TypesAPI.getAll(),
        CategoriesAPI.getAll(),
        TestsAPI.getAll()
      ])

      setTypes(typesData)
      setCategories(categoriesData)
      setTests(testsData)
    }

    load()
  }, [])

  return (
    <DictionaryContext.Provider
      value={{
        types,
        categories,
        tests
      }}
    >
      {children}
    </DictionaryContext.Provider>
  )
}
