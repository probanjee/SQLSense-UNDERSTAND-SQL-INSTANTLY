"use client";

import Link from "next/link";
import Layout from "@/components/Layout";

export default function SignIn() {
  return (
    <Layout currentPage="/sign-in">
      <div className="bg-gray-50 min-h-[calc(100vh-200px)] flex items-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div
              className="border-4 border-black bg-white p-8"
              style={{ boxShadow: "8px 8px 0px #111111" }}
            >
              <h1 className="text-3xl font-bold mb-2">SIGN IN</h1>
              <p className="text-muted-foreground mb-8">
                Welcome back to SQLSense
              </p>

              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                {/* Email */}
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    className="w-4 h-4 border-2 border-black cursor-pointer"
                  />
                  <label
                    htmlFor="remember"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    Remember me
                  </label>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="border-4 border-primary bg-primary text-white font-bold uppercase text-sm px-6 py-3 w-full transition-transform duration-150 ease-out cursor-pointer"
                  style={{ boxShadow: "8px 8px 0px #6D28D9" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "4px 4px 0px #6D28D9";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "8px 8px 0px #6D28D9";
                  }}
                >
                  SIGN IN
                </button>
              </form>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 border-t-2 border-gray-200"></div>
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  Or
                </span>
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>

              {/* Social Sign In */}
              <div className="space-y-3">
                <button
                  className="border-4 border-black bg-white text-black font-bold uppercase text-sm px-6 py-3 w-full transition-transform duration-150 ease-out cursor-pointer"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "4px 4px 0px #111111";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "8px 8px 0px #111111";
                  }}
                >
                  SIGN IN WITH GITHUB
                </button>
                <button
                  className="border-4 border-black bg-white text-black font-bold uppercase text-sm px-6 py-3 w-full transition-transform duration-150 ease-out cursor-pointer"
                  style={{ boxShadow: "8px 8px 0px #111111" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "4px 4px 0px #111111";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "8px 8px 0px #111111";
                  }}
                >
                  SIGN IN WITH GOOGLE
                </button>
              </div>

              {/* Sign Up Link */}
              <p className="text-center text-sm mt-6">
                Don't have an account?{" "}
                <Link
                  href="/sign-up"
                  className="font-bold text-primary hover:underline"
                >
                  Sign Up
                </Link>
              </p>

              {/* Forgot Password Link */}
              <p className="text-center text-sm mt-2">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Forgot password?
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
