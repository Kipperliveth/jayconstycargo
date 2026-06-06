import { useEffect } from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import Home from "./Home"
import About from "./About"
import Contact from "./Contact"
import FAQs from "./FAQs"
import Legal from "./Legal"
import Pricing from "./Pricing"
import Services from "./Services"
import Tracking from "./Tracking"
import NotFound from "./NotFound"


function AnimatedRoutes() {

    const location = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);


  return (
    <AnimatePresence mode="wait">

        <Routes location={location} key={location.pathname}>

            <Route path="/" element={<Home />}/>
            <Route path="*" element={<NotFound />}/>
            <Route path="/about" element={<About />}/>
            <Route path="/contact" element={<Contact />}/>
            <Route path="/faqs" element={<FAQs />}/>
            <Route path="/legal" element={<Legal />}/>
            <Route path="/pricing" element={<Pricing />}/>
            <Route path="/services" element={<Services />}/>
            <Route path="/tracking" element={<Tracking />}/>

        </Routes>

    </AnimatePresence>
  )
}

export default AnimatedRoutes