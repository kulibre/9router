import { describe, it, expect, vi, beforeEach } from "vitest";

const mocks = vi.hoisted(() => ({
  userId: "user-123",
  createProviderConnection: vi.fn(async (userId, data) => {
    // Support both calling conventions:
    // - createProviderConnection(userId, data)  [correct - route provides userId]
    // - createProviderConnection({ ...data })   [buggy - route forgets userId]
    const resolved = typeof userId === "object" ? userId : data;
    return {
      id: "connection-123",
      userId,
      provider: resolved?.provider,
      email: resolved?.email || null,
    };
  }),
}));

vi.mock("next/server", () => ({
  NextResponse: {
    json: vi.fn((body, init) => ({
      status: init?.status || 200,
      body,
      json: async () => body,
    })),
  },
}), { virtual: true });

vi.mock("@/lib/authUtils", () => ({
  getServerUser: vi.fn().mockResolvedValue({ userId: mocks.userId, email: "user@example.com" }),
}), { virtual: true });

vi.mock("@/models", () => ({
  createProviderConnection: mocks.createProviderConnection,
}), { virtual: true });

vi.mock("@/lib/oauth/services/kiro", () => ({
  KiroService: class MockKiroService {
    async validateImportToken() {
      return {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        expiresIn: 3600,
        profileArn: "profile-arn",
      };
    }
    async exchangeSocialCode() {
      return {
        accessToken: "access-token",
        refreshToken: "refresh-token",
        expiresIn: 3600,
        profileArn: "profile-arn",
      };
    }
    extractEmailFromJWT() {
      return "user@example.com";
    }
  },
}), { virtual: true });

describe("Kiro OAuth routes - userId enforcement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it("passes userId from session to createProviderConnection on token import", async () => {
    const { POST } = await import("../../../src/app/api/oauth/kiro/import/route.js");

    const response = await POST({ json: vi.fn().mockResolvedValue({ refreshToken: "aorAAAAAG-test-token" }) });

    expect(response.status).toBe(200);
    expect(mocks.createProviderConnection).toHaveBeenCalledTimes(1);
    expect(mocks.createProviderConnection).toHaveBeenCalledWith(
      "user-123",
      expect.objectContaining({ provider: "kiro", authType: "oauth" })
    );
  });

  it("passes userId from session to createProviderConnection on social exchange", async () => {
    const { POST } = await import("../../../src/app/api/oauth/kiro/social-exchange/route.js");

    const response = await POST({
      json: vi.fn().mockResolvedValue({ code: "auth-code", codeVerifier: "code-verifier", provider: "google" }),
    });

    expect(response.status).toBe(200);
    expect(mocks.createProviderConnection).toHaveBeenCalledTimes(1);
    expect(mocks.createProviderConnection).toHaveBeenCalledWith(
      "user-123",
      expect.objectContaining({ provider: "kiro", authType: "oauth" })
    );
  });
});
