import { useContext } from 'react'
import { DictionaryContext } from '../context/DictionaryContext'

export const useDictionaries = () => {
  return useContext(DictionaryContext)
}
