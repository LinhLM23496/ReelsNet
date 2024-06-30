import { UserData } from 'api/users/types'

export type ImageType = {
  height: number
  url: string
  width: number
}

export type PostData = {
  accessibility_caption: null | string
  caption_hashtags: string[]
  caption_mentions: string[]
  caption_text: string
  clips_metadata: any[]
  coauthor_producers: any[]
  code: string
  comment_count: number
  comments_disabled: boolean
  has_liked: boolean
  id: string
  image_versions: ImageType[]
  is_paid_partnership: boolean
  is_video: boolean
  like_and_view_counts_disabled: boolean
  like_count: number
  location: null | string
  media_name: string
  media_type: number
  play_count: number
  product_type: string
  resources: any[]
  sponsor_tags: any[]
  tagged_users: any[]
  taken_at: string
  taken_at_ts: number
  thumbnail_url: null | string
  title: string
  user: UserData
  video_duration: number
  video_url: null | string
  video_versions: any[]
  view_count: number
}
