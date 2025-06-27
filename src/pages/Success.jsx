// ✅ Success.jsx with Layout and Navbar
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

export default function Success() {
  return (
    <>
      <Navbar />
      <Layout>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">✅ Payment Successful</h2>
          <p className="text-gray-700 mb-6">Your payment was verified successfully.</p>
          <Link
  to="/appointments" // instead of /dashboard
  className="inline-block text-white bg-green-600 px-4 py-2 rounded hover:bg-green-700"
>
  View Appointments
</Link>

        </div>
      </Layout>
    </>
  );
}
