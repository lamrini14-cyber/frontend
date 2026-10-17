"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/admin-api";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      router.push(window.location.pathname.replace(/\/admin$/, "/admin/dashboard"));
    } catch {
      setError("Identifiants incorrects");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1A1A] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#0D6E6E] flex items-center justify-center mx-auto mb-4">
            <Shield size={28} className="text-[#D4A843]" />
          </div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: "DM Serif Display, Georgia, serif" }}>
            SUNU YARAMA
          </h1>
          <p className="text-gray-500 text-sm mt-1">Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#111] border border-gray-800 rounded-2xl p-6 space-y-4">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded-lg px-4 py-2">
              {error}
            </div>
          )}

          <div>
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wide block mb-1.5">
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0D6E6E] focus:ring-1 focus:ring-[#0D6E6E] outline-none"
              required
            />
          </div>

          <div>
            <label className="text-gray-400 text-xs font-medium uppercase tracking-wide block mb-1.5">
              Mot de passe
            </label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-gray-700 rounded-lg px-4 py-3 text-white text-sm focus:border-[#0D6E6E] focus:ring-1 focus:ring-[#0D6E6E] outline-none pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#0D6E6E] text-white font-bold py-3 rounded-lg hover:bg-[#0A5656] transition-colors disabled:opacity-50"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="text-gray-600 text-xs text-center mt-4">
          Accès réservé aux administrateurs
        </p>
      </div>
    </div>
  );
}
