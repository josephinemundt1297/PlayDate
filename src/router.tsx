import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router'
import { AppShell } from './components/templates/AppShell'
import { DashboardPage } from './pages/DashboardPage'
import { PlayDateEditorPage } from './pages/PlayDateEditorPage'
import { SettingsPage } from './pages/SettingsPage'

const rootRoute=createRootRoute({component:AppShell})
const indexRoute=createRoute({getParentRoute:()=>rootRoute,path:'/',component:DashboardPage})
const datesRoute=createRoute({getParentRoute:()=>rootRoute,path:'/playdates',component:()=> <DashboardPage showAll/>})
const newRoute=createRoute({getParentRoute:()=>rootRoute,path:'/new',component:PlayDateEditorPage})
const editRoute=createRoute({getParentRoute:()=>rootRoute,path:'/edit/$playDateId',component:()=> <PlayDateEditorPage editId={Number(location.pathname.split('/').pop())}/>})
const settingsRoute=createRoute({getParentRoute:()=>rootRoute,path:'/settings',component:SettingsPage})
const routeTree=rootRoute.addChildren([indexRoute,datesRoute,newRoute,editRoute,settingsRoute])
export const router=createRouter({routeTree})
declare module '@tanstack/react-router'{interface Register{router:typeof router}}
