export interface User {
  id: number
  name: string
  email: string
  address: {
    street: string
    city: string
    zipcode: string
  }
  company: {
    name: string
  }
}

export interface Todo {
  id: number
  title: string
}
