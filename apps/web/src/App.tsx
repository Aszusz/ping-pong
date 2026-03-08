import { useQueryClient } from "@tanstack/react-query";
import { usePongs, useCreatePong, useClearPongs } from "./hooks";

export function App() {
  const qc = useQueryClient();
  const { data: pongs, isLoading } = usePongs();
  const createPong = useCreatePong();
  const clearPongs = useClearPongs();

  return (
    <div className="min-h-screen bg-gray-50">
    <div className="flex flex-col max-w-md mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Ping Pong</h1>

      <div className="flex gap-3 mb-8">
        <button
          onClick={() => createPong.mutate()}
          disabled={createPong.isPending}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
        >
          Ping
        </button>
        <button
          onClick={() => qc.invalidateQueries({ queryKey: ["pongs"] })}
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 cursor-pointer"
        >
          Refresh
        </button>
        <button
          onClick={() => clearPongs.mutate()}
          disabled={clearPongs.isPending}
          className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 cursor-pointer"
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
              className="bg-white rounded-lg shadow px-5 py-4"
            >
              <div className="text-lg font-medium">
                {new Date(pong.createdAt).toLocaleString()}
              </div>
              <div className="text-sm text-gray-400 font-mono">{pong.id}</div>
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
