import Home from 'screens/Home/Home'
import { RootStackParamList } from './NavigationService'
import Settings from 'screens/Settings/Settings'
import CreatePost from 'screens/CreatePost/CreatePost'

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
  }
}
export default Route
