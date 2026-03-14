import { describe, it, vi, expect } from "vitest";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { beforeEach } from "vitest";

let res: any;
let next: any;

beforeEach(() => {
  res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn(),
  };
  next = vi.fn();
});

describe("authMiddleware", () => {
  it("should return 401 if token is missing", () => {
    const req = {
      cookies: {},
    };

    authMiddleware(req as any, res as any, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthrized access, please login first",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("should call next() if token is valid", () => {
    const req = {
      cookies: {
        token: "fake-token",
      },
    };

    vi.spyOn(jwt, "verify").mockImplementation(() => {
      id: "user1";
    });

    authMiddleware(req as any, res as any, next());

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("should return 401 'unauthrized' if token is not valid", async () => {
    const req = {
      cookies: {
        token: "fake-token",
      },
    };

    vi.spyOn(jwt, "verify").mockImplementation(() => {
      throw new Error("invalid token");
    });

    await authMiddleware(req as any, res as any, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Unauthrized token",
    });
    expect(next).not.toHaveBeenCalled();
  });
});
