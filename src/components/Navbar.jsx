import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  const [showDropdown, setShowDropdown] = useState(false);
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/book" className="text-xl font-bold text-blue-600 flex items-center gap-1">
            🩺 <span>DocBooking</span>
          </Link>

          {/* Avatar Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="w-10 h-10 bg-blue-500 text-white rounded-full font-bold flex items-center justify-center hover:opacity-90 focus:outline-none"
            >
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border p-4 z-50 space-y-3 animate-dropdown">
                {/* Nav Links */}
                <DropdownItem to="/book" active={isActive("/book")}>
                  Book Appointment
                </DropdownItem>
                <DropdownItem to="/appointments" active={isActive("/appointments")}>
                  Appointments
                </DropdownItem>
                {/* <DropdownItem to="/profile" active={isActive("/profile")}>
                  Profile
                </DropdownItem> */}

                <hr className="border-gray-200" />

                {/* User Info + Logout */}
                <div className="text-sm space-y-1">
                  <p className="font-semibold text-gray-800">{user.name || "User"}</p>
                  <p className="text-gray-500">{user.email || "you@example.com"}</p>
                </div>

                <button
                  onClick={handleLogout}
                  className="text-red-600 w-full text-left text-sm hover:underline font-medium pt-2"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function DropdownItem({ to, children, active }) {
  return (
    <Link
      to={to}
      className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
        active ? "text-white bg-blue-600" : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
}
