import { describe, expect, it, mock } from "bun:test";

import type { Logger } from "matrix-appservice-bridge";

import { createUserDeletedHandler, toSynapseLocalpart } from "./account-eraser";

const log = {
  info: mock(),
} as unknown as Logger;

describe("toSynapseLocalpart", () => {
  // Expected values are what Synapse's map_username_to_mxid_localpart returns.
  it.each([
    [
      "John.Doe",
      "john.doe",
    ],
    [
      "user+tag",
      "user+tag",
    ],
    [
      "x/y-z_1",
      "x/y-z_1",
    ],
    [
      "_hidden",
      "=5fhidden",
    ],
    [
      "élodie",
      "=c3=a9lodie",
    ],
    [
      "a=b",
      "a=3db",
    ],
    [
      "Bob O'Neil",
      "bob=20o=27neil",
    ],
  ])("maps %p like Synapse", (username, localpart) => {
    expect(toSynapseLocalpart(username)).toBe(localpart);
  });
});

describe("createUserDeletedHandler", () => {
  const deleted = {
    userId: "User-1790342743145-tn641o",
    internalEmail: "Alice.Martin@acme.example",
    reasonCode: "user_request",
  };

  it("erases the account named after the uid", async () => {
    const eraseAccount = mock(async () => {});

    await createUserDeletedHandler(eraseAccount, "example.com", "uid", log)(deleted);

    expect(eraseAccount).toHaveBeenCalledWith("@user-1790342743145-tn641o:example.com");
  });

  it("erases the account named after the email", async () => {
    const eraseAccount = mock(async () => {});

    await createUserDeletedHandler(eraseAccount, "example.com", "email", log)(deleted);

    expect(eraseAccount).toHaveBeenCalledWith("@alice.martin:example.com");
  });

  it.each([
    [
      "uid",
      {
        internalEmail: "alice@example.com",
      },
    ],
    [
      "email",
      {
        userId: "alice",
      },
    ],
  ] as const)("rejects a message without the %s login, so it is dead-lettered", async (localpartFrom, message) => {
    const eraseAccount = mock(async () => {});

    await expect(createUserDeletedHandler(eraseAccount, "example.com", localpartFrom, log)(message)).rejects.toThrow();
    expect(eraseAccount).not.toHaveBeenCalled();
  });

  it("refuses an unknown localpartFrom instead of guessing", () => {
    expect(() =>
      createUserDeletedHandler(
        mock(async () => {}),
        "example.com",
        "UID" as unknown as "uid",
        log,
      ),
    ).toThrow('deletion.localpartFrom must be "uid" or "email", got "UID"');
  });

  it("fails when the erasure fails, so the message is retried", async () => {
    const eraseAccount = mock(() => Promise.reject(new Error("Synapse answered 500")));

    await expect(createUserDeletedHandler(eraseAccount, "example.com", "email", log)(deleted)).rejects.toThrow(
      "Synapse answered 500",
    );
  });
});
