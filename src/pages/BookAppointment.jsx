import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Layout from "../components/Layout";

export default function BookAppointment() {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [mobile, setMobile] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const doctorFees = {
    "Dr. A": 500,
    "Dr. B": 400,
  };

  const handlePayment = async () => {
    // ✅ Frontend-only validation
    if (!patientName || !age || !gender || !doctor || !appointmentTime || !mobile) {
      return toast.error("Please fill all fields before proceeding.");
    }

    if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      return toast.error("Enter a valid 10-digit mobile number.");
    }

    const amount = doctorFees[doctor];

    try {
      const res = await api.post("/orders", { amount });
      const { id, currency, amount: amt } = res.data.data;

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amt,
        currency,
        order_id: id,
        name: "Doctor Appointment",
        description: `Booking with ${doctor}`,
        handler: async (response) => {
          try {
            const verifyRes = await api.post("/verify", {
              ...response,
              amount,
              mobile,
              doctor,
              time: appointmentTime,
              // ⚠️ Not saved to DB, but available in local/frontend
              patientName,
              age,
              gender,
            });

            if (verifyRes.data.message === "Payment verified successfully") {
              toast.success("🎉 Appointment Booked!");
              setTimeout(() => navigate("/appointments"), 1500);
            } else {
              toast.error("❌ Verification failed");
              setTimeout(() => navigate("/appointments"), 1500);
            }
          } catch {
            toast.error("❌ Error verifying payment");
            navigate("/failure");
          }
        },
        prefill: { contact: mobile },
        theme: { color: "#0ea5e9" },
      };

      const rzp = new window.Razorpay(options);

      // Razorpay failure handling
      rzp.on("payment.failed", async (response) => {
        toast.error("❌ Payment Failed");

        try {
          await api.post("/verify", {
            razorpay_order_id: response.error.metadata.order_id,
            razorpay_payment_id: response.error.metadata.payment_id,
            razorpay_signature: "",
            amount,
            mobile,
            doctor,
            time: appointmentTime,
          });
          navigate("/appointments");
        } catch (err) {
          console.error("Failed to log failed payment:", err);
          navigate("/appointments");
        }
      });

      rzp.open();
    } catch (err) {
      toast.error("Payment initiation failed");
    }
  };

  return (
    <>
      <Navbar />
      <Layout>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">Book a Doctor Appointment</h1>

          <div className="space-y-4 mb-8">
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter patient's full name"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Enter age"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <select
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            >
              <option value="">Select Doctor</option>
              <option value="Dr. A">Dr. A – Cardiologist – ₹500</option>
              <option value="Dr. B">Dr. B – Dermatologist – ₹400</option>
            </select>

            <input
              type="datetime-local"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />

            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Enter mobile number"
              className="w-full px-4 py-2 border rounded-lg"
            />

            <button
              onClick={handlePayment}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Book & Pay
            </button>
          </div>
        </div>
      </Layout>
    </>
  );
}
