import type { Pong } from "../api";

export function PongList({ pongs }: { pongs: Pong[] }) {
  if (pongs.length === 0) {
    return (
      <p data-testid="empty-state" className="text-gray-500">
        No pongs yet. Click Ping to create one.
      </p>
    );
  }

  return (
    <ul data-testid="pong-list" className="space-y-3">
      {pongs.map((pong) => (
        <li
          data-testid="pong-item"
          key={pong.id}
          className="rounded border border-gray-200 p-4"
        >
          <div className="text-lg">
            {new Date(pong.createdAt).toLocaleString()}
          </div>
          <div className="font-mono text-sm text-gray-500">{pong.id}</div>
        </li>
      ))}
    </ul>
  );
}
