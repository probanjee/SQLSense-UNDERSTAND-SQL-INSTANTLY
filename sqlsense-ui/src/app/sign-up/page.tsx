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
  signUpSchema,
} from "@/features/auth/validation";
import { toast } from "sonner";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && !authLoading) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    const validated = signUpSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
      terms,
    });
    if (!validated.success) {
      toast.error(getFirstValidationMessage(validated.error));
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: validated.data.email,
        password: validated.data.password,
        options: {
          data: {
            full_name: validated.data.fullName,
          },
        },
      });

      if (error) {
        toast.error(
          getSafeAuthErrorMessage(
            error,
            "Unable to create the account. Please try again.",
          ),
        );
      } else {
        if (data.session === null) {
          toast.success("Registration successful! Please check your email to verify your account.");
          router.push("/sign-in");
        } else {
          toast.success("Account created successfully!");
          router.push("/dashboard");
        }
      }
    } catch (error: unknown) {
      toast.error(
        getSafeAuthErrorMessage(
          error,
          "Unable to create the account. Please try again.",
        ),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignUp = async (provider: "github" | "google") => {
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
          `Unable to sign up with ${provider}. Please try again.`,
        ),
      );
    }
  };

  return (
    <Layout currentPage="/sign-up">
      <div className="bg-gray-50 min-h-[calc(100vh-200px)] flex items-center py-12">
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

              <form className="space-y-6" onSubmit={handleSignUp}>
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="sign-up-full-name"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    suppressHydrationWarning
                    id="sign-up-full-name"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    maxLength={100}
                    placeholder="John Doe"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="sign-up-email"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Email
                  </label>
                  <input
                    suppressHydrationWarning
                    id="sign-up-email"
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
                    htmlFor="sign-up-password"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Password
                  </label>
                  <input
                    suppressHydrationWarning
                    id="sign-up-password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    maxLength={72}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label
                    htmlFor="sign-up-confirm-password"
                    className="block text-sm font-bold uppercase mb-2"
                  >
                    Confirm Password
                  </label>
                  <input
                    suppressHydrationWarning
                    id="sign-up-confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    maxLength={72}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="border-4 border-black bg-white w-full px-4 py-3 text-base font-sans focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <input
                    suppressHydrationWarning
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={terms}
                    onChange={e => setTerms(e.target.checked)}
                    className="w-4 h-4 border-2 border-black cursor-pointer mt-1"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-semibold cursor-pointer select-none"
                  >
                    I agree to the Terms of Service and Privacy Policy
                  </label>
                </div>

                {/* Sign Up Button */}
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
                  {loading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
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
                  suppressHydrationWarning
                  onClick={() => handleSocialSignUp("github")}
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
                  suppressHydrationWarning
                  onClick={() => handleSocialSignUp("google")}
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
