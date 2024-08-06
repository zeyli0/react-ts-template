import { createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import Login from '@/pages/login'
const Home = lazy(() => import('@/pages/Home'))
const About = lazy(() => import('@/pages/about'))

const routeConfig = [
    {
        path: '/',
        element: <Navigate to='/home' />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/about',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <About />
            </Suspense>
        )
    },
    {
        path: '/login',
        element: (
            <Suspense fallback={<div>Loading...</div>}>
                <Login />
            </Suspense>
        )
    }
]

const router = createHashRouter(routeConfig)
const Routes = () => {
    return <RouterProvider router={router} />
}

export default Routes
