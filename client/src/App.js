// import logo from './logo.svg';

// import "./App.scss"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Register from './pages/Register'
import Login from './pages/Login'
import Single from './pages/Single'
import Write from './pages/Write'
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './pages/Home';
// import "./APP"
// import './Styles.scss'
import "./style.scss"

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path:"/",
        element:<Home/>
      },
      {
        path:"/post/:id",
        element:<Single/>
      },
      {
        path:"/write",
        element:<Write/>
      }
    ]
  },
  {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
 

]);
function App() {
  return (
    <div className="app">
      <div className="container">

     <RouterProvider router={router}/>
      </div>
    </div>
  );
}


export default App;
