import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Layout from "./components/Layout"
import Public from "./components/Public/Public"
import RequireAuth from "./features/auth/RequireAuth"
import NotFound from "./pages/NotFound/NotFound"



function App() {


  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path='/' element={<Layout />}>
            {/* public routes */}
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register/>} />
            {/* protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="home" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
