import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Register from './../components/Register/Register';
import Login from './../components/Login/Login';
import NotFound from './../components/NotFound/NotFound';
import Home from './../components/Home/Home';
import Layout from './../components/Layout/Layout';
import { UserContextProvider } from '../Context/UserContext.jsx';
import GardRoutes from './../components/GardRoutes/GardRoutes';
import Profile from './../components/Profile/Profile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

const query = new QueryClient();


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
           
                <QueryClientProvider client={query}>

                    <RouterProvider
                        router={routes}
                    >

                    </RouterProvider>
                    <Toaster position="top-center" />
                    <ReactQueryDevtools/>
                </QueryClientProvider>

            

        </UserContextProvider>

    )
}

