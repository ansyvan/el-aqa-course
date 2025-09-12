import { Post } from './types.js'

export async function fetchPosts (): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await response.json()
  return posts
}

export async function fetchSeveralPosts (start: number, end: number): Promise<Post[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const allPosts = await response.json()
  return allPosts.slice(start, end)
}
