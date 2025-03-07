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

export interface Author {
  username: string
  firstname: string
  lastname: string
}

export interface Topic {
  id: string
  title: string
  slug: string
}

export interface PostItem {
  id: string
  title: string
  slug: string
  author: Author
  topic: Topic
}

export interface PostsResponse {
  total: number
  items: PostItem[]
}
