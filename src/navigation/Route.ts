import { lazy } from 'react'
import { RootStackParamList } from './NavigationService'
import Home from 'screens/Home/Home'
import Settings from 'screens/Settings/Settings'

const Search = lazy(() => import('screens/Search/Search'))
const CreatePost = lazy(() => import('screens/CreatePost/CreatePost'))
const CreatePostContent = lazy(
  () => import('screens/CreatePostContent/CreatePostContent')
)

type RouteConfig = {
  [key in keyof RootStackParamList]: {
    name: key
    component: React.ComponentType<any>
  }
}

const Route: RouteConfig = {
  Main: {
    name: 'Main',
    //@ts-ignore
    component: undefined
  },
  Home: {
    name: 'Home',
    component: Home
  },
  Settings: {
    name: 'Settings',
    component: Settings
  },
  CreatePost: {
    name: 'CreatePost',
    component: CreatePost
  },
  CreatePostContent: {
    name: 'CreatePostContent',
    component: CreatePostContent
  },
  Search: {
    name: 'Search',
    component: Search
  }
}
export default Route
