import type { User } from "../types";

export function createFakeJWT(user: User): string {
  const header = btoa(JSON.stringify({ alg: "none", typ: "JWT" }));
  const payload = btoa(JSON.stringify(user));
  const signature = "";
  return `${header}.${payload}.${signature}`;
}