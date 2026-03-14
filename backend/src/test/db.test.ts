import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import mongoose from "mongoose";
import connectDB from "../db/db.js";

vi.mock("mongoose", () => ({
  default: {
    connect: vi.fn(),
  },
}));

let logSpy: any;
let processExit: any;

beforeEach(() => {
  logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
  processExit = vi.spyOn(process, "exit").mockImplementation(() => {
    throw new Error("process.exit called");
  });
});

afterEach(() => {
  logSpy.mockRestore();
  processExit.mockRestore();
});

describe("connectDB", () => {
  it("should throw error if MONGO_URL is missing", async () => {
    await expect(connectDB(undefined as any)).rejects.toThrowError(
      "MONGO_URL is not defined.",
    );
  });

  it("should connect to DB and log", async () => {
    const URL: string = "mongoose/url";

    (mongoose.connect as any).mockResolvedValueOnce(true);

    await connectDB(URL);

    expect(mongoose.connect).toHaveBeenCalledWith(URL);
    expect(console.log).toHaveBeenCalledWith("MongoDB connected successfully.");
  });

  it("should exit process if connection fails", async () => {
    const URL: string = "mongoose/url";

    (mongoose.connect as any).mockRejectedValueOnce(
      new Error("Connection failed"),
    );

    await expect(connectDB(URL)).rejects.toThrow("process.exit called");

    expect(console.log).toHaveBeenCalled();
    expect(process.exit).toHaveBeenCalledWith(1);
  });
});
