import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { mintAppJwt } from "@/lib/authUtils";
import { supabase } from "@/lib/supabase";

function buildErrorRedirect(origin, message) {
  return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(message)}`);
}

export async function POST(request) {
  try {
    const body = await request.json();
    const accessToken = typeof body?.accessToken === "string" ? body.accessToken : "";

    if (!accessToken) {
      return NextResponse.json({ error: "Missing access token" }, { status: 400 });
    }

    const { data: authData, error: authError } = await supabase.auth.getUser(accessToken);
    if (authError || !authData?.user) {
      console.error("[google-complete] auth error", authError);
      return NextResponse.json({ error: "Authentication failed" }, { status: 401 });
    }

    const supabaseUser = authData.user;
    const email = supabaseUser.email;

    if (!email) {
      return NextResponse.json({ error: "Google account email is missing" }, { status: 400 });
    }

    const name = supabaseUser.user_metadata?.full_name || supabaseUser.user_metadata?.name || "";
    const avatarUrl = supabaseUser.user_metadata?.avatar_url || "";
    const googleSub = supabaseUser.user_metadata?.sub || supabaseUser.id || "";

    let { data: user, error: userFetchError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .maybeSingle();

    if (userFetchError) {
      console.error("[google-complete] user fetch error", userFetchError);
      return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }

    if (!user) {
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert({
          id: uuidv4(),
          email,
          name,
          google_sub: googleSub,
          avatar_url: avatarUrl,
        })
        .select()
        .single();

      if (insertError) {
        console.error("[google-complete] create user error", insertError);
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
      }

      user = newUser;
    } else {
      const { data: updatedUser, error: updateError } = await supabase
        .from("users")
        .update({
          name,
          google_sub: googleSub,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)
        .select()
        .single();

      if (updateError) {
        console.error("[google-complete] update user error", updateError);
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
      }

      user = updatedUser;
    }

    await mintAppJwt(user.id, user.email, request);

    return NextResponse.json({ ok: true, redirectTo: "/dashboard" });
  } catch (error) {
    console.error("[google-complete] unexpected error", error);
    return NextResponse.json({ error: "Unexpected authentication error" }, { status: 500 });
  }
}

export async function GET(request) {
  return buildErrorRedirect(new URL(request.url).origin, "Invalid login request");
}
