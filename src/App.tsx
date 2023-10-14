import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Layout from "./components/Layout"
import Public from "./components/Public/Public"
import RequireAuth from "./features/auth/RequireAuth"
import NotFound from "./pages/NotFound/NotFound"
import TopBar from "./components/topBar/TopBar"
import Settings from "./pages/Settings/Settings"
import SinglePost from "./pages/SinglePost/SinglePost"
import UserProfilePage from "./pages/UserProfile/UserProfilePage"
import SingleComment from "./pages/SingleComment/SingleComment"
import Friends from "./pages/Friends/Friends"
import Chat from "./pages/Chat/Chat"
import Groups from "./pages/Groups/Groups"
function App() {


  return (
    <>
      <Router>
        <TopBar />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path='/' element={<Layout />}>
            {/* public routes */}
            <Route index element={<Public />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            {/* protected Routes */}
            <Route element={<RequireAuth />}>
              <Route path="home" element={<Home />} />
              <Route path="settings" element={<Settings />} />
              <Route path='friends' element={<Friends />} />
              {/* <Route path='groups' element={<Groups />} /> */}
              {/* user profile by id  */}
              <Route path='/userProfile/:usertId' element={<UserProfilePage />} />
              {/* Single Post page route */}
              <Route path='/post/:postId' element={<SinglePost />} />
              {/* Single Comment Page route */}
              <Route path='/comment/:commentId' element={<SingleComment />} />
              {/* chat page  */}
              <Route path='/chat/:userId' element={<Chat />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
