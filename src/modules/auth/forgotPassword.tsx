"use client";

import { useState } from "react";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(isValid || value === "" ? "" : "Invalid Email address");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (emailError || !email) return;
    setLoading(true);
    // TODO: wire up forgot password API
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
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

      {/* ── Right panel ── */}
      <div className="flex flex-col items-center justify-center bg-white w-[50vw] h-[100vh] px-[4vw]">
        <div className="w-[25vw]">
          {/* Heading */}
          {!sent && (
            <div className="mb-[4vh] text-center">
              <h1 className="text-[#1A2A4F] text-[2.2vw] font-bold tracking-tight">
                Forgot Password?
              </h1>
              <p className="text-gray-400 text-[1vw] mt-[1vh]">
                Don't worry! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
          )}

          {sent ? (
            <div className="flex flex-col items-center text-center gap-[3vh] w-[25vw]">
              <div>
                <h1 className="text-[#1A2A4F] text-[2.2vw] font-bold tracking-tight">
                  Check Your Email
                </h1>
                <p className="text-gray-400 text-[1vw] mt-[1vh] leading-relaxed w-[30vw]">
                  We've sent a password reset link to your email address.<br />
                  Please check your inbox and follow the instructions.
                </p>
              </div>
              <svg width="199" height="195" viewBox="0 0 199 195" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[12vw] h-[12vw]">
                <path d="M197.886 1.56257C197.588 1.04626 197.149 0.625992 196.62 0.351351C196.09 0.0767096 195.494 -0.0408419 194.9 0.0125675L119.797 6.76491C119.135 6.82435 118.51 7.09286 118.012 7.53152C117.513 7.97019 117.167 8.55619 117.025 9.20458C116.882 9.85296 116.949 10.53 117.217 11.1376C117.484 11.7452 117.939 12.2517 118.514 12.5837L147.284 29.1915C146.186 29.8705 145.073 30.5235 143.944 31.1501C143.219 31.5513 142.683 32.2242 142.454 33.0207C142.225 33.8172 142.321 34.6721 142.723 35.3973C143.124 36.1225 143.797 36.6586 144.593 36.8877C145.39 37.1168 146.245 37.0201 146.97 36.6188C147.536 36.3047 148.098 35.9841 148.657 35.6571L148.655 64.7903C148.655 65.6191 148.984 66.4139 149.57 67C150.156 67.5862 150.951 67.9157 151.779 67.9161C152.28 67.9161 152.774 67.7955 153.219 67.5647C153.664 67.3338 154.047 66.9993 154.335 66.5895L197.736 4.92351C198.079 4.43605 198.276 3.8606 198.302 3.26507C198.329 2.66953 198.185 2.07879 197.887 1.56257H197.886ZM181.341 7.50671L151.783 24.5719L130.188 12.1059L181.341 7.50671ZM154.908 29.9844L184.466 12.9192L154.906 54.9192L154.908 29.9844ZM141.445 114.572L127.493 102.948V65.511C127.493 61.2356 124.015 57.7571 119.739 57.7571H34.8442C30.5688 57.7571 27.0903 61.2352 27.0903 65.511V102.948L13.1387 114.572C10.5477 116.73 9.17817 119.653 9.17817 123.025V183.586C9.17817 189.653 14.1141 194.589 20.1809 194.589H134.402C140.469 194.589 145.404 189.654 145.404 183.587V123.025C145.404 119.702 143.998 116.7 141.445 114.572H141.445ZM104.31 145.699L139.155 124.847V183.468L104.31 145.699ZM136.895 118.916L127.493 124.542V111.083L136.895 118.916ZM34.8442 64.0071H119.739C120.138 64.0075 120.52 64.1661 120.802 64.448C121.084 64.73 121.243 65.1123 121.243 65.511V128.282L79.7317 153.124C78.159 154.065 76.4246 154.066 74.8512 153.124L33.3403 128.283V65.511C33.3407 65.1123 33.4993 64.73 33.7812 64.448C34.0632 64.1661 34.4454 64.0075 34.8442 64.0071ZM15.4286 183.468V124.847L50.2735 145.699L15.4286 183.468ZM27.0903 124.542L17.6887 118.916L27.0903 111.083V124.542V124.542ZM20.1813 188.339C19.9457 188.339 19.7164 188.316 19.4899 188.282L55.752 148.977L71.6414 158.486C73.4106 159.545 75.3512 160.074 77.2918 160.074C79.2325 160.074 81.1727 159.545 82.9414 158.486L98.8313 148.977L135.094 188.282C134.868 188.316 134.638 188.339 134.403 188.339H20.1813Z" fill="#FE6E39"/>
              </svg>
              <button
                type="button"
                onClick={() => window.location.href = "/login"}
                className="w-full py-[1.6vh] rounded-[1.86vw] bg-[rgba(26,42,79,1)] text-white text-[0.9vw] font-semibold tracking-wide transition hover:bg-[#1a2a4f]/90 active:scale-[0.98] mt-[4vh]"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-[1.38vh]">
            {/* Email */}
            <div className="flex flex-col gap-[1.38vh]">
              <label
                htmlFor="email"
                className="block text-[0.9vw] font-medium text-[#1A2A4F]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                placeholder="James123@gmail.com"
                className={`w-[25vw] h-[5.2vh] px-[0.93vw] py-[1.38vh] rounded-[1.86vw] border-[0.08vw] text-[0.9vw] text-gray-800 placeholder-gray-300 bg-gray-50 outline-none transition focus:bg-white focus:ring-2 ${
                  emailError
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/10"
                    : "border-gray-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]/10"
                }`}
              />
              {emailError && (
                <p className="text-red-500 text-[0.75vw]">{emailError}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-[1.6vh] rounded-[1.86vw] bg-[rgba(26,42,79,1)] text-white text-[0.9vw] font-semibold tracking-wide transition hover:bg-[#1a2a4f]/90 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-[0.5vw] mt-[8vh]"
            >
              {loading ? (
                <>
                  <svg className="w-[1vw] h-[1vw] animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Sending…
                </>
              ) : (
                "Send"
              )}
            </button>
          </form>
          )}
        </div>
      </div>
    </div>
  );
}