

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";
import api from "../utils/api";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/payments")
      .then((res) => setAppointments(res.data))
      .catch(() => console.error("Failed to fetch appointments"));
  }, []);

  return (
    <>
      <Navbar />
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Your Appointments</h1>
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-gray-700">
            <thead className="bg-blue-50">
              <tr className="text-left">
                <th className="p-2 border">Doctor</th>
                <th className="p-2 border">Date & Time</th>
                <th className="p-2 border">Fee</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id} className={`border-b ${a.status === "failed" ? "bg-red-50" : ""}`}>
                  <td className="p-2 border">{a.doctor || "N/A"}</td>
                  <td className="p-2 border">{a.time ? new Date(a.time).toLocaleString() : "N/A"}</td>
                  <td className="p-2 border">₹{a.amount}</td>
                  <td className="p-2 border">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      a.status === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {appointments.length === 0 && (
            <p className="text-center text-gray-500 mt-4">No appointments yet.</p>
          )}
        </div>
      </Layout>
    </>
  );
}

