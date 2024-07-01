import { PostData } from 'api/posts/types'

export type PostProps = {
  posts: PostData[]
  users: string[]
  currentIndex: number
}
