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


import { FetchedUserDataProvider } from './context/FetchedUserData'  // Context Provider for user data
import { FetchedNotificationProvider } from './context/FetchedNotification'  // Context Provider for notifications
<<<<<<< HEAD
import { ButtonStateOnUserStateProvider } from './context/ButtonStateOnUserState'  // Context Provider for button state
=======
import { ButtonStateOnUsersProvider } from './context/ButtonStateOnUsers'  // Context Provider for button state on users
>>>>>>> b3a2747a207556515983ac7508697243152a709a

// Tools Pages
import ImageToPdf from './pages/Tools_Pages/ImageToPdf'

function App() {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-950">

<<<<<<< HEAD
    <ButtonStateOnUserStateProvider>
      <FetchedNotificationProvider>
        <FetchedUserDataProvider>
          <BrowserRouter>
            {/* Handel scroll */}
            <ScrollToTop />
              <Routes>
                {/* Home Page */}
                <Route path="/" element={<Home />} />
=======
      <ButtonStateOnUsersProvider>
        <FetchedNotificationProvider>
          <FetchedUserDataProvider>
            <BrowserRouter>
              {/* Handel scroll */}
              <ScrollToTop />
                <Routes>
                  {/* Home Page */}
                  <Route path="/" element={<Home />} />
>>>>>>> b3a2747a207556515983ac7508697243152a709a

                  {/* Home Page */}
                  <Route path="/tools" element={<Tools />} />

                  {/* Home Page */}
                  <Route path="/docs" element={<Docs />} />

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

<<<<<<< HEAD
                {/* --------------------------------------- Tools Pages -------------------------------------------------- */}

                {/* Image to PDF converter Page */}
                <Route path="/imageToPdf" element={<ImageToPdf />} />
              </Routes>
          </BrowserRouter>
        </FetchedUserDataProvider>
      </FetchedNotificationProvider>
    </ButtonStateOnUserStateProvider>
=======
                  {/* --------------------------------------- Tools Pages -------------------------------------------------- */}
>>>>>>> b3a2747a207556515983ac7508697243152a709a

                  {/* Image to PDF converter Page */}
                  <Route path="/imageToPdf" element={<ImageToPdf />} />
                </Routes>
            </BrowserRouter>
          </FetchedUserDataProvider>
        </FetchedNotificationProvider>
      </ButtonStateOnUsersProvider>
      
    </div>
  )
}

export default React.memo(App);
