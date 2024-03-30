import "./App.css"
import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Auth from "./pages/Auth"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" replace={true} />} />
      </Routes>
      <h3 id="message">Thanks for visiting regards <span>Abdul Ahad &copy;</span></h3>
    </>
  )
}

export default App