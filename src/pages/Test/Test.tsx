import { useSearchParams } from 'react-router-dom'

export default function Test() {
  const [params] = useSearchParams()

  const id = params.get('id')
  const question = params.get('question')
  const from = params.get('from')

  return (
    <div>
      <h1>Test #{id}</h1>
      <p>Question: {question}</p>
      <p>From: {from}</p>
    </div>
  )
}
