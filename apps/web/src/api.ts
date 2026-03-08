import type { Pong } from "@ping-pong/shared";

if (!import.meta.env.VITE_API_URL)
  throw new Error("Missing required env variable: VITE_API_URL");

const BASE = import.meta.env.VITE_API_URL;

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
