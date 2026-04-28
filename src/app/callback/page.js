"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * OAuth Callback Page Content
 */
function CallbackContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("Please wait while we complete the authorization.");

  useEffect(() => {
    // Parse both query params and URL fragment (Supabase returns tokens in fragment)
    const source = searchParams.get("source");
    let code = searchParams.get("code");
    let state = searchParams.get("state");
    let error = searchParams.get("error");
    let errorDescription = searchParams.get("error_description");
    let accessToken = null;

    // Check URL fragment for access_token (implicit flow)
    if (typeof window !== "undefined" && window.location.hash) {
      const fragment = new URLSearchParams(window.location.hash.substring(1));
      accessToken = fragment.get("access_token");
      if (!error) error = fragment.get("error");
      if (!errorDescription) errorDescription = fragment.get("error_description");
    }

    async function completeGoogleLogin() {
      try {
        if (error) {
          setStatus("manual");
          setMessage(errorDescription || error || "Authentication failed.");
          return;
        }

        if (!code && !accessToken) {
          setStatus("manual");
          setMessage("Missing authorization code.");
          return;
        }

        let finalAccessToken = accessToken;

        // If we have a code but no access_token, exchange it
        if (code && !accessToken) {
          const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
          if (exchangeError || !exchangeData?.session?.access_token) {
            setStatus("manual");
            setMessage(exchangeError?.message || "Failed to complete Google sign-in.");
            return;
          }
          finalAccessToken = exchangeData.session.access_token;
        }

        const response = await fetch("/api/auth/google/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken: finalAccessToken }),
        });

        const result = await response.json().catch(() => ({}));
        if (!response.ok) {
          setStatus("manual");
          setMessage(result.error || "Failed to finish sign-in.");
          return;
        }

        await supabase.auth.signOut();
        window.location.replace(result.redirectTo || "/dashboard");
      } catch (loginError) {
        console.error("Google login callback failed", loginError);
        setStatus("manual");
        setMessage("Failed to finish sign-in.");
      }
    }

    if (source === "login") {
      completeGoogleLogin();
      return;
    }

    const callbackData = {
      code,
      state,
      error,
      errorDescription,
      fullUrl: window.location.href,
    };

    let relayed = false;

    // Check if this callback is from expected origin/port
    const expectedOrigins = [
      window.location.origin, // Same origin (for most providers)
      "http://localhost:1455", // Codex specific port
    ];
    
    // Method 1: postMessage to opener (popup mode)
    if (window.opener) {
      try {
        window.opener.postMessage({ type: "oauth_callback", data: callbackData }, "*");
        relayed = true;
      } catch (e) {
        console.log("postMessage failed:", e);
      }
    }

    // Method 2: BroadcastChannel (same origin tabs)
    try {
      const channel = new BroadcastChannel("oauth_callback");
      channel.postMessage(callbackData);
      channel.close();
      relayed = true;
    } catch (e) {
      console.log("BroadcastChannel failed:", e);
    }

    // Method 3: localStorage event (fallback)
    try {
      localStorage.setItem("oauth_callback", JSON.stringify({ ...callbackData, timestamp: Date.now() }));
      relayed = true;
    } catch (e) {
      console.log("localStorage failed:", e);
    }

    if (!(code || error)) {
      setTimeout(() => setStatus("manual"), 0);
      return;
    }

    setStatus("success");
    setTimeout(() => {
      window.close();
      setTimeout(() => setStatus("done"), 500);
    }, 1500);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center p-8 max-w-md">
        {status === "processing" && (
          <>
            <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-primary animate-spin">progress_activity</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Processing...</h1>
            <p className="text-text-muted">{message}</p>
          </>
        )}

        {(status === "success" || status === "done") && (
          <>
            <div className="size-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-green-600">check_circle</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Authorization Successful!</h1>
            <p className="text-text-muted">
              {status === "success" ? "This window will close automatically..." : "You can close this tab now."}
            </p>
          </>
        )}

        {status === "manual" && (
          <>
            <div className="size-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-3xl text-yellow-600">info</span>
            </div>
            <h1 className="text-xl font-semibold mb-2">Copy This URL</h1>
            <p className="text-text-muted mb-4">
              {message || "Please copy the URL from the address bar and paste it in the application."}
            </p>
            <div className="bg-surface border border-border rounded-lg p-3 text-left">
              <code className="text-xs break-all">{typeof window !== "undefined" ? window.location.href : ""}</code>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/**
 * OAuth Callback Page
 * Receives callback from OAuth providers and sends data back via multiple methods
 */
export default function CallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <div className="text-center p-8">
          <div className="size-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-3xl text-primary animate-spin">progress_activity</span>
          </div>
          <p className="text-text-muted">Loading...</p>
        </div>
      </div>
    }>
      <CallbackContent />
    </Suspense>
  );
}
