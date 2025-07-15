import React from 'react';

export default function ForgotPassword() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-2xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Forgot <span className="text-blue-600">Password</span>
        </h2>
        <p className="text-center text-sm text-gray-600">
          Enter your registered email. We’ll send you a link to reset it.
        </p>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Send Reset Link
        </button>
      </div>
    </div>
  );
}
