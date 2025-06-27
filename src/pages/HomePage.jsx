import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { Stethoscope } from "lucide-react"; // optional icon if using Lucide

export default function HomePage() {
    const [showSignup, setShowSignup] = useState(false);

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full flex flex-col items-center text-center space-y-6">
                
                <div className="text-center mb-8">
                    <div className="flex justify-center items-center gap-3">
                        <Stethoscope className="w-8 h-8 text-blue-600" />
                        <span className="text-5xl font-extrabold text-blue-600 tracking-tight">DocBook</span>
                    </div>

                    <h2 className="mt-2 text-gray-600 text-base max-w-xl mx-auto">
                        Easily book doctor appointments and make secure test payments with Razorpay.
                    </h2>
                </div>

                {/* Auth Card */}
                {/* <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-xl border border-blue-100"> */}

                {showSignup ? (
                    <SignupForm onSwitchToLogin={() => setShowSignup(false)} />
                ) : (
                    <LoginForm onSwitchToSignup={() => setShowSignup(true)} />
                )}


                {/* Footer */}
                <p className="text-sm text-gray-500">
                    Powered by <span className="font-semibold text-blue-600">Razorpay Test Mode</span>
                </p>
            </div>
        </main>
    );
}
