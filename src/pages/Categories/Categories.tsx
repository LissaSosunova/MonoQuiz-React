import { useSearchParams } from 'react-router-dom'

export default function Categories() {
  const [searchParams] = useSearchParams()

  const category = searchParams.get('category')
  const page = Number(searchParams.get('page') || 1)
  const from = Number(searchParams.get('from') || 0)
  const itemsPerPage = Number(searchParams.get('itemsPerPage') || 10)

  return (
    <div>
      <h1>Categories</h1>
      <p>Category: {category}</p>
      <p>Page: {page}</p>
      <p>From: {from}</p>
      <p>Items per page: {itemsPerPage}</p>
    </div>
  )
}