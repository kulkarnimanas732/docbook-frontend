import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "User", email: "you@example.com" });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <>
      <Navbar />
      <Layout>
        <div className="flex justify-center">
          <div className="relative text-center">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-24 h-24 bg-blue-600 text-white text-4xl font-bold flex items-center justify-center rounded-full mb-6 focus:outline-none"
              aria-label="Toggle user menu"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>

            {showDropdown && (
              <div className="absolute mt-2 right-0 w-60 bg-white shadow rounded-lg border text-left z-50">
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
                <hr />
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 focus:outline-none"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
}

