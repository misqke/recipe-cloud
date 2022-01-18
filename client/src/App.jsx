import React from 'react'
import Home from './pages/Home'
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserRecipeBook from './pages/users/UserRecipeBook';
import RecipeId from './pages/recipes/RecipeId';
import EditRecipe from './pages/recipes/EditRecipe';
import AddRecipe from './pages/recipes/AddRecipe';


const App = () => {
  return (
    <div>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/users/:creator" element={<UserRecipeBook />} />
            <Route path="/recipes/add" element={<AddRecipe />} />
            <Route path="/recipes/:id" element={<RecipeId />} />
            <Route path="/recipes/:id/edit" element={<EditRecipe />} />
          
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
