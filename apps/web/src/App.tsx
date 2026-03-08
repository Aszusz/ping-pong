import { useQueryClient } from "@tanstack/react-query";
import { usePongs, useCreatePong, useClearPongs } from "./hooks";

export function App() {
  const qc = useQueryClient();
  const { data: pongs, isLoading } = usePongs();
  const createPong = useCreatePong();
  const clearPongs = useClearPongs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto flex max-w-md flex-col px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold">Ping Pong</h1>

        <div className="mb-8 flex gap-3">
          <button
            onClick={() => createPong.mutate()}
            disabled={createPong.isPending}
            className="cursor-pointer rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            Ping
          </button>
          <button
            onClick={() => qc.invalidateQueries({ queryKey: ["pongs"] })}
            className="cursor-pointer rounded-lg bg-gray-200 px-5 py-2 text-gray-800 hover:bg-gray-300"
          >
            Refresh
          </button>
          <button
            onClick={() => clearPongs.mutate()}
            disabled={clearPongs.isPending}
            className="cursor-pointer rounded-lg bg-red-600 px-5 py-2 text-white hover:bg-red-700 disabled:opacity-50"
          >
            Clear
          </button>
        </div>

        {isLoading ? (
          <p className="text-gray-500">Loading...</p>
        ) : pongs && pongs.length > 0 ? (
          <ul className="w-full space-y-3">
            {pongs.map((pong) => (
              <li
                key={pong.id}
                className="rounded-lg bg-white px-5 py-4 shadow"
              >
                <div className="text-lg font-medium">
                  {new Date(pong.createdAt).toLocaleString()}
                </div>
                <div className="font-mono text-sm text-gray-400">{pong.id}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No pongs yet. Click Ping!</p>
        )}
      </div>
    </div>
  );
}
