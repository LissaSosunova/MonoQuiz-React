import { useEffect, useState } from 'react'
import { DictionaryContext } from '../context/DictionaryContext'
import { TypesAPI } from '../api/types.api'
import { CategoriesAPI } from '../api/categories.api'
import { TestsAPI } from '../api/tests.api'

export function DictionaryProvider({ children }: { children: React.ReactNode }) {

  const [types, setTypes] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [tests, setTests] = useState<any[]>([])

  const reloadTypes = async () => {
    const data = await TypesAPI.getAll()
    setTypes(data)
  }

  const reloadCategories = async () => {
    const data = await CategoriesAPI.getAll()
    setCategories(data)
  }

  const reloadTests = async () => {
    const data = await TestsAPI.getAll()
    setTests(data)
  }

  useEffect(() => {
    async function load() {
      await Promise.all([
        reloadTypes(),
        reloadCategories(),
        reloadTests()
      ])
    }

    load()
  }, [])

  return (
    <DictionaryContext.Provider
      value={{
        types,
        categories,
        tests,
        reloadTypes,
        reloadCategories,
        reloadTests
      }}
    >
      {children}
    </DictionaryContext.Provider>
  )
}
