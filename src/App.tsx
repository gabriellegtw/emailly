import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Collection from './pages/Collection'
import './App.css'
import { ToastContainer } from 'react-toastify';  // ✅ Import ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // ✅ Import default styles

function App() {
  // App.tsx file is like the picture frame that holds the 
  // different pages (eg home).
  // The different pages are like pictures in the frame

  return (
    <BrowserRouter>
    <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* This route with path="/" is the default/home page */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
