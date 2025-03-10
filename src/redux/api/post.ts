export interface Post {
  total: number
  items: {
    id: string
    title: string
    slug: string
  }
}

export const fetchPost = async (): Promise<Post[]> => {
  const res = await fetch("https://api.kungfutech.edu.vn/api/posts")
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}

export interface Topic {
  id: string
  title: string
  description: string
  content: string
  viewCount: number
  createdAt: string
}

export const fetchTopic = async (id: string): Promise<Topic> => {
  const res = await fetch(`https://api.kungfutech.edu.vn/api/posts/${id}`)
  if (!res.ok) throw new Error("Failed to fetch users")
  return res.json()
}
