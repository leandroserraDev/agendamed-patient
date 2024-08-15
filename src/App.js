import logo from './logo.svg';
import './App.css';
import Header from './Header/Header.js'
import Login from './Pages/Auth/Login.js';
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import PrivateRoutes from './Pages/Protected/PrivateRoutes.js';
import PatientPage from './Pages/Patient/PatientCrud/PatientPage.js';
import AuthPage from './Pages/Auth/AuthPage.js';
import Home from './Pages/Home/Home.js'
import ConsultaPage from './Pages/Consultas/ConsultaPage.js';
import FormPage from './Pages/Consultas/Form/FormPage.js';
const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoutes />,
    children:[
      {
        path: "home",
        element: <Home/>
      },
      {
        path: "meus-dados",
        element: <PatientPage/>
      },
    
      {
        path:"consultas",
        element: <ConsultaPage/>
      },
      {
        path:"agendar-consulta",
        element: <FormPage/>
      }
    ]
  },
  
  {
    path: 'auth',
    element: <AuthPage/>
  }
  
]);

function App() {
  return (
    <>
<Header/>
  <RouterProvider router={router}/>

    </>
  );
}

export default App;
