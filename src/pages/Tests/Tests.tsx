import { useSearchParams } from 'react-router-dom'
import { useDictionaries } from '../../hooks/useDictionaries'

export default function Tests() {
  const [searchParams] = useSearchParams()

  const page = Number(searchParams.get('page') || 1)
  const from = Number(searchParams.get('from') || 0)
  const itemsPerPage = Number(searchParams.get('itemsPerPage') || 10)
  const { types, categories, tests } = useDictionaries()

  return (
    <div>
      <h1>Tests</h1>
      {tests.map((test, index) => (
        <div>{test.type}</div>
      ))}
      <p>Page: {page}</p>
      <p>From: {from}</p>
      <p>Items per page: {itemsPerPage}</p>
    </div>
  )
}