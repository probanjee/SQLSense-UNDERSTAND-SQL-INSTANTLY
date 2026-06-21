"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { supabase } from "@/lib/supabase/client";
import { useAuth } from "@/features/auth/AuthContext";
import {
  getFirstValidationMessage,
  getSafeAuthErrorMessage,
  signInSchema,
} from "@/features/auth/validation";
import { toast } from "sonner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    const validated = signInSchema.safeParse({ email, password });
    if (!validated.success) {
      toast.error(getFirstValidationMessage(validated.error));
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: validated.data.email,
        password: validated.data.password,
      });

      if (error) {
        toast.error(
          getSafeAuthErrorMessage(error, "Unable to sign in. Please try again."),
        );
      } else {
        toast.success("Successfully signed in!");
        router.push("/dashboard");
      }
    } catch (error: unknown) {
      toast.error(
        getSafeAuthErrorMessage(error, "Unable to sign in. Please try again."),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: "github" | "google") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) throw error;
    } catch (error: unknown) {
      toast.error(
        getSafeAuthErrorMessage(
          error,
          `Unable to sign in with ${provider}. Please try again.`,
        ),
      );
    }
  };

  return (
    <Layout currentPage="/sign-in">
      <div className="bg-gray-50 min-h-[calc(100vh-200px)] flex items-center py-12">
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

              <form className="space-y-6" onSubmit={handleSignIn}>
                {/* Email */}
                <div>
                  <label
                    htmlFor="sign-in-email"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Email
                  </label>
                  <input
                    suppressHydrationWarning
                    id="sign-in-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={254}
                    placeholder="your@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="sign-in-password"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Password
                  </label>
                  <input
                    suppressHydrationWarning
                    id="sign-in-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    maxLength={72}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Sign In Button */}
                <button
                  suppressHydrationWarning
                  type="submit"
                  disabled={loading}
                  className="border-4 border-primary bg-primary text-white font-bold uppercase text-sm px-6 py-3 w-full transition-transform duration-150 ease-out cursor-pointer disabled:opacity-50"
                  style={{ boxShadow: "8px 8px 0px #6D28D9" }}
                  onMouseEnter={e => {
                    if (!loading) {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "4px 4px 0px #6D28D9";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!loading) {
                      (e.currentTarget as HTMLElement).style.boxShadow =
                        "8px 8px 0px #6D28D9";
                    }
                  }}
                >
                  {loading ? "SIGNING IN..." : "SIGN IN"}
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
                  suppressHydrationWarning
                  onClick={() => handleSocialSignIn("github")}
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
                  suppressHydrationWarning
                  onClick={() => handleSocialSignIn("google")}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
