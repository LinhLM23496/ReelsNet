import { lazy } from 'react'
import { RootStackParamList } from './NavigationService'
import Splash from 'screens/Splash/Splash'
import Home from 'screens/Home/Home'
import Settings from 'screens/Settings/Settings'
const CreatePost = lazy(() => import('screens/CreatePost/CreatePost'))
const Search = lazy(() => import('screens/Search/Search'))
const CreatePostFilter = lazy(
  () => import('screens/CreatePostFilter/CreatePostFilter')
)
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
  Splash: {
    name: 'Splash',
    component: Splash
  },
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
  CreatePostFilter: {
    name: 'CreatePostFilter',
    component: CreatePostFilter
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
