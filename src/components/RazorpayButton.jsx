import api from "../utils/api";

export default function RazorpayButton({ amount }) {
  const loadRazorpay = (src) =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayment = async () => {
    const loaded = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!loaded) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    try {
      const { data: order } = await api.post("/orders", { amount });

      const options = {
        key: rzp_test_62Lm5PfRy1usTu,
        amount: order.amount,
        currency: "INR",
        name: "Your App",
        description: "Test Transaction",
        order_id: order.id,
        handler: async (response) => {
          const res = await api.post("/verify", response);
          alert(res.data.message);
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
        },
        theme: { color: "#00bcd4" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment failed:", err);
      alert("Error initiating payment");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
    >
      Pay ₹{amount} Now
    </button>
  );
}
