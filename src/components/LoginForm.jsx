
import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LoginForm({ onSwitchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/login", form);
      localStorage.setItem("token", res.data.token);
    //   localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(res.data.user)); // store user

      toast.success("🎉 Login successful");
      navigate("/book");
    } catch (err) {
      toast.error("❌ Invalid credentials");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 border rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Log In
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <button onClick={onSwitchToSignup} className="text-blue-600 hover:underline">
          Sign Up
        </button>
      </p>
    </div>
  );
}
