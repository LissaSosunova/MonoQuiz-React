import { createContext } from 'react'

export type Dictionaries = {
  types: any[]
  categories: any[]
  tests: any[]
}

export const DictionaryContext = createContext<Dictionaries>({
  types: [],
  categories: [],
  tests: []
})
