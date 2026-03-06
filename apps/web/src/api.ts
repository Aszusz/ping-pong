export interface Pong {
  id: string;
  createdAt: string;
}

export async function fetchPongs(): Promise<Pong[]> {
  const res = await fetch("/pongs");
  if (!res.ok) throw new Error("Failed to fetch pongs");
  return res.json();
}

export async function createPong(): Promise<Pong> {
  const res = await fetch("/pongs", { method: "POST" });
  if (!res.ok) throw new Error("Failed to create pong");
  return res.json();
}

export async function clearPongs(): Promise<void> {
  const res = await fetch("/pongs", { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to clear pongs");
}
