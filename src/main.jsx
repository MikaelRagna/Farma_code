import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './Components/settings/Reset.css'
import App from './App'
import Compra from './pages/compra/PaginaPrincipal'
import Form from './pages/form'
import Dashboard from './pages/dashboard'
import Receita from './pages/Receita/PaginaReceita'
import Link from './pages/link'


import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: '/',
    element : <App />,
    children:[
      {
        path: '/',
        element: <Compra />
      },
      {
        path: '/:hash',
        element: <Compra/>
      },
      {
        path: '/login',
        element : <Form />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />
      },
      {
        path: '/receitas',
        element: <Receita />
      },
      {
        path: '/receitadigital/:hash',
        element: <Link/>
      }
    ]
  }
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rotas} />
  </React.StrictMode>

)
