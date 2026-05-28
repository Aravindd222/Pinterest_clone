
import { useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

const LoginPage = () => {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [mode, setMode] =
    useState("login");

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword,
    setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    if (
      mode === "register" &&
      password !== confirmPassword
    ) {
      alert("Passwords do not match");
      return;
    }

    try {

      setLoading(true);

      if (mode === "login") {

        const response =
          await api.post(
            "/auth/login",
            {
              email,
              password,
            }
          );

        login(response.data);

        navigate("/");

      } else {

        await api.post(
          "/auth/register",
          {
            username,
            email,
            password,
          }
        );

        alert(
          "Account created successfully"
        );

        setMode("login");

        setUsername("");

        setPassword("");

        setConfirmPassword("");

      }

    } catch (error) {

      console.log(error);

      alert(
        mode === "login"
          ? "Invalid credentials"
          : "Registration failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] px-6">

      {/* Ambient Background */}

      <div className="absolute inset-0 overflow-hidden">

        <div className="absolute top-[-200px] left-[-150px] w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[180px]" />

        <div className="absolute bottom-[-200px] right-[-150px] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[180px]" />

      </div>

      {/* Center Glow */}

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">

        <div className="w-[420px] h-[420px] bg-red-500/10 rounded-full blur-[160px]" />

      </div>

      {/* Card */}

      <motion.div

        initial={{
          opacity: 0,
          y: 40,
        }}

        animate={{
          opacity: 1,
          y: 0,
        }}

        transition={{
          duration: 0.5,
        }}

        className="relative z-10 w-full max-w-[480px]"
      >

        <div className="bg-gradient-to-b from-[#141414] to-[#0d0d0d] border border-white/5 rounded-[34px] px-10 py-12 shadow-[0_20px_80px_rgba(0,0,0,0.7)]">

          {/* Header */}

          <div className="mb-10 text-center">

            <h1 className="text-6xl font-black tracking-tight mb-3 leading-none">

              {mode === "login"
                ? "Login"
                : "Register"}

            </h1>

            <p className="text-gray-400 text-lg">

              {mode === "login"
                ? "Welcome back to Pinspired"
                : "Create your account"}

            </p>

          </div>

          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {mode === "register" && (

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
                className="w-full h-16 bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 text-white text-lg outline-none focus:border-red-500/40 focus:bg-[#202020] transition duration-300"
              />

            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full h-16 bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 text-white text-lg outline-none focus:border-red-500/40 focus:bg-[#202020] transition duration-300"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full h-16 bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 text-white text-lg outline-none focus:border-red-500/40 focus:bg-[#202020] transition duration-300"
            />

            {mode === "register" && (

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                className="w-full h-16 bg-[#1a1a1a] border border-white/5 rounded-2xl px-6 text-white text-lg outline-none focus:border-red-500/40 focus:bg-[#202020] transition duration-300"
              />

            )}

            {/* CTA */}

            <motion.button

              whileHover={{
                scale: 1.01,
              }}

              whileTap={{
                scale: 0.98,
              }}

              type="submit"

              disabled={loading}

              className="w-full h-16 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-600 via-red-500 to-orange-500 hover:opacity-95 transition duration-300 shadow-[0_0_35px_rgba(255,60,0,0.25)]"
            >

              {loading
                ? "Please wait..."
                : mode === "login"
                ? "Login"
                : "Create Account"}

            </motion.button>

          </form>

          {/* Toggle */}

          <button
            onClick={() =>
              setMode(
                mode === "login"
                  ? "register"
                  : "login"
              )
            }
            className="w-full mt-8 text-gray-400 hover:text-orange-400 transition text-[15px]"
          >

            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Login"}

          </button>

        </div>

      </motion.div>

    </div>
  );
};

export default LoginPage;
