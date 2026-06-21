import { describe, expect, it } from "vitest";
import {
  getSafeAuthErrorMessage,
  signInSchema,
  signUpSchema,
} from "./validation";

describe("authentication validation", () => {
  it("rejects an invalid sign-in email", () => {
    expect(
      signInSchema.safeParse({
        email: "not-an-email",
        password: "password",
      }).success,
    ).toBe(false);
  });

  it("requires matching sign-up passwords of at least eight characters", () => {
    expect(
      signUpSchema.safeParse({
        fullName: "QA User",
        email: "qa@example.com",
        password: "short",
        confirmPassword: "different",
        terms: true,
      }).success,
    ).toBe(false);
  });

  it("maps provider details to a safe public message", () => {
    expect(
      getSafeAuthErrorMessage(
        new Error("Invalid login credentials"),
        "Unable to sign in.",
      ),
    ).toBe("Invalid email or password.");
  });
});
