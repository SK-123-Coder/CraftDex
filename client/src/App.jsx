// Dependencies
import { BrowserRouter, Routes, Route } from "react-router-dom"
import React from 'react'

// Configuration
import ScrollToTop from './config/ScrollToTop'

// Pages
import Home from './pages/Home'
import Tools from './pages/Tools'
import Docs from './pages/Docs'
import DocsContent from "./pages/DocsContent"

// Auth Pages
import Signup from './pages/Auth/User.Signup'
import Login from './pages/Auth/User.Login'
import AccountRecover from './pages/Auth/User.Acountrecover'
import AdminPage from './pages/Auth/AdminPage'

// Tools Pages
import ImageToPdf from './pages/Tools_Pages/ImageToPdf'

function App() {
  return (
    <div>
    <BrowserRouter>
      {/* Handel scroll */}
      <ScrollToTop />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home className="fade-box"/>} />

          {/* Home Page */}
          <Route path="/tools" element={<Tools className="fade-box"/>} />

          {/* Home Page */}
          <Route path="/docs" element={<Docs className="animate-fadeIn"/>} />

          {/* Docs Content PAge */}
          <Route path="/docscontent/:category/:id" element={<DocsContent />} />

          {/* --------------------------------------- Auth Pages -------------------------------------------------- */}

          {/* Signup Page */}
          <Route path="/signup" element={<Signup />} />

          {/* Login Page */}
          <Route path="/login" element={<Login />} />

          {/* Account recovery page */}
          <Route path="/accountRecover" element={<AccountRecover />} />

          {/* Admin Page */}
          <Route path="/admin" element={<AdminPage />} />

          {/* --------------------------------------- Tools Pages -------------------------------------------------- */}

          {/* Image to PDF converter Page */}
          <Route path="/imageToPdf" element={<ImageToPdf />} />
        </Routes>
    </BrowserRouter>
    </div>
  )
}

export default React.memo(App);
