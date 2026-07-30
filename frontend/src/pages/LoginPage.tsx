import React, { useState, type FormEvent } from "react";
import { useAuth } from "../auth/useAuth";
import toast from "react-hot-toast";

const SERVICES = ["Cleaning", "Pet Care", "Car Wash"];

function PulseGrid() {
  return (
    <div className="grid grid-cols-6 gap-3">
      {Array.from({ length: 24 }).map((_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-brass/40"
          style={{
            animation: `pulse-dot 3.2s ease-in-out infinite`,
            animationDelay: `${(i % 8) * 0.3}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.25; transform: scale(0.85); }
          50% { opacity: 1; transform: scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          span { animation: none !important; opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

const LoginPage = () => {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Signed in");
    } catch {
      toast.error("Invalid email or password");
    }
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-paper">
      {/* Left panel — brand + signature */}
      <div className="hidden lg:flex flex-col justify-between bg-ink text-paper p-12 relative overflow-hidden">
        <div>
          <div className="font-display text-xl font-semibold tracking-tight">
            Suite Life
          </div>
          <div className="mt-1 font-mono text-xs text-brass-light uppercase tracking-widest">
            Operations Console
          </div>
        </div>

        <div className="max-w-sm">
          <h1 className="font-display text-4xl font-medium leading-tight">
            One console.
            <br />
            Every service, every emirate.
          </h1>
          <p className="mt-4 text-sm text-slate leading-relaxed">
            Dispatch, staff, and finance — coordinated in real time across{" "}
            {SERVICES.join(", ")}.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <PulseGrid />
          <span className="font-mono text-xs text-slate">live across UAE</span>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8">
            <div className="font-display text-xl font-semibold text-ink">
              Suite Life
            </div>
            <div className="mt-1 font-mono text-xs text-teal uppercase tracking-widest">
              Operations Console
            </div>
          </div>

          <h2 className="font-display text-2xl font-medium text-ink">
            Sign in
          </h2>
          <p className="mt-1 text-sm text-slate">
            Use your Suite Life staff account.
          </p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-ink"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@suitelife.ae"
                className="mt-1.5 w-full rounded-lg border border-slate/30 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-ink"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1.5 w-full rounded-lg border border-slate/30 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/60 focus:outline-none focus:ring-2 focus:ring-teal/40 focus:border-teal"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-ink py-2.5 text-sm font-medium text-paper transition-colors hover:bg-ink-light disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-brass focus:ring-offset-2"
            >
              {isLoading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-xs text-slate">
            Trouble signing in? Contact your administrator.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
