"use client";

import { useState } from "react";
import Image from "next/image";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [authError, setAuthError] = useState("");

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid || value === "" ? "" : "Invalid Email address");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (emailError) return;
    setLoading(true);
    // TODO: wire up auth API — on failure call:
    // setAuthError("Incorrect username or password. Please try again.");
    await new Promise((r) => setTimeout(r, 1200));
    setAuthError("Incorrect username or password. Please try again.");
    setLoading(false);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* ── Left brand panel ── */}
      <div className="hidden lg:flex lg:w-[50vw] bg-[#FF6B35] items-center justify-center">
        <Image
          src="/splash_screen.svg"
          alt="TravelPriceSafe"
          width={960}
          height={1080}
          className="w-[42vw] h-[90vh] object-contain"
          priority
        />
      </div>

      {/* ── Right login panel ── */}
      <div className="flex flex-col items-center justify-center bg-white w-[50vw] h-[100vh] px-[4vw]">
        {/* Mobile-only logo */}
        <div className="flex lg:hidden items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-full bg-[#FF6B35] flex items-center justify-center">
            <svg viewBox="310 475 110 135" className="w-5 h-5" fill="none">
              <path
                d="M363.822 488.332L372.473 515.986C372.863 517.214 372.658 518.513 371.98 519.563C372.665 519.114 373.464 518.878 374.283 518.878C374.712 518.878 375.141 518.942 375.563 519.07L403.217 527.727L375.563 536.384C375.141 536.518 374.705 536.582 374.283 536.582C373.464 536.582 372.671 536.339 371.98 535.891C372.658 536.94 372.863 538.239 372.473 539.468L363.822 567.121L355.165 539.468C354.781 538.239 354.979 536.94 355.657 535.891C354.973 536.339 354.173 536.582 353.354 536.582C352.932 536.582 352.497 536.518 352.081 536.384L324.421 527.727L352.081 519.07C352.497 518.942 352.932 518.878 353.354 518.878C354.173 518.878 354.973 519.114 355.657 519.563C354.979 518.513 354.781 517.214 355.165 515.986L363.822 488.332Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="text-[#1A2A4F] font-bold text-lg tracking-tight">
            TravelPriceSafe
          </span>
        </div>

        <div className="w-[25vw]">
          <div className="mb-[4vh] text-center">
            <h1 className="text-[#1A2A4F] text-[2.2vw] font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="text-gray-400 text-[1vw] mt-[1vh] whitespace-nowrap">
              We missed you! Please enter your details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[1.38vh]">
            {/* Email */}
            <div className="flex flex-col gap-[1.38vh]">
              <label
                htmlFor="email"
                className="block text-[0.9vw] font-medium text-[#1A2A4F]"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); validateEmail(e.target.value); }}
                placeholder="you@company.com"
                className={`w-[25vw] h-[5.2vh] px-[0.93vw] py-[1.38vh] rounded-[1.86vw] border-[0.08vw] text-[0.9vw] text-gray-800 placeholder-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:ring-2 ${
                  emailError
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                    : "border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]/10"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-[0.75vw] mt-[0.4vh]">{emailError}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[1.38vh]">
              <div className="flex items-center">
                <label
                  htmlFor="password"
                  className="block text-[0.9vw] font-medium text-[#1A2A4F]"
                >
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-[25vw] h-[5.2vh] px-[0.93vw] py-[1.38vh] pr-[3vw] rounded-[1.86vw] border-[0.08vw] border-gray-200 text-[0.9vw] text-gray-800 placeholder-gray-300 bg-gray-50 outline-none transition focus:border-[#FF6B35] focus:bg-white focus:ring-2 focus:ring-[#FF6B35]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[1vw] top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg
                      className="w-[1.2vw] h-[1.2vw]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      className="w-[1.2vw] h-[1.2vw]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
              {authError && (
                <p className="text-red-500 text-[0.75vw] font-medium mt-[0.4vh]">{authError}</p>
              )}
              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-[0.8vw] text-[#FF6B35] font-medium hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-[1.6vh] rounded-[1.86vw] bg-[rgba(26,42,79,1)] text-white text-[0.9vw] font-semibold tracking-wide transition hover:bg-[#1a2a4f]/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-[0.5vw] mt-[4vh]"
            >
              {loading ? (
                <>
                  <svg className="w-[1vw] h-[1vw] animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    />
                  </svg>
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          
        </div>
      </div>
    </div>
  );
}