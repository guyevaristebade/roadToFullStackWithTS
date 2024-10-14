import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home, TodoList } from './pages'
import { Product } from './pages/Product/Product'

export const AppRouter : React.FC = () => {
    return (
        <Routes>
            <Route index element={<Home/>}/>
            <Route path='product' element={<Product/>}/>
            <Route path='todolist' element={<TodoList/>}/>
        </Routes>
    )
}
