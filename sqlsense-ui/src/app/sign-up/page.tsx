"use client";

import Link from "next/link";
import Layout from "@/components/Layout";

export default function SignUp() {
  return (
    <Layout currentPage="/sign-up">
      <div className="bg-gray-50 min-h-[calc(100vh-200px)] flex items-center">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div
              className="border-4 border-black bg-white p-8"
              style={{ boxShadow: "8px 8px 0px #111111" }}
            >
              <h1 className="text-3xl font-bold mb-2">SIGN UP</h1>
              <p className="text-muted-foreground mb-8">
                Join SQLSense and master SQL
              </p>

              <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

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

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-bold uppercase mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 border-2 border-black cursor-pointer mt-1"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-semibold cursor-pointer"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                {/* Sign Up Button */}
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
                  CREATE ACCOUNT
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

              {/* Social Sign Up */}
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
                  SIGN UP WITH GITHUB
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
                  SIGN UP WITH GOOGLE
                </button>
              </div>

              {/* Sign In Link */}
              <p className="text-center text-sm mt-6">
                Already have an account?{" "}
                <Link
                  href="/sign-in"
                  className="font-bold text-primary hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
