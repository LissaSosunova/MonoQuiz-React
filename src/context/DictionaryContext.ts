import { createContext } from 'react'

export type Dictionaries = {
  types: any[]
  categories: any[]
  tests: any[]
  reloadTypes: () => Promise<void>
  reloadCategories: () => Promise<void>
  reloadTests: () => Promise<void>
}

export const DictionaryContext = createContext<Dictionaries>({
  types: [],
  categories: [],
  tests: [],
  reloadTypes: async () => {},
  reloadCategories: async () => {},
  reloadTests: async () => {}
})
