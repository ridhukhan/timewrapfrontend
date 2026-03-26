
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./component/Navbar"
import MensWatch from "./pages/MensWatch"
import WatchDetails from "./pages/WatchDetails"
function App() {

  return (
   <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/mens" element={<MensWatch/>}/>
    <Route path="/watch-details" element={<WatchDetails/>}/>

  </Routes>
  </BrowserRouter>
   </>
  )
}

export default App
