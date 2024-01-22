import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom'
import Header from './pages/Header';
import Login from './login/LogIn';
import Signin from './login/SignUp';
import HomePage from './pages/HomePage';
import Recipes from './pages/Recipes';
import Shopping from './pages/Shopping';
import AddRecipe from './pages/AddRecipe';
import Image from './images/logo.jpeg';
import Recipe from './pages/Recipe';
import Image2 from './images/img.jpg'
import Image3 from './images/copyright.png';

function App() {
  const { pathname } = useLocation();
  return (
    <>
      <img src={Image} alt="logo" style={{ width: 120, left: 20, top: 40, position: 'absolute' }}></img>
      <div className="App">
        <Header />
        <hr />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signUp" element={<Signin />}></Route>
          <Route path="/homePage" element={<HomePage />}></Route>
          <Route path="/recipe" element={<Recipes />}></Route>
          <Route path="/myrecipe" element={<Recipes />}></Route>
          <Route path="/recipe/add" element={<AddRecipe />}></Route>
          <Route path="/recipe/edit" element={<AddRecipe />}></Route>
          <Route path='/recipeDetailes' element={<Recipe />}></Route>

          <Route path="/shopping" element={<Shopping />}></Route>
        </Routes>
        {pathname === "/" ?
          <img src={Image2} style={{ width: 1000 }} alt='open img'></img> : null}
      </div>

      <div id="copyright">
        <p> ruth0533137873@gmail.com כל הזכויות שמורות לרות הרשלר</p>
        <img src={Image3} id="copyright_img" />

      </div>

    </>
  );
}

export default App;
