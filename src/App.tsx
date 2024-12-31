import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import './App.css'

function App() {
  // App.tsx file is like the picture frame that holds the 
  // different pages (eg home).
  // The different pages are like pictures in the frame

  return (
    <BrowserRouter>
      <Routes>
        {/* This route with path="/" is the default/home page */}
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
