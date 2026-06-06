import { BrowserRouter } from "react-router-dom" 
import "./styles/Main.scss"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import AnimatedRoutes from "./pages/AnimatedRoutes"


function App() {

  return (
    <BrowserRouter>
      
      <Navbar />

        <AnimatedRoutes />

      <Footer />

    </BrowserRouter>
  )
}

export default App
