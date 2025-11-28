import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './../components/Register/Register';
import Login from './../components/Login/Login';
import NotFound from './../components/NotFound/NotFound';
import Home from './../components/Home/Home';
import Layout from './../components/Layout/Layout';
import { UserContextProvider } from '../Context/UserContext.jsx';
import GardRoutes from './../components/GardRoutes/GardRoutes';
import PostContextProvider from '../Context/PostContext.jsx';
import Profile from './../components/Profile/Profile';


export default function Route() {
    let routes = createBrowserRouter(
        [
            {
                path: '/',
                element: <Layout />,
                children: [
                    {
                        path: 'home',
                        element: (<GardRoutes>
                            <Home />
                        </GardRoutes>)
                    },

                    {
                        path: 'register',
                        element: <Register />
                    },
                    {
                        index: true,
                        element: <Login />
                    },
                    {
                        path: 'login',
                        element: <Login />
                    },
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        path: '*',
                        element: <NotFound />
                    }
                ]
            }
        ]


    )
    return (


        <UserContextProvider>
            <PostContextProvider>

                <RouterProvider
                    router={routes}
                >

                </RouterProvider>

            </PostContextProvider>

        </UserContextProvider>

    )
}

