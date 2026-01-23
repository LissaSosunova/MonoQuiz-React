export type UserRow = {
  id: string
  name: string
  email: string
  role: 'ADMIN' | 'USER'
  isActive: boolean
}
