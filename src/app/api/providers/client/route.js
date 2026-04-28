import { NextResponse } from "next/server";
import { getProviderConnections } from "@/lib/localDb";
import { backfillCodexEmails } from "@/lib/oauth/providers";
import { getServerUser } from "@/lib/authUtils";

// GET /api/providers/client - List all connections for client (includes sensitive fields for sync)
export async function GET(request) {
  try {
    const user = await getServerUser(request);
    if (!user || !user.userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await backfillCodexEmails();
    const connections = await getProviderConnections(user.userId);
    
    // Include sensitive fields for sync to cloud (only accessible from same origin)
    const clientConnections = connections.map(c => ({
      ...c,
      // Don't hide sensitive fields here since this is for internal sync
    }));

    return NextResponse.json({ connections: clientConnections });
  } catch (error) {
    console.log("Error fetching providers for client:", error);
    return NextResponse.json({ error: "Failed to fetch providers" }, { status: 500 });
  }
}
