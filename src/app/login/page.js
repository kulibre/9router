"use client";

import { useState, useEffect } from "react";
import { Card, Button } from "@/shared/components";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [requireLogin, setRequireLogin] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam) setError(errorParam);
  }, [searchParams]);

  useEffect(() => {
    async function checkAuth() {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const baseUrl = typeof window !== "undefined" ? window.location.origin : "";

      try {
        const res = await fetch(`${baseUrl}/api/settings`, {
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (res.ok) {
          const data = await res.json();
          if (data.requireLogin === false) {
            router.push("/dashboard");
            router.refresh();
            return;
          }
          setRequireLogin(data.requireLogin !== false);
        }
      } catch {
        clearTimeout(timeoutId);
      }
    }
    checkAuth();
  }, [router]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const redirectTo = `${window.location.origin}/callback?source=login`;
      const { error: signInError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo },
      });
      if (signInError) {
        setError(signInError.message || "Google sign-in failed");
        setLoading(false);
      }
    } catch {
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (!requireLogin) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">9Router</h1>
          <p className="text-text-muted">Sign in with Google to access your dashboard</p>
        </div>

        <Card>
          <div className="flex flex-col gap-4">
            {error && <p className="text-xs text-red-500">{error}</p>}
            <Button
              type="button"
              variant="primary"
              className="w-full"
              loading={loading}
              onClick={handleGoogleLogin}
            >
              Sign in with Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
