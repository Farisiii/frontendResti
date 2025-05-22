export type User = {
  id: string
  email: string
  password: string
  name: string
}

export const DUMMY_USERS = [
  {
    id: '1',
    email: 'user@gmail.com',
    password: 'user123',
    name: 'Regular User',
  },
]

export interface ValidationData {
  name: string
  email: string
  password: string
  confirmPassword: string
}
