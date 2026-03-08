import type { Pong } from "@ping-pong/shared";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function fetchPongs(): Promise<Pong[]> {
  const res = await fetch(`${BASE}/pongs`);
  if (!res.ok) throw new Error("Failed to fetch pongs");
  return res.json();
}

export async function createPong(): Promise<Pong> {
  const res = await fetch(`${BASE}/pongs`, { method: "POST" });
  if (!res.ok) throw new Error("Failed to create pong");
  return res.json();
}

export async function clearPongs(): Promise<void> {
  const res = await fetch(`${BASE}/pongs`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear pongs");
}
