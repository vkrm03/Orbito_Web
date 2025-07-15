import React from 'react';

export default function OtpPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Verify <span className="text-blue-600">OTP</span>
        </h2>
        <p className="text-center text-sm text-gray-600">
          Enter the OTP sent to your registered email or mobile number.
        </p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Verify OTP
        </button>

        <p className="text-sm text-center text-gray-600">
          Didn’t receive it? <button className="text-blue-600 hover:underline">Resend</button>
        </p>
      </div>
    </div>
  );
}
