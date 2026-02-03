import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import { useNavigate } from "react-router-dom";

export default function AdminAuth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      navigate("/admin/dashboard");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      navigate("/admin/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setError("Check your email for confirmation link!");
      setMode("login");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-cream-dark px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 border border-brand-primary/10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-brand-primary mb-2">
            🎨 RyaSketchbook Admin
          </h1>
          <p className="text-brand-primary/70">
            {mode === "login"
              ? "Sign in to your account"
              : "Create admin account"}
          </p>
        </div>

        {error && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              error.includes("Check your email")
                ? "bg-brand-accent-light text-brand-primary border border-brand-accent/50"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            <p className="text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={mode === "login" ? handleLogin : handleSignup}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-primary mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-brand-primary/20 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition"
                placeholder="admin@ryasketchbook.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-primary mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-3 border border-brand-primary/20 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-brand-accent outline-none transition"
                placeholder="••••••••"
              />
              {mode === "signup" && (
                <p className="text-xs text-brand-primary/60 mt-1">
                  Minimum 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-brand-primary text-white py-3 rounded-xl font-semibold hover:bg-brand-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : mode === "login" ? (
                "Sign In"
              ) : (
                "Create Account"
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setMode(mode === "login" ? "signup" : "login");
              setError("");
            }}
            className="text-brand-primary hover:text-brand-primary-dark text-sm font-medium"
          >
            {mode === "login"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>

        {mode === "login" && (
          <div className="mt-4 text-center">
            <button
              onClick={async () => {
                if (!email) {
                  setError("Please enter your email first");
                  return;
                }
                const { error } = await supabase.auth.resetPasswordForEmail(
                  email,
                  {
                    redirectTo: `${window.location.origin}/admin/reset-password`,
                  },
                );
                if (error) {
                  setError(error.message);
                } else {
                  setError("Check your email for password reset link!");
                }
              }}
              className="text-brand-primary/70 hover:text-brand-primary text-xs"
            >
              Forgot password?
            </button>
          </div>
        )}

        <div className="mt-8 text-center border-t border-brand-primary/10 pt-6">
          <a
            href="/"
            className="text-brand-primary/70 hover:text-brand-primary text-sm flex items-center justify-center"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
