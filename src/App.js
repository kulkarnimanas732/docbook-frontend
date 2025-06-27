
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import BookAppointment from "./pages/BookAppointment"; // ✅ was Dashboard
import Appointments from "./pages/Appointments";       // ✅ was Transactions
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import Failure from "./pages/Failure";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookAppointment />} /> {/* ✅ updated */}
        <Route path="/appointments" element={<Appointments />} /> {/* ✅ updated */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} />
      </Routes>
    </Router>
  );
}
