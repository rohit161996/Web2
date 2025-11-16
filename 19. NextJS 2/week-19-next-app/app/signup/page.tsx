"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-950 to-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-slate-900/70 border border-slate-800 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)] backdrop-blur-xl p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-50 tracking-tight">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign up to continue to your dashboard.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-slate-200"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-slate-100 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 placeholder:text-slate-500"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2.5 text-slate-100 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/40 placeholder:text-slate-500"
            />
          </div>

          <button
            className="mt-3 w-full inline-flex items-center justify-center rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900 active:scale-[0.99] cursor-pointer"
            onClick={async () => {
              await axios.post("/api/v1/signup", {
                username,
                password,
              });

              router.push("/signin");
            }}
          >
            Sign Up
          </button>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <button
            className="text-indigo-400 hover:text-indigo-300 font-medium underline-offset-2 hover:underline cursor-pointer"
            type="button"
            onClick={() => router.push("/signin")}
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
