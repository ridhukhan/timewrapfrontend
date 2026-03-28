
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./component/Navbar"
import MensWatch from "./pages/MensWatch"
import WatchDetails from "./pages/WatchDetails"
import Login from "./pages/Login";
import Register from "./pages/Register";
import {Toaster} from "sonner"
import AdminDashboard from "./pages/AdminDashboard"
function App() {

  return (
   <>
  <BrowserRouter>
  <Navbar/>
  <Toaster richColors position="top-center"/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/mens" element={<MensWatch/>}/>
    <Route path="/watch-details" element={<WatchDetails/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
<Route path="/admin/dashboard" element={<AdminDashboard/>}/>

  </Routes>
  </BrowserRouter>
   </>
  )
}

export default App
