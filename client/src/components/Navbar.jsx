// Dependencies
import { Link } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// UI Components
import UpdatesPanel from "./UpdatesPanel";
import MobileMenu from "./MobileMenu"

import { useContext } from "react";
import { FetchedUserDataContext } from "../context/FetchedUserData";  // Context for user data

function Navbar(){
const API = import.meta.env.VITE_API_URL;

const { user } = useContext(FetchedUserDataContext);  // Get user data from context

console.log("Navbar rendered");

// Tailwind class constants
const navBase = "relative group transition duration-300";
const navInactive = "text-gray-300 hover:text-[#5FBFF9]";
const navActive = "text-[#5FBFF9] font-semibold";


const navigate = useNavigate();  // For programmatic navigation on search results

const getInitials = (name) =>  // Convert a name like "John Doe" to "JD"
  name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase();

// ===================================================== UI states ======================================================

// UI States
const [open, setOpen] = useState(false);  // Updates panel
const [Menu, setMenu] = useState(false);  // Mobile menu
useEffect(() => {  // Close menus on scroll or swipe
  const closeOnScroll = () => setMenu(false);
  const closeOnScrollProfile = () => setProfile(false);

  window.addEventListener("scroll", closeOnScroll);
  window.addEventListener("touchmove", closeOnScroll);


  window.addEventListener("scroll", closeOnScrollProfile);
  window.addEventListener("touchmove", closeOnScrollProfile);

  return () => {
    window.removeEventListener("scroll", closeOnScroll);
    window.removeEventListener("touchmove", closeOnScroll);

    window.removeEventListener("scroll", closeOnScrollProfile);
    window.removeEventListener("touchmove", closeOnScrollProfile);
  };
}, []);

const [isDesktop, setIsDesktop] = useState(false);  // Track if we're on desktop for profile hover behavior
useEffect(() => {  // Check initial screen size and listen for resizes
  const handleResize = () => {
    setIsDesktop(window.innerWidth >= 1024);
  };

  handleResize(); // run on mount
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, []);

// Profile
const [profile, setProfile] = useState(false);  // Profile dropdown visibility on hover/click

// ===================================================== UI states ends ===================================================


// ===================================================== APIs ======================================================


const handleDoubleClick = async () => {  // Admin auth on logo double-click
  const pass = prompt("Enter:");

  if (!pass) return;

  try {
    const response = await fetch(`${API}/api/auth/adminAuth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pass }),
    });

    const data = await response.json();

    if (data.success) {
      window.location.href = data.redirectUrl;
    } else {
      alert("Wrong password");
    }
  } catch (error) {
    console.error("Auth error:", error);
  }
};


const [searchText, setSearchText] = useState("");  // Controlled input for search bar
const [wait, setWait] = useState(false);  // Prevent multiple rapid searches
const [error, setError] = useState("");  // Error message for search feedback
const handleSearch = async () => {  // Search API call
  if (!searchText.trim() || wait) return;

  setError("");
  setWait(true);

  try {
    const res = await fetch(`${API}/api/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: searchText }),
    });

    const data = await res.json();

    if (data.success) {
      navigate(data.route);
    } else {
      setError(data.message || "No result found");
    }
  } catch (err) {
    setError("Server error. Try again later.");
  } finally {
    setWait(false);
  }
};

// ===================================================== APIs ends ======================================================

