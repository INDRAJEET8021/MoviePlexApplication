import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const RegisterPage = ({ onClose }) => {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const modalRef = useRef(null);
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [onClose]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      // http://localhost:5000 to run on Loal Host
      const response = await axios.post("https://movieplexapplication.onrender.com/register", {
        username,
        email,
        password,
      });

      const data = response.data;

      // Check if registration was successful
      if (data.success) {
        setSuccess(data.message);
      } else {
        throw new Error(data.error || "Register failed");
      }

      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error("Register Error:", error.message); // Log error to console

      // If the error response from the backend contains a specific message (like "Email already exists")
      setError(
        error.response?.data?.error ||
          error.message ||
          "Something went wrong, please try again."
      );
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✖
        </button>

        {/* Login Form */}
        <h1 className="text-2xl mb-4 text-center text-black">Sign up</h1>
        {
          <form className="flex flex-col" onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={username}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded mb-2 px-2 py-1 text-black"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded mb-2 px-2 py-1 text-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded mb-2 px-2 py-1 text-black"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
            >
              Register
            </button>
          </form>
        }

        {error && <p className="text-red-500 mt-2 font-medium">⚠️ {error}</p>}
        {/* Display success message */}
        {success && (
          <p className="text-green-500 mt-2 font-medium">✅ {success}</p>
        )}
        <p className="mt-4 text-center text-black">
          Already have an account?{" "}
          <button onClick={onClose} className="text-blue-600">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