return (
        <>
        <nav className="w-full bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-800 fixed top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">

                {/* Logo & Search */}
                <div className="flex items-center gap-4 sm:gap-6">

                    {/* Logo */}
                    <img
                    src="/ChatGPT Image Feb 5, 2026, 10_28_159 AM.png"
                    alt="CraftDex Logo"
                    className=" h-8 cursor-pointer hover:scale-105 transition-transform duration-300"
                    onDoubleClick={handleDoubleClick}
                    />
                    
                    {/* Search Bar */}
                    <div className="hidden md:flex items-center relative">
                        <input
                        type="text"
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                            if (error) setError("");
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                            e.preventDefault();
                            handleSearch();
                            e.target.blur();
                            }
                        }}
                        placeholder="Search tools, docs..."
                        className="bg-gray-800/40 backdrop-blur-md border border-gray-700 placeholder-gray-400 rounded-full 
                                    px-5 py-1.5 pl-10 w-44 sm:w-56 md:w-64 lg:w-72 
                                    focus:outline-none focus:ring-2 focus:ring-[#5FBFF9] focus:border-[#5FBFF9] 
                                    text-gray-200 shadow-inner transition-all duration-300 
                                    hover:shadow-[0_0_6px_#5FBFF9]"
                        />

                        <i className="fa-solid fa-magnifying-glass text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 text-sm"></i>

                        {/* Optional error message */}
                        {error && searchText.trim() && (
                        <p
                            className="absolute top-full w-50 left-1/2 -translate-x-1/2 mt-4 
                                    px-4 py-1.5 text-xs font-medium text-red-200
                                    bg-red-500/10 backdrop-blur-3xl
                                    border border-red-500/25 rounded-full
                                    shadow-[0_0_18px_rgba(239,68,68,0.35)]
                                    transition-all duration-300 ease-out
                                    animate-fade-in"
                        >
                            {error}
                        </p>
                        )}

                    </div>
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden lg:flex space-x-6 xl:space-x-10 font-medium">

                <NavLink
                    to="/"
                    className={({ isActive }) =>
                    `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    Home
                    <span
                    className={`
                        absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#5FBFF9]
                        transition-all duration-300
                        ${({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    />
                </NavLink>

                <NavLink
                    to={'/tools'}
                    className={({ isActive }) =>
                    `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    Tools
                    <span
                    className={`
                        absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#5FBFF9]
                        transition-all duration-300
                        ${({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    />
                </NavLink>

                <NavLink
                    to="/docs"
                    className={({ isActive }) =>
                    `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    Docs
                    <span
                    className={`
                        absolute left-0 -bottom-1 h-[2px] rounded-full bg-[#5FBFF9]
                        transition-all duration-300
                        ${({ isActive }) => isActive ? "w-full" : "w-0 group-hover:w-full"}
                    `}
                    />
                </NavLink>

                </div>

                {/* Right Section */}
                <div className="flex items-center gap-4 md:gap-9">

                    {/* Update button */}
                    <button
                        onClick={() => setOpen(true)}
                        className="py-2 text-black rounded flex justify-center items-center cursor-pointer"
                    >
                        <i className="fa-solid fa-bell text-xl text-gray-300 hover:text-[#5FBFF9] transition"></i>
                    </button>

                    {/* Auth Button and profile */}
                    {user ? (
                    <div
                        className="relative"
                        onMouseEnter={() => {
                        if (isDesktop) setProfile(true);
                        }}
                        onMouseLeave={() => {
                        if (isDesktop) setProfile(false);
                        }}
                    >
                        {/* Profile Button */}
                        <button
                        onClick={() => setProfile((prev) => !prev)}
                        className="w-10 h-10 flex items-center justify-center rounded-full
                        bg-gray-800 border-2 border-gray-700 cursor-pointer
                        hover:border-[#5FBFF9] transition-all duration-300
                        text-gray-100 font-bold text-sm focus:outline-none"
                        >
                        {getInitials(user.name)}
                        </button>

                        {/* Dropdown */}
                        <div
                        className={`absolute right-0 mt-2 min-w-[180px] max-w-[260px]
                        bg-gray-900/97 backdrop-blur-xl
                        border border-white/10 rounded-xl
                        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
                        p-4 transition-all duration-200 origin-top-right z-50
                        ${profile
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
                        >
                        <div className="flex items-start gap-3">
                            <div
                            className="w-10 h-10 flex items-center justify-center rounded-full
                            bg-gray-800/70 backdrop-blur-md
                            border border-white/10 text-gray-100
                            font-semibold text-sm"
                            >
                            {getInitials(user.name)}
                            </div>

                            <div className="flex flex-col overflow-hidden">
                            <p className="text-gray-100 font-semibold text-sm truncate">
                                {user.name}
                            </p>
                            <p className="text-gray-300 text-xs truncate">
                                {user.email}
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                    ) : (
                    <Link
                        to="/signup"
                        className="hidden sm:block px-5 py-2 rounded-full bg-[#5FBFF9] 
                        text-white font-semibold text-sm hover:bg-[#4aaee0] 
                        hover:shadow-[0_0_8px_#5FBFF9] transition-all duration-300"
                    >
                        Login / Sign up
                    </Link>
                    )}


                    {/* Hamburger Button */}
                    <button
                    className="lg:hidden text-2xl"
                    onClick={() => setMenu(prev => !prev)}
                    >
                    {Menu ? (
                        <i className="fa-solid fa-xmark text-xl text-gray-300"></i>
                    ) : (
                        <i className="fa-solid fa-bars text-xl text-gray-300"></i>
                    )}
                    </button>
                </div>
            </div>
        </nav>

        <UpdatesPanel isOpen={open} onClose={() => setOpen(false)}></UpdatesPanel>

        <MobileMenu
        Menu={Menu}
        setMenu={setMenu}
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        error={error}
        setError={setError}
        />

        </>
)
}

export default React.memo(Navbar);